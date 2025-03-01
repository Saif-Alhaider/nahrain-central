import {BaseAuthentication} from "../BaseAuthentication";
import TotpImage from "./resources/img_totp.png"
import React, {useCallback, useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import TotpSection from "../Scan TOTP/TotpSection";
import {AuthConfig, TotpRequest} from "../../../../../api/config/AuthConfig";
import {postRequest} from "../../../../../api/postRequest";
import {NahrainLogger} from "../../../../../debug/NahrainLogger";
import {AuthContext} from "../../../../../context/AuthContext";
import {CircularProgress} from "@mui/material";
import {NahrainButton} from "../../../component/NahrainButton";
import {ErrorSnackbar} from "../../../component/ErrorSnackbar";
import {useLocation, useNavigate} from "react-router-dom";

export const TotpScreen = () => {
    const [t, i18] = useTranslation("global");
    const [totpCode, setTotpCode] = useState(null);
    const {setAccessToken} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState({open: false, message: ''});
    const navigate = useNavigate();
    const location = useLocation();
    const {token} = location.state || {};


    const onClickSubmitTotp = useCallback(async () => {
        if (!totpCode || totpCode.length !== 6) {
            setSnackbarState({open: true, message: t("please_fill_totp")});
            return;
        }

        setIsLoading(true);
        const requestBody = TotpRequest(totpCode);

        if (token !== null) {
            await postRequest(AuthConfig.VERIFY_TOTP, requestBody, onNavigateHome, onTotpFail, token);
        } else {
            onTotpFail();
        }

        setIsLoading(false);
    }, [totpCode]);

    const onTotpFail = (error) => {
        setSnackbarState({open: true, message: t("totp_failed")});
        NahrainLogger.error(error);
    };

    const onNavigateHome = () => {
        setAccessToken(token)
        navigate("/");
    }

    return (
        <BaseAuthentication image={TotpImage} imageClassName="translate-y-1/4"
                            description={t('professors_can_publish_student_grades')}>
            <h1 className="text-[32px] text-onBackground w-full xl:text-start text-center font-semibold">{t('enter_verification_code')}</h1>
            <p className="text-onBackground text-sm xl:text-start text-center">{t('enter_the_6_digit_security_code_from_your_authenticator_app')}</p>

            <TotpSection className="xl:mt-6 mt-12 h-16 xl:gap-8 gap-4 mb-14"
                         onValueChange={code => setTotpCode(code)}/>

            <NahrainButton onClick={onClickSubmitTotp} className={`xl:mt-0 mt-auto `}>
                {isLoading ? <CircularProgress sx={{color: "var(--on-primary)"}}/> :
                    <p className="text-2xl ">{t("continue")}</p>}
            </NahrainButton>
            <ErrorSnackbar
                open={snackbarState.open}
                onClose={() => setSnackbarState({...snackbarState, open: false})}
                message={snackbarState.message}
            />
        </BaseAuthentication>
    )
}
