import {createContext, useContext, useEffect, useRef, useState} from "react";

export const AuthContext = createContext({
    accessToken: null,
    setAccessToken: () => null
});

export const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(()=>{
        const storedAccessToken = localStorage.getItem('accessToken')
        return storedAccessToken === "null" ? null : storedAccessToken;
    });

    useEffect(() => {
        localStorage.setItem('accessToken', accessToken);
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    );
};