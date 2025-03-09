import {useTranslation} from "react-i18next";
import {Sidebar} from "./Sidebar";
import {MenuItem} from "./MenuItem";
import React from "react";
import {ReactComponent as IcDashboard} from "presentation/Common/resources/images/ic_dashboard.svg";
import {ReactComponent as IcCalendar} from 'presentation/Common/resources/images/ic_calendar.svg'
import {ReactComponent as IcUsers} from 'presentation/Common/resources/images/ic_users.svg'
import {ReactComponent as IcSettings} from 'presentation/Common/resources/images/ic_settings.svg'
import {ReactComponent as IcUser} from 'presentation/Common/resources/images/ic_user.svg'
import {ReactComponent as IcBook} from 'presentation/Common/resources/images/ic_book.svg'


export const AdminSidebar = ({currentScreen, onDismiss, className, isVisible}) => {
    const [t, i18] = useTranslation("global");
    return (
        <Sidebar onDismiss={onDismiss} isVisible={isVisible} className={className}>
            <div className="flex flex-col h-full w-full">
                <p className="text-onBackgroundCaption text-[16px] my-4">{t('menu')}</p>
                <div className="flex flex-col gap-2 overflow-y-auto unselectable">
                    <MenuItem onDismiss={onDismiss} icon={IcDashboard} text={t("dashboard")} to='/'
                              isActive={currentScreen === t("dashboard")}/>
                    <MenuItem onDismiss={onDismiss} icon={IcUsers} to='/users'
                              text={t('users')} isActive={currentScreen === t('users')}/>

                    <MenuItem onDismiss={onDismiss} icon={IcCalendar} to='/schedule'
                              text={t('schedule')} isActive={currentScreen === t('schedule')}/>
                    <MenuItem onDismiss={onDismiss} icon={IcBook} to='/syllabus'
                              text={t('syllabus')} isActive={currentScreen === t('syllabus')}/>
                </div>
                <div className="flex-grow flex flex-col justify-end gap-2 mt-4">
                    <MenuItem onDismiss={onDismiss} icon={IcSettings} to='/settings'
                              text={t("settings")} isActive={currentScreen === t("settings")}/>
                    <MenuItem onDismiss={onDismiss} icon={IcUser} to='/contact-me'
                              text={t('contact_me')} isActive={currentScreen === t('contact_me')}/>
                </div>
            </div>
        </Sidebar>
    )
}