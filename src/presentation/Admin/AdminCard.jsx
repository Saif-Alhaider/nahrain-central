import React from "react";

export const AdminCard = ({
                              title,
                              description,
                              buttonTitle,
                              onButtonClick,
                              TitleIcon,
                              ButtonIcon,
                              className
                          }) => {
    return (
        <>
            <div className={`${className} flex flex-wrap justify-between gap-x-8 gap-y-4`}>
                <div className="flex flex-row gap-2 flex-1">
                    <div className="flex flex-col gap-2">
                        <div className={`flex flex-row items-center gap-2`}>
                            {TitleIcon && <TitleIcon className="w-6 h-6 min-w-6 min-h-6 flex-none text-onBackground"/>}

                            <h1 className="text-2xl text-onBackground font-semibold">{title}</h1>
                        </div>
                        <p className="text-[16px] ms-8 text-onBackgroundCaption">{description}</p>
                    </div>
                </div>
                <button
                    onClick={onButtonClick}
                    className="w-full md:max-w-fit md:flex-1 justify-center text-onBackground text-nowrap border rounded-lg border-softGray h-12 px-6 text-lg flex flex-row gap-2 items-center"
                >
                    <span>{buttonTitle}</span>
                    {ButtonIcon && <ButtonIcon/>}
                </button>
            </div>
            <hr className="border-[0.5px] my-4 border-strokeGray unselectable"/>
        </>

    );
};

