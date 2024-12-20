import {createContext, useEffect, useState} from "react";

export const NahrainThemeContext = createContext({
    currentTheme: "light",
    setCurrentTheme: () => null,
})

export const NahrainThemeProvider = ({children}) => {
    const [currentTheme,setCurrentTheme ] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });
    useEffect(() => {
        localStorage.setItem('theme', currentTheme);
    }, [currentTheme]);
    const value = {setCurrentTheme, currentTheme}

    return <NahrainThemeContext.Provider value={value}>{children}</NahrainThemeContext.Provider>
}