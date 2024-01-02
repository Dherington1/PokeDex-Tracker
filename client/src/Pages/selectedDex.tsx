import React, { useContext} from 'react';
import { createTheme } from '@mui/material/styles';
import Nav from '../components/nav/navComponent';
import DarkModeContext  from '../utils/DarkModeContext';
import SelectedDexComponent from '../components/selectedDex/selectedDexComponent'

const SelectedDex: React.FC = () => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };


    return (
        <>
            <Nav />
            <SelectedDexComponent />
        </>
    );
}

export default SelectedDex;
