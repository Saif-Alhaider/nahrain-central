import {Navigate, Outlet} from "react-router-dom";

export const AuthRoutes = ({accessToken}) => {
    return accessToken ? <Navigate to="/"/> : <Outlet/>;
}
