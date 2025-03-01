import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

export const PendingApprovalRoutes = () => {
    const {accessToken, role} = useContext(AuthContext);
    if (!accessToken) {
        return <Navigate to="/login"/>
    } else if (role !== null) {
        return <Navigate to="/"/>
    } else {
        return <Outlet/>
    }
}
