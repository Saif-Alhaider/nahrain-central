import {Appbar} from "./appbar/Appbar";
import {ProfSidebar} from "./sidebar/ProfSidebar";
import 'output.css'
import 'index.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {NahrainThemeContext} from "../../../context/NahrainThemeContext";

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
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const {isDialogSidebarVisible, setIsDialogSidebarVisible} = useContext(NahrainThemeContext);
    const [isHidden, setIsHidden] = useState(true);


    const toggleVisibility = () => {
        setIsSidebarVisible((prev) => !prev);
    };

    useEffect(() => {
        if (isSidebarVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isSidebarVisible]);

    const scrollContainerRef = useRef();

    return (
        <div
            className={`w-full h-dvh transition-colors duration-200 ease-linear flex flex-row relative bg-background lg:overflow-hidden`}>
            <div className={`z-40`}>
                <div className={`${showAppbar}`}>
                    <Appbar target={scrollContainerRef.current} title={currentScreen} className='!z-0 w-full'
                            onClick={toggleVisibility}/>
                </div>
                <ProfSidebar currentScreen={currentScreen} onDismiss={toggleVisibility}
                             isVisible={isSidebarVisible}/>
            </div>

            <div
                className={`z-40 size-full absolute ${(isDialogSidebarVisible) ? "" : 'pointer-events-none'}`}
            >
                <div
                    onClick={() => setIsDialogSidebarVisible(false)}
                    onTransitionEnd={() => {
                        if (!isDialogSidebarVisible) {
                            setIsHidden(true);
                        }
                    }}
                    className={`bg-black size-full absolute ${isDialogSidebarVisible ? 'opacity-65' : 'opacity-0 pointer-events-none'}  cursor-pointer transition-opacity delay-50ms ease-linear`}
                />

                <div onClick={() => {
                }}
                     className={`absolute w-[420px] h-full bg-card end-0 ${isDialogSidebarVisible ? '' : 'ltr:translate-x-[420px] rtl:-translate-x-[420px]'} `}
                     style={{
                         transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1),background-color 200ms linear',
                     }}>
                </div>
            </div>

            <div ref={scrollContainerRef}
                 className={`flex flex-col gap-14 w-full h-full overflow-y-auto`}>
                <div className={`${showAppbar} bg-background`}/>
                <Outlet/>
            </div>
        </div>
    )
}
