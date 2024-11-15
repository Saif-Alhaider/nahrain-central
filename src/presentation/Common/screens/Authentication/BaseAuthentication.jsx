import Logo from "../../component/Logo";
import React from "react";
import 'output.css';


export const BaseAuthentication = ({image,imageClassName, description,children}) => {
    return (
        <div className="h-dvh overflow-y-hidden w-dvw flex flex-row dark">
            <div className="h-[inherit] flex flex-col xl:w-1/2 w-[inherit] bg-card xl:px-14 px-4 py-4">
                <Logo className="xl:mx-0 mx-auto shrink-0 tablet:absolute tablet:right-4" width={158} height={46}/>
                <div className="h-full w-full max-w-[536px] mx-auto flex flex-col  xl:justify-center xl:mt-0 lg:mt-0 content-center lg:justify-center justify-start mt-4 ">
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
