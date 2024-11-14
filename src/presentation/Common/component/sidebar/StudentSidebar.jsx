import {Sidebar} from "./Sidebar";
import {Theme} from "../../../../routes/RoutesConstant";
import {MenuItem} from "./MenuItem";
import React from "react";
import {ReactComponent as IcHome} from 'presentation/Common/component/sidebar/resources/ic_home.svg'
import {ReactComponent as IcCalendar} from 'presentation/Common/component/sidebar/resources/ic_calendar.svg'
import {ReactComponent as IcPlay} from 'presentation/Common/component/sidebar/resources/ic_play.svg'
import {ReactComponent as IcSettings} from 'presentation/Common/component/sidebar/resources/ic_settings.svg'
import {ReactComponent as IcUser} from 'presentation/Common/component/sidebar/resources/ic_user.svg'

export const StudentSidebar = () => {
    return (
        <Sidebar theme={Theme.DARK}>
            <div className="flex flex-col h-full">
                <p className="text-onBackgroundCaption text-[16px] my-4">Menu</p>
                <div className="flex flex-col gap-2 unselectable">
                    <MenuItem icon={IcHome} text="Home" isActive={true}/>
                    <MenuItem icon={IcCalendar} text="Lectures Schedule"/>
                    <MenuItem icon={IcPlay} text="Recorded Lectures"/>
                </div>
                <div className="flex-grow flex flex-col justify-end gap-2 mt-8">
                    <MenuItem icon={IcSettings} text="Settings"/>
                    <MenuItem icon={IcUser} text="Contact Me"/>
                </div>
            </div>
        </Sidebar>
    )
}