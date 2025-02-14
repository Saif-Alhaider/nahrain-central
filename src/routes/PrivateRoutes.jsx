import {Navigate, Outlet} from "react-router-dom";
import {MainScaffold} from "presentation/Common/component/MainScaffold";

export const PrivateRoutes = ({accessToken}) => {
    return accessToken ? <MainScaffold><Outlet/></MainScaffold> : <Navigate to="/login"/>;
}