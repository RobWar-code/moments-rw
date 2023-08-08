import React, { useEffect, useState } from 'react'
import appStyles from '../../App.module.css'
import { Container } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import Asset from '../../components/Asset'

const PopularProfiles = () => {
  const [profileData, setProfileData] = useState({
    // we will use this later
    pageProfile: {results: []},
    popularProfiles: {results: []},
  })

  const currentUser = useCurrentUser();
  const { popularProfiles } = profileData;

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
    <Container className={appStyles.Content}>
        { popularProfiles.results.length ? (
          <>
            <p>Most Followed Profiles</p>
            {popularProfiles.results.map(profile => (
              <p key={profile.id}>{profile.owner}</p>
            ))}
          </>
          ) : 
          (
            <Asset spinner />
          )
        }
    </Container>
  )
}

export default PopularProfiles