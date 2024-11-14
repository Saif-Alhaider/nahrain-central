import {Appbar} from "./appbar/Appbar";
import {ProfSidebar} from "./sidebar/ProfSidebar";
import 'output.css'
import 'index.css'
import React, {useState} from "react";

export const MainScaffold = ({title,child}) => {
    const showAppbar = 'block lg:hidden'
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };
    return (
        <div className={`w-full h-dvh flex flex-row relative bg-background dark`}>
            <div className={` z-40`}>
                <div className={showAppbar}>
                    <Appbar title ={title} className='!z-0 w-full' onClick={toggleVisibility}/>
                </div>
                <ProfSidebar onDismiss={toggleVisibility} className={`z-40 h-full`}
                             isVisible={isVisible}/>
            </div>
            <div className='flex flex-col gap-14 w-full h-full'>
                <div className={`${showAppbar} bg-background`}/>
                {child}
            </div>
        </div>
    )
}
