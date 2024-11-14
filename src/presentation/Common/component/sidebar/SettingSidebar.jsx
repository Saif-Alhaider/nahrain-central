import 'index.css'
import 'output.css';
import React from "react";
import {ReactComponent as IcBell} from './resources/ic_bell.svg'
import {ReactComponent as IcLock} from './resources/ic_lock.svg'
import {ReactComponent as IcStar} from './resources/ic_star.svg'
import {Sidebar} from "./Sidebar";
import {MenuItem} from "presentation/Common/component/sidebar/MenuItem";


export const SettingSidebar = ({className}) => {
    return (
        <Sidebar className={className}>
            <p className="text-onBackgroundCaption text-[16px] my-4">Settings</p>
            <div className="flex flex-col gap-4 unselectable">
                <MenuItem icon={IcStar} text="Appearance" isActive={true}/>
                <MenuItem icon={IcBell} text="Notifications"/>
                <MenuItem icon={IcLock} text="Privacy"/>
            </div>
        </Sidebar>
    )
}

