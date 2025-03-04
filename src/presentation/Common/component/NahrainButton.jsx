import React from "react";

export const NahrainButton = ({className,onClick, children}) => {
    return (
        <button
            type={"button"}
            onClick={onClick}
            className={`${className} bg-primary flex items-center text-onPrimary gap-3 rounded-lg w-full justify-center h-14 max-w-full`}>
            {children}
        </button>
    )
}
