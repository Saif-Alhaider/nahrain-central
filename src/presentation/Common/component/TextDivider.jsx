import React from "react";

export const TextDivider = ({className, text}) => {
    return (
        <div className={`${className} flex items-center  w-full max-w-full`}>
            <hr className="flex-grow border border-strokeGray"/>
            <div className="mx-4 flex-shrink text-[16px] text-onBackgroundCaption">{text}</div>
            <hr className="flex-grow border border-strokeGray"/>
        </div>
    )
}
