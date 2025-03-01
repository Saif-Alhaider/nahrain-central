import {Navigate, Outlet} from "react-router-dom";
import {MainScaffold} from "presentation/Common/component/MainScaffold";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export const PrivateRoutes = () => {
    const {accessToken, role} = useContext(AuthContext);
    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    if (role === null) {
        return <Navigate to="/pending-approval" />;
    }

    return <MainScaffold><Outlet /></MainScaffold>;

}