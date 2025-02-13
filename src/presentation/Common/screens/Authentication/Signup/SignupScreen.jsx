import {BaseAuthentication} from "../BaseAuthentication";
import React from "react";
import {useTranslation} from "react-i18next";
import {IcGoogle} from "presentation/Common/component/ic_google";
import finishSignup from "../Finish Signup/resources/finishSignup.png";
import {NahrainButton} from "../../../component/NahrainButton";
import {TextDivider} from "../../../component/TextDivider";
import {NahrainInput} from "../../../component/NahrainInput";

export const SignupScreen = () => {
    const [t] = useTranslation("global");

    return <BaseAuthentication
        image={finishSignup} imageClassName="translate-y-44 scale-150"
        description={t("professors_can_publish_student_grades")}
    ><SignupForm/></BaseAuthentication>
}


export const SignupForm = ({className}) => {
    const [t] = useTranslation("global");

    return (<form className={className}>
        <h1 className="text-[32px] text-onBackground w-full xl:text-start text-center font-semibold">{t('signup')}</h1>
        <NahrainInput type={`email`} className={`mt-[48px]`} placeholder={"John@nahrainuniv.edu.iq"}/>

        <NahrainInput type={`password`} className={`mt-4`} placeholder={t("enter_password")}/>

        <NahrainInput type={`password`} className={`mt-4`} placeholder={t("confirm_password")}/>

        <a href="#"
           className="flex flex-wrap underline text-[16px] mt-[16px] text-secondary">{t("forgot_password")}</a>
        <NahrainButton className={`mt-6`} children={<p className=" text-2xl ">{t("login")}</p>}/>

        <TextDivider text={t("or_login_with")} className={`mt-6`}/>

        <NahrainButton className={`!bg-background mt-6`} children={
            <>
                <IcGoogle/>
                <p className="text-logo text-2xl">Google</p>
            </>}/>
        <p className="mt-6 text-onBackground w-fit xl:mx-0 mx-auto">{t("you_have_an_account")}&nbsp;
            <a href="#" className="text-secondary underline">{t("login")}</a>
        </p>
    </form>)
}

