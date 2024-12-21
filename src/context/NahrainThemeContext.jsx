import {createContext, useEffect, useState} from "react";
import {supportedLanguages} from "../translation/supportedLanguages";

export const NahrainThemeContext = createContext({
    currentTheme: "light",
    setCurrentTheme: () => null,
    currentLanguage: Object.keys(supportedLanguages)[0],
    setCurrentLanguage: () => null
})

export const NahrainThemeProvider = ({children}) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        return localStorage.getItem('language') || Object.keys(supportedLanguages)[0];
    });

    useEffect(() => {
        localStorage.setItem('theme', currentTheme);
    }, [currentTheme]);
    useEffect(() => {
        localStorage.setItem('language', currentLanguage);
    }, [currentLanguage]);

    const value = {setCurrentTheme, currentTheme, currentLanguage, setCurrentLanguage}

    return <NahrainThemeContext.Provider value={value}>{children}</NahrainThemeContext.Provider>
}