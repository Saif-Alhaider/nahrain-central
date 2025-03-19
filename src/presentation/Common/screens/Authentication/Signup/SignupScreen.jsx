import {BaseAuthentication} from "../BaseAuthentication";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import finishSignup from "../Finish Signup/resources/finishSignup.png";
import {NahrainButton} from "presentation/Common/component/NahrainButton";
import {TextDivider} from "presentation/Common/component/TextDivider";
import {NahrainInput} from "presentation/Common/component/NahrainInput";
import {postRequest} from "api/postRequest";
import {AuthConfig, RegisterRequest} from "../../../../../api/config/AuthConfig";
import {Link, useNavigate} from "react-router-dom";
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
    const [fullName, setFullName] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isFullNameValid, setIsFullNameValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const navigate = useNavigate();
    const {setAccessToken, setRefreshToken} = useContext(AuthContext)

    const onClickSignup = useCallback(() => {
        setIsLoading(true)
        if (!isValidNahrainEmail(email)) {
            setIsEmailValid(false)
        } else {
            setIsEmailValid(true)
        }
        if (!validateArabicName(fullName)) {
            setIsFullNameValid(false)
        } else {
            setIsFullNameValid(true)
        }
        if (password !== confirmPassword || !password && !confirmPassword) {
            setIsPasswordValid(false)
        } else {
            setIsPasswordValid(true)
        }


        if (isEmailValid && isFullNameValid && password === confirmPassword) {
            const requestBody = RegisterRequest(fullName, email, password)

            postRequest({
                path: AuthConfig.REGISTER,
                data: requestBody,
                onSuccess: onSignupSuccess,
                onError: onSignupFail
            });
            return
        }
        setIsLoading(false)
    })

    const onSignupSuccess = (data) => {
        setIsLoading(false)
        setAccessToken(data.payload.token)
        setRefreshToken(data.payload.refreshToken)
        navigate("/scan-totp", {state: data})
    }
    const onSignupFail = (error) => {
        console.log(error)
        setIsLoading(false)
    }

    useEffect(() => {
        const handleEnterPress = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                onClickSignup()
            }
        };

        document.addEventListener("keydown", handleEnterPress);
        return () => document.removeEventListener("keydown", handleEnterPress);
    }, [onClickSignup]);

    return (
        <form className={`${className}`} onSubmit={(e) => e.preventDefault()} autoComplete={'off'}>
            <h1 className="text-[32px] text-onBackground w-full xl:text-start text-center font-semibold">{t('signup')}</h1>
            <NahrainInput type={`text`} className={`mt-12`} placeholder={"Full Name"}
                          onChange={setFullName}/>
            {!isFullNameValid ?
                <h1 className={`animate-fade-up animate-once animate-duration-[400ms] text-error`}>{t("invalid_full_name")}</h1> : null}

            <NahrainInput type={`email`} className={`mt-4`} placeholder={"John@nahrainuniv.edu.iq"}
                          onChange={setEmail}/>
            {!isEmailValid ?
                <h1 className={`animate-fade-up animate-once animate-duration-[400ms] text-error`}>{t("invalid_email")}</h1> : null}


            <NahrainInput type={`password`} className={`mt-4`} placeholder={t("enter_password")}
                          onChange={setPassword}/>

            <NahrainInput type={`password`} className={`mt-4`} placeholder={t("confirm_password")}
                          onChange={setConfirmPassword}/>
            {!isPasswordValid ?
                <h1 className={`animate-fade-up animate-once animate-duration-[400ms] text-error`}>{t("invalid_password")}</h1> : null}
            <a href="#"
               className="flex flex-wrap underline text-[16px] mt-[16px] text-secondary">{t("forgot_password")}</a>
            <NahrainButton onClick={onClickSignup}
                           className={`mt-6`}
                           children={
                               isLoading ? <CircularProgress sx={{color: "var(--on-primary)"}}/> :
                                   <p className="text-2xl ">{t("signup")}</p>
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
                <Link to={"/login"} className={`text-secondary underline`}>
                    {t("login")}
                </Link>
            </p>
        </form>)
}

const isValidNahrainEmail = (email) => /^[a-zA-Z0-9._%+-]+@nahrainuniv(\.edu(\.iq)?)?$/.test(email);
const validateArabicName = (name) => /^[\u0600-\u06FF\s]{2,} [\u0600-\u06FF\s]{2,} [\u0600-\u06FF\s]{2,}$/.test(name);

