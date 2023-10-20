import React from 'react';
import {useContext} from 'react'
import Nav from '../components/nav/navComponent';
import LoginComponent from '../components/login/LoginComponent';
import { createTheme } from '@mui/material/styles';
import DarkModeContext  from '../utils/DarkModeContext';


const Login: React.FC = () => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);


    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };


    return (
        <>
            <Nav />
            <LoginComponent />
        </>
    );
}

export default Login;