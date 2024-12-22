import {createContext, useEffect, useState} from "react";
import {supportedLanguages} from "../translation/supportedLanguages";

export const NahrainThemeContext = createContext({
    currentTheme: "light",
    setCurrentTheme: () => null,
    currentLanguage: Object.keys(supportedLanguages)[0],
    setCurrentLanguage: () => null,
    currentFont: "font-notoSans",
    setCurrentFont: () => null
})

export const NahrainThemeProvider = ({children}) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        return localStorage.getItem('language') || Object.keys(supportedLanguages)[0];
    });
    
    const [currentFont, setCurrentFont] = useState(() => {
        return localStorage.getItem('font') || "font-notoSans";
    });

    useEffect(() => {
        localStorage.setItem('theme', currentTheme);
    }, [currentTheme]);
    useEffect(() => {
        localStorage.setItem('language', currentLanguage);
    }, [currentLanguage]);
    
    useEffect(() => {
        localStorage.setItem('font', currentFont);
    }, [currentFont]);

    const value = {setCurrentTheme, currentTheme, currentLanguage, setCurrentLanguage,currentFont,setCurrentFont}

    return <NahrainThemeContext.Provider value={value}>{children}</NahrainThemeContext.Provider>
}