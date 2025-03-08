import {Sidebar} from "./Sidebar";
import {MenuItem} from "./MenuItem";
import React from "react";
import {ReactComponent as IcHome} from 'presentation/Common/resources/images/ic_home.svg'
import {ReactComponent as IcCalendar} from 'presentation/Common/resources/images/ic_calendar.svg'
import {ReactComponent as IcPlay} from 'presentation/Common/resources/images/ic_play.svg'
import {ReactComponent as IcSettings} from 'presentation/Common/resources/images/ic_settings.svg'
import {ReactComponent as IcUser} from 'presentation/Common/resources/images/ic_user.svg'
import {useTranslation} from "react-i18next";

export const StudentSidebar = ({currentScreen, onDismiss, className, isVisible}) => {
    const [t, i18] = useTranslation("global");

    return (
        <Sidebar onDismiss={onDismiss} isVisible={isVisible} className={className}>
            <div className="flex flex-col h-full">
                <p className="text-onBackgroundCaption text-[16px] my-4">Menu</p>
                <div className="flex flex-col gap-2 unselectable">
                    <MenuItem onDismiss={onDismiss} icon={IcHome} text={t("home")} to='/'
                              isActive={currentScreen === t("home")}/>
                    <MenuItem onDismiss={onDismiss} icon={IcCalendar} to='/lectures-schedule'
                              text={t('lectures_schedule')} isActive={currentScreen === t('lectures_schedule')}/>
                    <MenuItem onDismiss={onDismiss} icon={IcPlay} to='/recorded-lectures'
                              text={t('recorded_lectures')} isActive={currentScreen === t('recorded_lectures')}/>
                </div>
                <div className="flex-grow flex flex-col justify-end gap-2 mt-8">
                    <MenuItem onDismiss={onDismiss} icon={IcSettings} to='/settings'
                              text={t("settings")} isActive={currentScreen === t("settings")}/>
                    <MenuItem onDismiss={onDismiss} icon={IcUser} to='/contact-me'
                              text={t('contact_me')} isActive={currentScreen === t('contact_me')}/>
                </div>
            </div>
        </Sidebar>
    )
}