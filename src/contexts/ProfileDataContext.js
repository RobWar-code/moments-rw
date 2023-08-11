import React, { createContext, useContext, useState } from 'react'
import { useCurrentUser } from './CurrentUserContext';
import { useEffect } from 'react';
import { axiosReq } from '../api/axiosDefaults';

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

  return (
    <ProfileDataContext.Provider value={profileData}>
        <SetProfileDataContext.Provider value={setProfileData}>
            {children}
        </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  )
}

export default ProfileDataProvider