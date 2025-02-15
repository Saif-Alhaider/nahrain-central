import Logo from "../Logo";
import React from "react";
import 'index.css'
import 'output.css';
import {ReactComponent as IcMenuDots} from 'presentation/Common/component/sidebar/resources/ic_menu_dots.svg'


export const Sidebar = ({onDismiss, className, isVisible, children}) => {
    return (
        <div className={className}>
            <div
                className={`${isVisible ? '' : 'ltr:-translate-x-full rtl:translate-x-full'}  lg:ltr:translate-x-0 lg:rtl:translate-x-0 
z-10  overflow-y-scroll lg:sticky fixed min-w-[288px] h-dvh py-4 px-6 bg-card flex flex-col justify-between`
                }
                style={{
                    transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1),background-color 200ms linear',
                }}
            >
                <div className="upperSidebar flex-grow h-full overflow-y-auto scrollbar flex flex-col">
                    <Logo className="w-28 h-8 unselectable shrink-0"/>
                    <hr className="border-[0.5px] mt-6 border-strokeGray unselectable"/>
                    <div className="flex-grow">
                        {children}
                    </div>
                </div>

                <div className="lowerSidebar unselectable mt-auto">
                    <hr className="border-[0.5px] mt-6 border-strokeGray"/>
                    <div className="sidebar-profile-details mt-5 flex flex-row gap-4 items-center">
                        <img className="size-14 rounded-full object-cover"
                             src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                             alt="Rounded avatar" draggable={false}/>
                        <div className="w-[140px] ">
                            <h1 className="text-onBackground text-[24px]">محمد خالد</h1>
                            <p className="text-onBackgroundCaption text-[12px] w-full text-nowrap overflow-hidden overflow-ellipsis">mohammadKhalid@nahrain.iq</p>
                        </div>
                        <IcMenuDots className="text-onBackground flex-grow cursor-pointer"/>
                    </div>
                </div>
            </div>
            <div onClick={onDismiss}
                 className={`bg-black size-full lg:hidden fixed ${isVisible ? 'opacity-65' : 'opacity-0 pointer-events-none'} transition-opacity delay-150 ease-linear`}/>
        </div>
    )
}