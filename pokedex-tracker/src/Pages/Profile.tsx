import React, { useContext} from 'react';

// file imports
import Nav from '../components/nav/navComponent';
import DarkModeContext  from '../utils/DarkModeContext';
import ProfileComponent from '../components/profile/profile';

const Profile : React.FC = () => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

      
    return (
        <>
            <Nav />
            <ProfileComponent />
        </>
    );
}

export default Profile;
