import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext({
    accessToken: null,
    setAccessToken:null
});

export const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(()=>{
        const storedAccessToken = localStorage.getItem('accessToken')
        return storedAccessToken === "null" ? null : storedAccessToken;
    });

    const [signupTotp,setSignupTotp] = useState(()=>{
        return localStorage.getItem('accessToken');
    })

    useEffect(() => {
        localStorage.setItem('accessToken', accessToken);
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken,signupTotp,setSignupTotp}}>
            {children}
        </AuthContext.Provider>
    );
};