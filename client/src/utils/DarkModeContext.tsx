import React, { Context, createContext } from 'react';
import { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Define the type for the context value
interface DarkModeContextType {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    darkTheme: Theme;
}


// Create the context with default values or undefined
// You may also need to provide a default theme if the `createTheme` function isn't imported
const defaultContextValue: DarkModeContextType = {
    darkMode: false,
    darkTheme: createTheme(),
    setDarkMode: () => {},
};


const DarkModeContext = createContext<DarkModeContextType>(defaultContextValue);

export const DarkModeProvider = DarkModeContext.Provider;
export const DarkModeConsumer = DarkModeContext.Consumer;
export default DarkModeContext;
