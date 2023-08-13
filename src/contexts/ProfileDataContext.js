import React, { createContext, useContext, useState } from 'react'
import { useCurrentUser } from './CurrentUserContext';
import { useEffect } from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefaults';

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

const ProfileDataProvider = ({children}) => {
  const [profileData, setProfileData] = useState({
    pageProfile: {results: []},
    popularProfiles: {results: []}
  })

  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const {data} = await axiosReq.get(
          '/profiles/?ordering=-followers_count'
        )
        setProfileData(prevState => ({
          ...prevState,
          popularProfiles: {results : data},
        }))
      }
      catch(err) {
        console.log(err);
      }
    }

    handleMount();
  }, [currentUser])

  const handleFollow = async (clickedProfile) => {
    try {
      const {data} = await axiosRes.post('/follows/', {
        followed: clickedProfile.id
      })

      setProfileData(prevState => ({
        ...prevState,
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) => {
            return profile.id === clickedProfile.id ? {
              ...profile,
              followers_count: profile.followers_count + 1,
              following_id: data.id
            } :
            profile.is_owner ? {
              ...profile,
              following_count: profile.following_count + 1
            } :
            // If this not the owner and not the one followed, return the profile unchanged
            profile
          })
      }}))
    }
    catch (err) {
      console.log(err);
    }

  }

  return (
    <ProfileDataContext.Provider value={profileData}>
        <SetProfileDataContext.Provider value={{setProfileData, handleFollow}}>
            {children}
        </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  )
}

export default ProfileDataProvider