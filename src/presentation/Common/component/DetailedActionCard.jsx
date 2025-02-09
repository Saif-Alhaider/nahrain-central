import React from "react";
import "output.css"
import 'index.css'

export const DetailedActionCard = ({title, description, buttonTitle,onClick}) => {
    return (
        <div
            className={`flex xl:items-center items-stretch lg:xl:flex-row flex-col gap-4 py-8 px-4 rounded-2xl border-[1px] border-strokeGray justify-between`}>
            <div>
                <h1 className="text-onBackground text-[24px]">{title}</h1>
                <p className="text-onBackgroundCaption mt-2">{description}</p>
            </div>
            <button onClick={onClick}
                className="bg-primary text-onPrimary text-nowrap rounded-lg xl:text-2xl text-xl px-4 py-2 h-12 ">{buttonTitle}
            </button>
        </div>
    )
}