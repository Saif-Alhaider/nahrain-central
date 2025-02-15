import {BaseAuthentication} from "../BaseAuthentication";
import React, {useCallback, useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import finishSignup from "../Finish Signup/resources/finishSignup.png";
import {NahrainButton} from "presentation/Common/component/NahrainButton";
import {TextDivider} from "presentation/Common/component/TextDivider";
import {NahrainInput} from "presentation/Common/component/NahrainInput";
import {postRequest} from "api/postRequest";
import {AuthConfig, RegisterRequest} from "../../../../../api/config/AuthConfig";
import {NahrainLogger} from "debug/NahrainLogger";
import {useNavigate} from "react-router-dom";
import {IcGoogle} from "presentation/Common/component/ic_google";
import {CircularProgress} from "@mui/material";
import {AuthContext} from "../../../../../context/AuthContext";

export const SignupScreen = () => {
    const [t] = useTranslation("global");

    return <BaseAuthentication
        image={finishSignup} imageClassName="translate-y-44 scale-150"
        description={t("professors_can_publish_student_grades")}
    ><SignupForm/></BaseAuthentication>
}


export const SignupForm = ({className}) => {
    const [t] = useTranslation("global");
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const {setAccessToken} = useContext(AuthContext)

    const onClickSignup = useCallback(async () => {
        setIsLoading(true)
        const requestBody = RegisterRequest(email, password)
        await postRequest(AuthConfig.REGISTER, requestBody, onSignupSuccess, onSignupFail);
    })

    const onSignupSuccess = (data) => {
        setIsLoading(false)
        setAccessToken(data.token)
        navigate("/")
    }
    const onSignupFail = (error) => {
        NahrainLogger.error(error)
    }

    return (<form className={className}>
        <h1 className="text-[32px] text-onBackground w-full xl:text-start text-center font-semibold">{t('signup')}</h1>
        <NahrainInput type={`email`} className={`mt-[48px]`} placeholder={"John@nahrainuniv.edu.iq"}
                      onChange={setEmail}/>

        <NahrainInput type={`password`} className={`mt-4`} placeholder={t("enter_password")} onChange={setPassword}/>

        <NahrainInput type={`password`} className={`mt-4`} placeholder={t("confirm_password")}
                      onChange={setConfirmPassword}/>

        <a href="#"
           className="flex flex-wrap underline text-[16px] mt-[16px] text-secondary">{t("forgot_password")}</a>
        <NahrainButton onClick={onClickSignup}
                       className={`mt-6`}
                       children={
                           isLoading ? <CircularProgress sx={{ color: "var(--on-primary)" }}/> :
                               <p className="text-2xl ">{t("login")}</p>
                       }
        />

        <TextDivider text={t("or_login_with")} className={`mt-6`}/>

        <NahrainButton className={`!bg-background mt-6`}
                       children={
                           <>
                               <IcGoogle/>
                               <p className="text-logo text-2xl">Google</p>
                           </>
                       }
        />
        <p className="mt-6 text-onBackground w-fit xl:mx-0 mx-auto">{t("you_have_an_account")}&nbsp;
            <a href="#" className="text-secondary underline">{t("login")}</a>
        </p>
    </form>)
}

