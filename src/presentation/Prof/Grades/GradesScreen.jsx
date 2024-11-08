import "output.css"
import 'index.css'
import React from "react";

export const GradesScreen = () => {
    return (
        <div className="dark w-full h-dvh bg-background p-6">
            <PublishGradesCard/>
            <div className="mt-6">
                <h1 className="text-[24px] font-medium text-onBackground">Current Grades</h1>
                <p className="text-onBackgroundCaption mt-2">This table shows the current grades for all students. You
                    can modify the grades or add new ones for
                    each exam.</p>
            </div>
            <div className="flex flex-row gap-2">
                <Chip className="mt-6" text="None Carried Students" count={36} isActive={true}/>
                <Chip className="mt-6" text ="Carried Students" count={4} isActive={false}/>
            </div>
        </div>
    )
}

export const PublishGradesCard = () => {
    let smallWindow = "flex-col gap-4"
    return (
        <div className={`flex xl:flex-row lg:xl:flex-row ${smallWindow}  py-8 px-4 rounded-2xl border-2 border-strokeGrey justify-between`}>
            <div>
                <h1 className="text-onBackground text-[24px]">Publish Grades</h1>
                <p className="text-onBackgroundCaption mt-2">Click to publish exam grades for all students. You can
                    review
                    and edit grades before final publication.</p>
            </div>
            <button
                className="bg-primary text-onPrimary min-h-14 rounded-lg text-[24px] px-4 py-2">Publish Grades
            </button>
        </div>
    )
}

export const Chip = ({className,text,count, isActive}) => {
    let chipColor = isActive ? "bg-secondary" : "bg-card"
    return (
        <div
            className={`${className} ${chipColor} px-4 py-2  text-onBackground flex flex-row align-middle rounded-full w-fit cursor-pointer`}>
            <p className="text-[16px]">{text}</p>
            <svg className="mx-2 mt-[4px]" xmlns="http://www.w3.org/2000/svg" width="2" height="19" viewBox="0 0 2 20"
                 fill="none">
                <path
                    d="M1.54956 0.5C1.54956 0.223858 1.3257 0 1.04956 0C0.773418 0 0.549561 0.223858 0.549561 0.5H1.54956ZM0.549561 0.5V19.5H1.54956V0.5H0.549561Z"
                    fill="white" fillOpacity="0.86"/>
            </svg>
            <p className="text-[16px]">{count}</p>
        </div>
    )
}
