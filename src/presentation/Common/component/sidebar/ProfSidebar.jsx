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
import {ReactComponent as IcSettings} from 'presentation/Common/component/sidebar/resources/ic_settings.svg'
import {ReactComponent as IcUser} from 'presentation/Common/component/sidebar/resources/ic_user.svg'


export const ProfSidebar = ({currentScreen,onDismiss, className, isVisible}) => {
    return (
        <Sidebar onDismiss={onDismiss} isVisible={isVisible} className={className}>
            <div className="flex flex-col h-full w-full">
                <p className="text-onBackgroundCaption text-[16px] my-4">Menu</p>
                <div className="flex flex-col gap-2 overflow-y-auto unselectable">
                    <MenuItem onDismiss={onDismiss} icon={IcHome} text="Home" to='/' isActive={currentScreen === "Home"}/>
                    <MenuItem onDismiss={onDismiss} icon={IcCalendar} to='lectures-schedule' text="Lectures Schedule" isActive={currentScreen === "Lectures Schedule"}/>
                    <MenuItem onDismiss={onDismiss} icon={IcPlay} to='recorded-lectures' text="Recorded Lectures" isActive={currentScreen === "Recorded Lectures"}/>
                </div>
                <hr className="border-[0.5px] my-4 border-strokeGray unselectable"/>
                <p className="text-onBackgroundCaption text-[16px] mb-2">Class Management</p>
                <div className="flex flex-col gap-2 overflow-y-auto flex-grow">
                    <MenuItem onDismiss={onDismiss} icon={IcUsersGroup} to='record-absence' text="Record Absence" isActive={currentScreen === "Record Absence"}/>
                    <MenuItem onDismiss={onDismiss} icon={IcCrown} to='exams' text="Exams" isActive={currentScreen === "Exams"}/>
                    <MenuItem onDismiss={onDismiss} icon={IcMark} to='grades' text="Grades" isActive={currentScreen === "Grades"}/>
                </div>
                <div className="flex-grow flex flex-col justify-end gap-2 mt-4">
                    <MenuItem onDismiss={onDismiss} icon={IcSettings} to='settings' text="Settings" isActive={currentScreen === "Settings"}/>
                    <MenuItem onDismiss={onDismiss} icon={IcUser} to='contact-me' text="Contact Me" isActive={currentScreen === "Contact Me"}/>
                </div>
            </div>
        </Sidebar>
    )
}
