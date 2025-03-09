import 'output.css'
import 'index.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {NahrainThemeContext} from "../../../context/NahrainThemeContext";
import {ReactComponent as IcMaximize} from 'presentation/Common/resources/images/ic_maximize.svg';
import {ReactComponent as IcMinimize} from 'presentation/Common/resources/images/ic_minimize.svg';
import {ReactComponent as IcDoubleArrow} from 'presentation/Common/resources/images/ic_double_arrow.svg';
import {ReactComponent as IcArrowDown} from 'presentation/Common/resources/images/ic_arrow_down.svg';
import {ReactComponent as IcDivider} from 'presentation/Common/resources/images/ic_divider.svg';
import {Appbar} from "./appbar/Appbar";
import {NahrainLogger} from "../../../debug/NahrainLogger";

export const MainScaffold = ({ SidebarComponent,role }) => {
    const [t, i18] = useTranslation("global");

    const titles = {
        '/': role.authority === 'ADMIN' ? t("dashboard") : t("home"),
        '/users': t("users"),
        '/schedule': t("schedule"),
        '/lectures-schedule': t('lectures_schedule'),
        '/recorded-lectures': t('recorded_lectures'),
        '/record-absence': t('record_absence'),
        '/exams': t('exams'),
        '/grades': t('grades'),
        '/settings': t("settings"),
        '/contact-me': t('contact_me'),
        '/announcement': t('announcement'),
        '/take-absence': t('record_absence'),
    };

    const location = useLocation();
    const currentScreen = titles[location.pathname] || '404 - Page Not Found';
    const showAppbar = 'block lg:hidden';
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const { isDialogSidebarVisible, dialogSidebarChild, onDismissSidebarDialog } = useContext(NahrainThemeContext);

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
            className={`w-full h-dvh transition-colors duration-200 ease-linear flex flex-row overflow-x-hidden relative bg-background lg:overflow-hidden`}
        >
            <div className={`z-40`}>
                <div className={`${showAppbar}`}>
                    <Appbar
                        target={scrollContainerRef.current}
                        title={currentScreen}
                        className='!z-0 w-full'
                        onClick={toggleVisibility}
                    />
                </div>
                {SidebarComponent && (
                    <SidebarComponent
                        currentScreen={currentScreen}
                        onDismiss={toggleVisibility}
                        isVisible={isSidebarVisible}
                    />
                )}
            </div>

            <DialogSidebar isVisible={isDialogSidebarVisible} onDismiss={onDismissSidebarDialog}>
                {dialogSidebarChild}
            </DialogSidebar>

            <div
                ref={scrollContainerRef}
                className={`flex flex-col gap-14 w-dvw h-full overflow-x-hidden overflow-y-auto`}
            >
                <div className={`${showAppbar} bg-background`} />
                <Outlet />
            </div>
        </div>
    );
};


export const DialogSidebar = ({isVisible, onDismiss, children}) => {
    const [isMaximize, setIsMaximize] = useState(false)
    return (<div
        className={`z-40 size-full absolute ${(isVisible) ? "" : 'pointer-events-none'} `}>
        <div
            onClick={() => {
                onDismiss()
                setIsMaximize(false)
            }}
            className={`bg-black overflow-hidden size-full absolute ${isVisible ? 'opacity-65' : 'opacity-0 pointer-events-none'}  cursor-pointer transition-opacity delay-50ms ease-linear`}
        />

        <div
            className={`absolute overflow-y-hidden lg:w-[40%] md:w-[55%] w-[100%] h-dvh bg-card end-0 p-4 
                ${isVisible ? '' : 'ltr:translate-x-full rtl:-translate-x-full'}
                ${isMaximize ? 'w-full' : ''}
                `}
            style={{
                transition: 'all 350ms cubic-bezier(0.4, 0, 0.2, 1),background-color linear',
            }}>
            <div className={`flex flex-row text-onBackground gap-2`}>
                {isMaximize ? (<IcMinimize
                    className="cursor-pointer invisible w-0 md:visible md:w-fit"
                    onClick={() => setIsMaximize(false)}
                />) : (<IcMaximize
                    className="cursor-pointer invisible w-0 md:visible md:w-fit"
                    onClick={() => setIsMaximize(true)}
                />)}
                <IcDoubleArrow
                    className={`${isVisible ? "rotate-0" : "rotate-[-180deg]"} transition-transform ease-linear cursor-pointer`}
                    onClick={() => {
                        onDismiss()
                        setIsMaximize(false)
                    }}/>
                <IcDivider className={"mx-2"}/>
                <IcArrowDown className={`cursor-pointer`}/>
                <IcArrowDown className={`rotate-180 cursor-pointer`}/>
            </div>
            <div className={`pt-12 pb-4 h-full`}>
                {children}
            </div>
        </div>
    </div>)
}


export const ContentBox = ({className, onClick, icon, title, description, enabled = false}) => {
    return (<div onClick={onClick}
                 className={`${className}  ${enabled ? `border-primary border-2` : `border-softGray border-[1px]`} cursor-pointer w-full h-fit py-4 px-2 rounded-lg flex flex-row text-onBackground items-center gap-4 justify-between hover:bg-black/10 transition duration-300 ease-in-out`}>
        <div className={`flex flex-row gap-4 items-center justify-between`}>
            <div className={`${enabled ? `text-primary` : `text-onBackground`} `}>{icon}</div>
            <div className={`flex flex-col gap-2`}>
                <h1 className={`font-medium text-[24px]`}>{title}</h1>
                <p className={`text-onBackgroundCaption`}>{description}</p>
            </div>
        </div>
        <CustomRadioButton enabled={enabled}/>
    </div>)
}

const CustomRadioButton = ({enabled = false}) => {
    return (<div className="flex items-center space-x-4">
        <label className={`flex items-center ${enabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <input
                type="radio"
                name="custom-radio"
                className="hidden peer"
                disabled={enabled}
            />
            <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${enabled ? "bg-primary peer-checked:bg-primary" : "border-[1px] border-softGray"}`}
            >
                {enabled && <div className="w-3 h-3 bg-onPrimary rounded-full"></div>}
            </div>
        </label>
    </div>);
};
