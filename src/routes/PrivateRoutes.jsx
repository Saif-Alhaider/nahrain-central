import {Navigate, Outlet} from "react-router-dom";
import {MainScaffold} from "presentation/Common/component/MainScaffold";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {ProfSidebar} from "../presentation/Common/component/sidebar/ProfSidebar";
import {StudentSidebar} from "../presentation/Common/component/sidebar/StudentSidebar";

export const PrivateRoutes = () => {
    const {role } = useContext(AuthContext);

    if (role === null || role.authority === null) {
        return <Navigate to="/pending-approval" replace />;
    }

    const getSidebarComponent = () => {
        switch (role.authority) {
            case 'PROF':
                return ProfSidebar;
            case 'STUDENT':
                return StudentSidebar;
            default:
                return null;
        }
    };

    const SidebarComponent = getSidebarComponent();

    return (
        <MainScaffold SidebarComponent={SidebarComponent}>
            <Outlet/>
        </MainScaffold>
    );
};