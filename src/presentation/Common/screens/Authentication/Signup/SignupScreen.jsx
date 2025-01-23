import {BaseAuthentication} from "../BaseAuthentication";
import React from "react";
import {useTranslation} from "react-i18next";
import {ReactComponent as IcEye} from "presentation/Common/resources/ic_eye.svg";
import {IcGoogle} from "presentation/Common/component/ic_google";
import finishSignup from "../Finish Signup/resources/finishSignup.png";

export const SignupScreen = () => {
    const [t, i18] = useTranslation("global");

    return (
        <BaseAuthentication image={finishSignup} imageClassName="translate-y-44 scale-150"
                            description={t("professors_can_publish_student_grades")}
        ><SignupForm/></BaseAuthentication>
    )
}


export const SignupForm = ({className}) => {
    const [t, i18] = useTranslation("global");

    return (
        <form className={className}>
            <h1 className="text-[32px] text-onBackground w-full xl:text-start text-center font-semibold">{t('signup')}</h1>
            <input placeholder="John@nahrainuniv.edu.iq"
                   className="text-onBackground mt-[48px] max-w-full w-full p-[16px] rounded-[8px] bg-transparent border border-strokeGray transition-colors focus:outline-none focus:border-secondary placeholder-onBackgroundCaption"
                   type="email"/>
            {/*TODO FIX THE INPUT FOCUS COLOR*/}
            <div
                className="mt-4 text-onBackground flex flex-row items-center border border-strokeGray rounded-lg px-4 py-4">
                <input type="password" id="password"
                       className="placeholder-onBackgroundCaption w-full bg-transparent focus:outline-none focus:border-secondary transition-colors"
                       placeholder={t("enter_password")}/>
                <span className={`cursor-pointer`}><IcEye/></span>
            </div>
            {/*TODO FIX THE INPUT FOCUS COLOR*/}
            <div
                className="mt-4 text-onBackground flex flex-row items-center border border-strokeGray rounded-lg px-4 py-4">
                <input type="password" id="password"
                       className="placeholder-onBackgroundCaption w-full bg-transparent"
                       placeholder={t("confirm_password")}/>
                <span className={`cursor-pointer text-onBackgroundCaption`}><IcEye/></span>
            </div>
            <a href="#"
               className="flex flex-wrap underline text-[16px] mt-[16px] text-secondary">{t("forgot_password")}</a>
            <button className="bg-primary w-full max-w-full text-white h-14 rounded-lg text-[24px] mt-6">{t("login")}
            </button>
            <div className="flex items-center mt-6 w-full max-w-full">
                <hr className="flex-grow border border-strokeGray"/>
                <div className="mx-4 flex-shrink text-[16px] text-onBackgroundCaption">{t("or_login_with")}</div>
                <hr className="flex-grow border border-strokeGray"/>
            </div>
            <button
                className="mt-6 flex items-center gap-3 rounded-lg bg-background w-full justify-center h-14 max-w-full">
                <IcGoogle/>
                <p className="text-logo text-2xl">Google</p>
            </button>
            <p className="mt-6 text-onBackground w-fit xl:mx-0 mx-auto">{t("you_have_an_account")}&nbsp;
                <a href="#" className="text-secondary underline">{t("login")}</a>
            </p>
        </form>
    )
}
