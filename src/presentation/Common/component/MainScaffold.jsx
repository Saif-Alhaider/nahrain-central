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
        '/nahrain-central/': t("home"),
        '/nahrain-central': t("home"),
        '/nahrain-central/lectures-schedule': t('lectures_schedule'),
        '/nahrain-central/recorded-lectures': t('recorded_lectures'),
        '/nahrain-central/record-absence': t('record_absence'),
        '/nahrain-central/exams': t('exams'),
        '/nahrain-central/grades': t('grades'),
        '/nahrain-central/settings': t("settings"),
        '/nahrain-central/contact-me': t('contact_me'),
        '/nahrain-central/announcement': t('announcement'),
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
        } else {
            document.body.style.overflow = "";
        }
    }, [isVisible]);

    const scrollContainerRef = useRef();


    return (
        <div
            className={`w-full h-dvh transition-colors duration-200 ease-linear flex flex-row relative bg-background lg:overflow-hidden`}>
            <div className={`z-40 `}>
                <div className={`${showAppbar} `}>
                    <Appbar target={scrollContainerRef.current} title={currentScreen} className='!z-0 w-full'
                            onClick={toggleVisibility}/>
                </div>
                <ProfSidebar currentScreen={currentScreen} onDismiss={toggleVisibility}
                             isVisible={isVisible}/>
            </div>
            {/*TODO: OverflowScroll is Preventing the Appbar from hiding it should be fixed in near future*/}
            <div ref={scrollContainerRef}
                 className={`flex flex-col gap-14 w-full h-full overflow-y-auto`}>
                <div className={`${showAppbar} bg-background`}/>
                <Outlet/>
            </div>
        </div>
    )
}
