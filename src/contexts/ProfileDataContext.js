import React, { createContext, useContext, useState } from 'react'
import { useCurrentUser } from './CurrentUserContext';
import { useEffect } from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { followHelper } from '../utils/utils';

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
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) => 
            followHelper(profile, clickedProfile, data.id)
        )},
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) => 
            followHelper(profile, clickedProfile, data.id)
        )}
      }))
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