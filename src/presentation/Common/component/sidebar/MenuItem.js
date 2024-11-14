import React from "react";
import 'output.css'
import 'index.css'
export const MenuItem = ({icon: Icon, text, isActive, className}) => {
    const backgroundClass = isActive ? 'bg-selectedItem cursor-default' : 'bg-none transition ease-linear duration-75 hover:bg-background cursor-pointer';
    return (
        <div
            className={`touch-auto w-full rounded-lg flex flex-row px-4 py-2 unselectable ${backgroundClass} ${className}`}>
            <Icon className="size-6 text-onBackground"/>
            <p className="ps-2 text-onBackground text-[16px]">{text}</p>
        </div>
    );
};