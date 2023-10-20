import React, { useContext} from 'react';
import { createTheme } from '@mui/material/styles';
import Nav from '../components/nav/navComponent';
import RegisterComponent from '../components/register/RegisterComponent';
import DarkModeContext  from '../utils/DarkModeContext';

const Register: React.FC = () => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };


    return (
        <>
            <Nav />
            <RegisterComponent />
        </>
    );
}

export default Register;
