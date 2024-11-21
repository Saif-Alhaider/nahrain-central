import {Appbar} from "./appbar/Appbar";
import {ProfSidebar} from "./sidebar/ProfSidebar";
import 'output.css'
import 'index.css'
import React, {useState} from "react";
import {Outlet, useLocation} from "react-router-dom";

export const MainScaffold = () => {
    const titles = {
        '/': 'Home',
        '/lectures-schedule': 'Lectures Schedule',
        '/recorded-lectures': 'Recorded Lectures',
        '/record-absence': 'Record Absence',
        '/exams': 'Exams',
        '/grades': 'Grades',
        '/settings': 'Settings',
        '/contact-me': 'Contact Me',
    };
    const location = useLocation();
    const currentScreen = titles[location.pathname] || '404 - Page Not Found';
    const showAppbar = 'block lg:hidden'
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };
    return (
        <div className={`w-full h-dvh flex flex-row relative bg-background dark lg:overflow-hidden`}>
            <div className={`z-40`}>
                <div className={showAppbar}>
                    <Appbar title={currentScreen} className='!z-0 w-full' onClick={toggleVisibility}/>
                </div>
                <ProfSidebar currentScreen={currentScreen} onDismiss={toggleVisibility}
                             isVisible={isVisible}/>
            </div>
            <div className='flex flex-col gap-14 w-full h-full lg:overflow-y-scroll'>
                <div className={`${showAppbar} bg-background`}/>
                <Outlet/>
            </div>
        </div>
    )
}
