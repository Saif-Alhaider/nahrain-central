import {Appbar} from "./appbar/Appbar";
import {ProfSidebar} from "./sidebar/ProfSidebar";
import 'output.css'
import 'index.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {NahrainThemeContext} from "../../../context/NahrainThemeContext";
import {ReactComponent as IcMaximize} from 'presentation/Common/resources/ic_maximize.svg';
import {ReactComponent as IcMinimize} from 'presentation/Common/resources/ic_minimize.svg';
import {ReactComponent as IcDoubleArrow} from 'presentation/Common/resources/ic_double_arrow.svg';
import {ReactComponent as IcArrowDown} from 'presentation/Common/resources/ic_arrow_down.svg';
import {ReactComponent as IcDivider} from 'presentation/Common/resources/ic_divider.svg';
import {ReactComponent as IcPlaylist} from 'presentation/Common/resources/ic_playlist.svg';
import {ReactComponent as IcPlay} from 'presentation/Common/resources/ic_play.svg';


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
            className={`w-full h-dvh transition-colors duration-200 ease-linear flex flex-row overflow-x-hidden relative bg-background lg:overflow-hidden`}>
            <div className={`z-40`}>
                <div className={`${showAppbar}`}>
                    <Appbar target={scrollContainerRef.current} title={currentScreen} className='!z-0 w-full'
                            onClick={toggleVisibility}/>
                </div>
                <ProfSidebar currentScreen={currentScreen} onDismiss={toggleVisibility}
                             isVisible={isSidebarVisible}/>
            </div>

            <DialogSidebar isVisible={isDialogSidebarVisible} onDismiss={() => setIsDialogSidebarVisible(false)}/>

            <div ref={scrollContainerRef}
                 className={`flex flex-col gap-14 w-dvw h-full overflow-x-hidden overflow-y-auto`}>
                <div className={`${showAppbar} bg-background`}/>
                <Outlet/>
            </div>
        </div>
    )
}


export const DialogSidebar = ({isVisible, onDismiss}) => {
    const [isMaximize, setIsMaximize] = useState(false)

    return (
        <div
            className={`z-40 size-full absolute ${(isVisible) ? "" : 'pointer-events-none'}`}>
            <div
                onClick={() => {
                    onDismiss()
                    setIsMaximize(false)
                }
                }
                className={`bg-black size-full absolute ${isVisible ? 'opacity-65' : 'opacity-0 pointer-events-none'}  cursor-pointer transition-opacity delay-50ms ease-linear`}
            />

            <div
                className={`absolute lg:w-[40%] md:w-[55%] w-[100%] h-full bg-card end-0 p-4 
                ${isVisible ? '' : 'ltr:translate-x-full rtl:-translate-x-full'}
                ${isMaximize ? 'w-full' : ''}
                `}
                style={{
                    transition: 'all 350ms cubic-bezier(0.4, 0, 0.2, 1),background-color linear',
                }}>
                <div className={`flex flex-row text-onBackground gap-2 mb-12`}>
                    {isMaximize ? (
                        <IcMinimize
                            className="cursor-pointer invisible w-0 md:visible md:w-fit"
                            onClick={() => setIsMaximize(false)} // Set to false when minimizing
                        />
                    ) : (
                        <IcMaximize
                            className="cursor-pointer invisible w-0 md:visible md:w-fit"
                            onClick={() => setIsMaximize(true)} // Set to true when maximizing
                        />
                    )
                    }
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

                <div className={`flex flex-col gap-4`}>
                    <ContentBox className={`mx-auto`}
                                icon={<IcPlay/>}
                                title={`Video`}
                                description={`Share the full video link to the lectures directly.`}
                    />
                    <ContentBox className={`mx-auto`}
                                icon={<IcPlaylist/>}
                                title={`Playlist`}
                                description={`Share the playlist link and it will be added to the lectures directly.`}
                    />
                </div>
                <p className={`text-onBackgroundCaption mt-4 max-w-[700px] mx-auto`}>You can choose to add a single video or a playlist from YouTube. If you choose a video, it will be listed in a playlist associated with a specific course and lecture (theoretical or practical). If you choose a playlist, it will be added as is, specifying the course and lecture type.</p>
            </div>
        </div>
    )
}


export const ContentBox = ({className, icon, title, description, enabled = false}) => {
    return (
        <div
            className={`${className}  ${enabled ? `border-primary border-2` : `border-softGray border-[1px]`} cursor-pointer w-full h-fit py-4 px-2 rounded-lg flex flex-row max-w-[700px] text-onBackground items-center gap-4 justify-between hover:bg-black/10 transition duration-300 ease-in-out`}>
            <div className={`flex flex-row gap-4 items-center justify-between`}>
                <div className={`${enabled ? `text-primary` : `text-onBackground`} `}>{icon}</div>
                <div className={`flex flex-col gap-2`}>
                    <h1 className={`font-medium text-[24px]`}>{title}</h1>
                    <p className={`text-onBackgroundCaption`}>{description}</p>
                </div>
            </div>
            <CustomRadioButton enabled={enabled}/>
        </div>
    )
}

const CustomRadioButton = ({enabled = false}) => {
    return (
        <div className="flex items-center space-x-4">
            <label className={`flex items-center ${enabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
                <input
                    type="radio"
                    name="custom-radio"
                    className="hidden peer"
                    disabled={enabled}
                />
                <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        enabled ? "bg-primary peer-checked:bg-primary"
                            : "border-[1px] border-softGray"
                    }`}
                >
                    {enabled && <div className="w-3 h-3 bg-onPrimary rounded-full"></div>}
                </div>
            </label>
        </div>
    );
};