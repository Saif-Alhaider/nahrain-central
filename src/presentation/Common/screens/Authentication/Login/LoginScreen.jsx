import React, {useCallback, useContext, useState} from "react";
import 'output.css';
import {BaseAuthentication} from "../BaseAuthentication";
import LoginImage from "./resources/Design.png";
import {IcGoogle} from "presentation/Common/component/ic_google";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {NahrainInput} from "../../../component/NahrainInput";
import {AuthConfig, LoginRequest} from "../../../../../api/config/AuthConfig";
import {postRequest} from "../../../../../api/postRequest";
import {NahrainButton} from "../../../component/NahrainButton";
import {CircularProgress} from "@mui/material";
import {isNullOrBlank} from "../../../../../util/isNullOrBlank";
import {ErrorSnackbar} from "../../../component/ErrorSnackbar";
import {AuthContext} from "../../../../../context/AuthContext";

export const LoginScreen = () => {
    const [t, i18] = useTranslation("global");
    return (
        <BaseAuthentication image={LoginImage} imageClassName="mt-8"
                            description={t("login_description")}
        ><LoginForm/></BaseAuthentication>
    )
}

const LoginForm = ({className}) => {
    const [t, i18] = useTranslation("global");
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [isEmailEmpty, setIsEmailEmpty] = useState(false)
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [snackbarState, setSnackbarState] = useState({open: false, message: ''});
    const {setAccessToken, setRefreshToken} = useContext(AuthContext)
    const navigate = useNavigate();


    const onClickLogin = useCallback(async () => {
        setIsLoading(true)

        setIsEmailEmpty(isNullOrBlank(email));
        setIsPasswordEmpty(isNullOrBlank(password));

        if (isNullOrBlank(email) || isNullOrBlank(password)) {
            setIsLoading(false);
            return;
        }


        const requestBody = LoginRequest(email, password)

        await postRequest(AuthConfig.LOGIN, requestBody, onLoginSuccess, onLoginFail);
    })

    const onLoginSuccess = (data) => {
        setIsLoading(false);
        if (data.payload.mfaEnabled) {
            navigate("/totp", {state: {token: data.payload.token}});
        } else {
            setAccessToken(data.payload.token)
            setRefreshToken(data.payload.refreshToken)
            navigate("/scan-totp", {state: {token: data.payload.token, refreshToken: data.payload.refreshToken}});
        }
    }
    const onLoginFail = () => {
        setIsLoading(false)
        setSnackbarState({open: true, message: t("login_failed")});
    }
    return (
        <form className={`${className}`}>
            <h1 className="text-[32px] text-onBackground w-full xl:text-start text-center font-semibold">{t('login')}</h1>
            <NahrainInput type={`email`} className={`mt-12`} placeholder={"John@nahrainuniv.edu.iq"}
                          onChange={setEmail}/>
            {isEmailEmpty ?
                <h1 className={`animate-fade-up animate-once animate-duration-[400ms] text-error`}>{t("please_fill_email_input")}</h1> : null}

            <NahrainInput type={`password`} className={`mt-4`} placeholder={t("enter_password")}
                          onChange={setPassword}/>
            {isPasswordEmpty ?
                <h1 className={`animate-fade-up animate-once animate-duration-[400ms] text-error`}>{t("please_fill_password_input")}</h1> : null}

            <a href="#"
               className="flex flex-wrap underline text-[16px] mt-[16px] text-secondary">{t("forgot_password")}</a>
            <NahrainButton onClick={onClickLogin}
                           className={`mt-6`}
                           children={
                               isLoading ? <CircularProgress sx={{color: "var(--on-primary)"}}/> :
                                   <p className="text-2xl ">{t("login")}</p>
                           }
            />
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
            <p className="mt-6 text-onBackground w-fit xl:mx-0 mx-auto">{t("dont_have_an_account_signup")}&nbsp;
                <Link className="text-secondary underline" to={'/sign-up'}>
                    {t("signup")}
                </Link>
            </p>
            <ErrorSnackbar
                open={snackbarState.open}
                onClose={() => setSnackbarState({...snackbarState, open: false})}
                message={snackbarState.message}
            />
        </form>
    )
}
