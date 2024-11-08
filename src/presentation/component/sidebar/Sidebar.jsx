import Logo from "../Logo";
import "output.css"
import 'index.css'
import React from "react";
import {ReactComponent as IcBell} from './resources/ic_bell.svg'
import {ReactComponent as IcLock} from './resources/ic_lock.svg'
import {ReactComponent as IcStar} from './resources/ic_star.svg'
import {ReactComponent as IcMenuDots} from './resources/ic_menu_dots.svg'

export const Sidebar = () => {
    return (
        <div className="w-[320px] h-dvh sticky light p-8 bg-card flex flex-col justify-between">
           <div className="upperSidebar">
               <Logo className="w-28 h-8 unselectable"/>
               <hr className="flex-1 border-[0.5px] my-6 border-strokeGrey unselectable"/>
               <p className="text-onBackgroundCaption mb-6">Menu</p>
               <div className="flex flex-col gap-4 unselectable">
                   <MenuItem icon={IcStar} text="Appearance" isActive={true}/>
                   <MenuItem icon={IcBell} text="Appearance"/>
                   <MenuItem icon={IcLock} text="Appearance"/>
               </div>
           </div>
            <div className="lowerSidebar unselectable">
                <hr className="flex-1 border-[0.5px] mt-6 border-strokeGrey"/>
                <div className="sidebar-profile-details mt-5 flex flex-row gap-4 items-center">
                    <img className="size-14 rounded-full object-cover"
                         src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                         alt="Rounded avatar" draggable={false}/>
                    <div className="w-[140px] ">
                        <h1 className="text-onBackground text-[24px]">محمد خالد</h1>
                        <p className="text-strokeGrey text-[12px] w-full text-nowrap overflow-hidden overflow-ellipsis">mohammadKhalid@nahrain.iq</p>
                    </div>
                <IcMenuDots className="text-onBackground flex-grow cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}

const MenuItem = ({icon: Icon, text, isActive, className}) => {
    const backgroundClass = isActive ? 'bg-selectedItem' : 'bg-none';

    return (
        <div className={`w-full h-12 rounded-lg flex flex-row items-center px-4 cursor-pointer ${backgroundClass} ${className}`}>
            <Icon className="size-6 text-onBackground" />
            <p className="ps-2 text-onBackground unselectable">{text}</p>
        </div>
    );
};