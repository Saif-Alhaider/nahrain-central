import React from "react";
import 'output.css'
import 'index.css'
import {Link} from "react-router-dom";

export const MenuItem = ({icon: Icon, text, isActive, to, onDismiss, className}) => {
    const backgroundClass = isActive ? 'bg-selectedItem' : 'bg-none';
    return (
        <Link to={to} onClick={onDismiss}
              className={`touch-auto w-full rounded-lg flex flex-row px-4 py-2 unselectable ${backgroundClass} ${className}`}>
            <Icon className="size-6 text-onBackground"/>
            <p className="ps-2 text-onBackground text-[16px]">{text}</p>
        </Link>
    );
};