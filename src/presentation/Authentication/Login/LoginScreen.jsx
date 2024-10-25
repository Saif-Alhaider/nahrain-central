import React from "react";
import 'output.css';
import {BaseAuthentication} from "../BaseAuthentication";
import LoginImage from "../Login/resources/Design.png";
import {IcEye} from "../../component/ic_eye";
import {IcGoogle} from "../../component/ic_google";

export const LoginScreen = () => {
    return (
        <BaseAuthentication image={LoginImage}
                            description={"Nahrain Central is an academic platform for professors and students to manage grades, schedules, and\n" +
                                "                    attendance. It centralizes academic tasks in one place to streamline the educational process."}
        ><LoginForm/></BaseAuthentication>
    )
}

const LoginForm = ({className}) => {
    return (
        <form className={className}>
            <h1 className="text-[32px] text-onBackground w-full xl:text-start text-center font-semibold">Login</h1>
            <input placeholder="John@nahrainuniv.edu.iq"
                   className="mt-[48px] max-w-full w-full p-[16px] rounded-[8px] bg-transparent border border-strokeGrey focus:outline-none focus:border-secondary placeholder-onBackgroundCaption"
                   type="email"/>

            <div className="relative mt-[16px]">
                <input placeholder="Enter Password"
                       className=" max-w-full w-full p-[16px] rounded-lg bg-transparent border border-strokeGrey focus:outline-none focus:border-secondary placeholder-onBackgroundCaption"
                       type="password"/>
                <IcEye className="absolute top-[16px] right-[16px]"/>
            </div>
            <a href="#" className="flex flex-wrap underline text-[16px] mt-[16px] text-onBackground">Forgot
                Password?</a>
            <button className="bg-primary w-full max-w-full text-white h-14 rounded-lg text-[24px] mt-6">Login
            </button>
            <div className="flex items-center space-x-4 mt-6 w-full max-w-full">
                <hr className="flex-1 border border-strokeGrey"/>
                <div className="w-fit text-[16px] text-onBackgroundCaption">or Login With</div>
                <hr className="flex-1 border border-strokeGrey"/>
            </div>
            <button
                className="mt-6 flex items-center gap-3 rounded-lg bg-background w-full justify-center h-14 max-w-full">
                <IcGoogle/>
                <p className="text-logo text-2xl">Google</p>
            </button>
            <p className="mt-6 text-onBackground">Don’t have an Account?&nbsp;
                <a href="#" className="text-secondary underline">Signup</a>
            </p>
        </form>
    )
}
