import 'output.css'
import 'index.css'
import notFoundImg from 'presentation/Common/screens/NotFound404/resources/notFound.png'
import React from "react";

export const NotFound404 = () => {
    return (
        <div className={"h-dvh w-full overflow-hidden bg-background"}>
            <div className={"flex flex-col w-full items-center px-4"}>
                <h1 className={'text-[120px] text-onBackground font-semibold'}>4<span className={'text-primary'}>0</span>4</h1>
                <p className={"text-onBackgroundCaption lg:text-[24px] text-[14px] max-w-[757px] text-center mt-1"}>Oops! The page you’re looking for doesn’t exist. It might have been removed, had its name changed, or
                    is
                    temporarily unavailable. Please check the URL or go back to the homepage.</p>
                <a className={"text-secondary mt-6 lg:text-[24px] text-[16px] font-medium cursor-pointer"}>Go Back Home</a>
            </div>
            <div className={"min-w-[1000px] max-w-full h-[591px]"}>
                <img src={notFoundImg} alt="auth"  className={` mx-auto authentication-image object-cover object-left`}/>

            </div>
        </div>
    )
}
