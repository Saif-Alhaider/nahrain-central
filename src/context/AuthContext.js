import {createContext, useEffect, useState} from "react";
import {NahrainLogger} from "../debug/NahrainLogger";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({
    accessToken: null,
    setAccessToken: null,
    refreshToken:null,
    setRefreshToken:null,
    role: null,
});

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(() => {
        const storedAccessToken = localStorage.getItem("accessToken");
        return storedAccessToken === "null" ? null : storedAccessToken;
    });

    const [refreshToken, setRefreshToken] = useState(() => {
        const storedRefreshToken = localStorage.getItem("refreshToken");
        return storedRefreshToken === "null" ? null : storedRefreshToken;
    });

    const [role, setRole] = useState(null);

    useEffect(() => {
        if (accessToken) {
            try {
                const decoded = jwtDecode(accessToken);
                const roles = decoded.role || [];
                setRole(roles.length > 0 ? roles[0] : null);
            } catch (error) {
                NahrainLogger.error("Invalid token:", error);
                setRole(null);
            }
        } else {
            setRole(null);
        }
        localStorage.setItem("accessToken", accessToken);
    }, [accessToken]);

    useEffect(() => {
        localStorage.setItem("refreshToken", refreshToken);
    }, [refreshToken]);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, role,refreshToken,setRefreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};
