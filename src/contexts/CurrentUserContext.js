import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const handleMount = async () => {
        try {
          const {data} = await axios.get('/dj-rest-auth/user/');
          setCurrentUser(data);
        }
        catch (err) {
          console.log("User Fetch Problem", err)
        }
      }
    
      // This hook provides for the execution of the page
      // once only, on page mount
      useEffect(() => {
        handleMount();
      }, [])
    
    return (
        <CurrentUserContext.Provider value={currentUser}>
        <SetCurrentUserContext.Provider value={setCurrentUser}>
            {children}
        </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
};