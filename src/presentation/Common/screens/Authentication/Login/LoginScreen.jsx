import React from "react";
import 'output.css';
import {BaseAuthentication} from "../BaseAuthentication";
import LoginImage from "./resources/Design.png";
import {IcEye} from "presentation/Common/component/ic_eye";
import {IcGoogle} from "presentation/Common/component/ic_google";

export const LoginScreen = () => {
    return (
        <BaseAuthentication image={LoginImage} imageClassName="mt-8"
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
                   className="transition-colors text-onBackground mt-[48px] max-w-full w-full p-[16px] rounded-[8px] bg-transparent border border-strokeGray focus:outline-none focus:border-secondary placeholder-onBackgroundCaption"
                   type="email"/>

            <div className="relative mt-4 text-onBackground">
                <input type="password" id="password"  className="w-full bg-transparent pl-4 pr-12 py-4 border border-strokeGray rounded-lg focus:outline-none focus:border-secondary transition-colors" placeholder="Password"/>
                <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-4 right-4 focus:outline-none transition-colors" ><i><IcEye/></i></button>
                </div>
            <a href="#" className="flex flex-wrap underline text-[16px] mt-[16px] text-onBackground">Forgot
                Password?</a>
            <button className="bg-primary w-full max-w-full text-white h-14 rounded-lg text-[24px] mt-6">Login
            </button>
            <div className="flex items-center space-x-4 mt-6 w-full max-w-full">
                <hr className="flex-1 border border-strokeGray"/>
                <div className="w-fit text-[16px] text-onBackgroundCaption">or Login With</div>
                <hr className="flex-1 border border-strokeGray"/>
            </div>
            <button
                className="mt-6 flex items-center gap-3 rounded-lg bg-background w-full justify-center h-14 max-w-full">
                <IcGoogle/>
                <p className="text-logo text-2xl">Google</p>
            </button>
            <p className="mt-6 text-onBackground w-fit xl:mx-0 mx-auto">Don’t have an Account?&nbsp;
                <a href="#" className="text-secondary underline">Signup</a>
            </p>
        </form>
    )
}
