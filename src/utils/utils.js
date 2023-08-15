import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
    try {
        const {data} = await axiosReq.get(resource.next)
        setResource(prevResource => ({
                ...prevResource,
                next: data.next,
                // Eliminates duplicates that may have arisen by dynamic changes to the dataset
                results: data.results.reduce((acc, cur) => {
                    return acc.some(accResult => accResult.id === cur.id) ? acc: [...acc, cur]
                }, prevResource.results)
            })
        )
    }
    catch (err) {
    }
}

export const followHelper = (profile, clickedProfile, followingId) => {
    return profile.id === clickedProfile.id ? {
      ...profile,
      followers_count: profile.followers_count + 1,
      following_id: followingId
    } :
    profile.is_owner ? {
      ...profile,
      following_count: profile.following_count + 1
    } :
    // If this not the owner and not the one followed, return the profile unchanged
    profile
}

export const unfollowHelper = (profile, clickedProfile) => {
    return profile.id === clickedProfile.id ? {
      ...profile,
      followers_count: profile.followers_count - 1,
      following_id: null
    } :
    profile.is_owner ? {
      ...profile,
      following_count: profile.following_count - 1
    } :
    // If this not the owner and not the one followed, return the profile unchanged
    profile
}