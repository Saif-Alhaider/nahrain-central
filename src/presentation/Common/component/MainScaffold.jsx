import {Appbar} from "./appbar/Appbar";
import {ProfSidebar} from "./sidebar/ProfSidebar";
import 'output.css'
import 'index.css'
import React, {useEffect, useRef, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const MainScaffold = () => {
    const [t, i18] = useTranslation("global");

    const titles = {
        '/nahrain-central/': 'Home',
        '/nahrain-central': 'Home',
        '/nahrain-central/lectures-schedule': 'Lectures Schedule',
        '/nahrain-central/recorded-lectures': 'Recorded Lectures',
        '/nahrain-central/record-absence': 'Record Absence',
        '/nahrain-central/exams': 'Exams',
        '/nahrain-central/grades': 'Grades',
        '/nahrain-central/settings': t("settings"),
        '/nahrain-central/contact-me': 'Contact Me',
    };

    const location = useLocation();
    const currentScreen = titles[location.pathname] || '404 - Page Not Found';
    const showAppbar = 'block lg:hidden'
    const [isVisible, setIsVisible] = useState(false);


    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden";
        } else  {
            document.body.style.overflow = "";
        }
    }, [isVisible]);

    return (
        <div className={`w-full h-dvh transition-colors duration-200 ease-linear  flex flex-row relative bg-background lg:overflow-hidden`}>
            <div className={`z-40 `}>
                <div className={`${showAppbar} `}>
                    <Appbar title={currentScreen} className='!z-0 w-full' onClick={toggleVisibility}/>
                </div>
                <ProfSidebar currentScreen={currentScreen} onDismiss={toggleVisibility}
                             isVisible={isVisible}/>
            </div>
            <div  className={`flex flex-col gap-14 w-full h-full lg:overflow-y-scroll`}>
                <div className={`${showAppbar} bg-background`}/>
                <Outlet/>
            </div>
        </div>
    )
}
