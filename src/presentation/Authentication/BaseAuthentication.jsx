import Logo from "../component/Logo";
import React from "react";
import 'output.css';


export const BaseAuthentication = ({image,imageClassName, description,children}) => {
    return (
        <div className="min-h-dvh flex flex-row dark">
            <div className="h-[inherit] flex flex-col w-screen xl:w-1/2 bg-card xl:px-14 px-6 windows:py-12 py-6">
                <Logo className="xl:mx-0 mx-auto" width={158} height={46}/>
                <div className="flex-grow content-center mt-6 w-full max-w-[536px] mx-auto flex flex-col justify-center">
                    {children}
                </div>
            </div>
            <div
                className="h-[inherit] w-1/2 bg-background px-[56px] py-[48px] content-center xl:block overflow-hidden hidden">
                <p className="text-onBackground">{description}</p>
                <img src={image} alt="auth" className={`w-full mx-auto authentication-image scale-125 ${imageClassName}`}/>
            </div>
        </div>

    )
}
