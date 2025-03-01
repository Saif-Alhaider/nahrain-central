import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export const AuthRoutes = () => {
    const {accessToken} = useContext(AuthContext);
    return accessToken ? <Navigate to="/"/> : <Outlet/>;
}
