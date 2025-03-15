import {createContext, useEffect, useState} from "react";
import {supportedLanguages} from "../translation/supportedLanguages";

export const NahrainThemeContext = createContext({
    currentTheme: "light",
    setCurrentTheme: () => null,
    currentLanguage: Object.keys(supportedLanguages)[0],
    setCurrentLanguage: () => null,
    currentFont: "font-notoSans",
    setCurrentFont: () => null,

    dialogSidebar: {
        isVisible: false,
        child: null,
        onDismiss: () => {},
        indicatorMaxScreens: null,
        indicatorCurrentScreen: null
    },
    setDialogSidebar: () => null
});

export const NahrainThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [currentLanguage, setCurrentLanguage] = useState(() => localStorage.getItem('language') || Object.keys(supportedLanguages)[0]);
    const [currentFont, setCurrentFont] = useState(() => localStorage.getItem('font') || "font-notoSans");

    const [dialogSidebar, setDialogSidebar] = useState({
        isVisible: false,
        child: null,
        onDismiss: () => {},
        indicatorMaxScreens: null,
        indicatorCurrentScreen: null
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

    const value = {
        currentTheme,
        setCurrentTheme,
        currentLanguage,
        setCurrentLanguage,
        currentFont,
        setCurrentFont,
        dialogSidebar,
        setDialogSidebar
    };

    return <NahrainThemeContext.Provider value={value}>{children}</NahrainThemeContext.Provider>;
};
