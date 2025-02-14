import {MenuItem} from "presentation/Common/component/sidebar/MenuItem";
import {Sidebar} from "./Sidebar";
import React from "react";
import 'output.css'
import 'index.css'
import {ReactComponent as IcHome} from 'presentation/Common/component/sidebar/resources/ic_home.svg'
import {ReactComponent as IcCalendar} from 'presentation/Common/component/sidebar/resources/ic_calendar.svg'
import {ReactComponent as IcPlay} from 'presentation/Common/component/sidebar/resources/ic_play.svg'
import {ReactComponent as IcUsersGroup} from 'presentation/Common/component/sidebar/resources/ic_users_group.svg'
import {ReactComponent as IcCrown} from 'presentation/Common/component/sidebar/resources/ic_crown.svg'
import {ReactComponent as IcMark} from 'presentation/Common/component/sidebar/resources/ic_mark.svg'
import {ReactComponent as IcSettings} from 'presentation/Common/resources/images/ic_settings.svg'
import {ReactComponent as IcUser} from 'presentation/Common/component/sidebar/resources/ic_user.svg'
import {useTranslation} from "react-i18next";


export const ProfSidebar = ({currentScreen, onDismiss, className, isVisible}) => {
    const [t, i18] = useTranslation("global");
    return (
        <Sidebar onDismiss={onDismiss} isVisible={isVisible} className={className}>
            <div className="flex flex-col h-full w-full">
                <p className="text-onBackgroundCaption text-[16px] my-4">{t('menu')}</p>
                <div className="flex flex-col gap-2 overflow-y-auto unselectable">
                    <MenuItem onDismiss={onDismiss} icon={IcHome} text={t("home")} to='/'
                              isActive={currentScreen === t("home")}/>
                    <MenuItem onDismiss={onDismiss} icon={IcCalendar} to='/lectures-schedule'
                              text={t('lectures_schedule')} isActive={currentScreen === t('lectures_schedule')}/>
                    <MenuItem onDismiss={onDismiss} icon={IcPlay} to='/recorded-lectures'
                              text={t('recorded_lectures')} isActive={currentScreen === t('recorded_lectures')}/>
                </div>
                <hr className="border-[0.5px] my-4 border-strokeGray unselectable"/>
                <p className="text-onBackgroundCaption text-[16px] mb-2">{t('class_management')}</p>
                <div className="flex flex-col gap-2 overflow-y-auto flex-grow">
                    <MenuItem onDismiss={onDismiss} icon={IcUsersGroup} to='/record-absence'
                              text={t('record_absence')} isActive={currentScreen === t('record_absence')}/>
                    <MenuItem onDismiss={onDismiss} icon={IcCrown} to='/exams' text={t('exams')}
                              isActive={currentScreen === t('exams') || currentScreen === t("announcement")}/>
                    <MenuItem onDismiss={onDismiss} icon={IcMark} to='/grades' text={t('grades')}
                              isActive={currentScreen === t('grades')}/>
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
