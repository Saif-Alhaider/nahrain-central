import {BaseAuthentication} from "../BaseAuthentication";
import finishSignup from "../Finish Signup/resources/finishSignup.png";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {getImageRequest, postRequest} from "../../../../../api/postRequest";
import {AuthConfig, TotpRequest} from "../../../../../api/config/AuthConfig";
import {AuthContext} from "../../../../../context/AuthContext";
import TotpSection from "./TotpSection";
import {CircularProgress} from "@mui/material";
import {NahrainButton} from "../../../component/NahrainButton";
import {NahrainLogger} from "../../../../../debug/NahrainLogger";
import {useNavigate} from "react-router-dom";
import {ErrorSnackbar} from "../../../component/ErrorSnackbar";


export const ScanTotpScreen = () => {
    const [t] = useTranslation("global");
    const [qrCode, setQrCode] = useState(null);
    const [totpCode, setTotpCode] = useState(null);
    const {accessToken} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState({open: false, message: ''});
    const navigate = useNavigate();

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        getImageRequest(
            AuthConfig.TOTP_IMAGE,
            (imageUrl) => setQrCode(imageUrl),
            (error) => NahrainLogger.error("Failed to fetch TOTP image:", error),
            accessToken
        );
    }, []);

    const onClickSubmitTotp = useCallback(async () => {
        if (!totpCode || totpCode.length !== 6) {
            setSnackbarState({open: true, message: t("please_fill_totp")});
            return;
        }

        setIsLoading(true);
        const requestBody = TotpRequest(totpCode);

        await postRequest({
            path: AuthConfig.VERIFY_TOTP,
            data: requestBody,
            onSuccess: onNavigateHome,
            onError: onSignupFail,
            token: accessToken
        });
        setIsLoading(false);
    }, [accessToken, t]);

    const onSignupFail = (error) => {
        setSnackbarState({open: true, message: t("totp_failed")});
        NahrainLogger.error(error);
    };

    const onNavigateHome = () => {
        navigate("/");
    }

    return (
        <BaseAuthentication
            image={finishSignup}
            imageClassName="translate-y-44 scale-150"
            description={t("professors_can_publish_student_grades")}
        >
            <h1 className="xl:text-[32px] lg:text-[32px] text-[24px] text-onBackground xl:text-start text-center font-semibold">
                {t("configure_authenticator_app")}
            </h1>
            <div className="h-auto my-6">
                {qrCode ? (
                    <img src={qrCode} alt="TOTP QR Code" className="w-40 mx-auto"/>
                ) : (
                    <p className="text-center text-onBackgroundCaption">Loading QR Code...</p>
                )}
            </div>
            <p className="text-sm text-onBackgroundCaption xl:text-start text-center">
                {t("enter_verification_code_displayed_in_google_authenticator")}
            </p>
            <h1 className="text-[24px] text-onBackground text-start mt-4 font-semibold">
                {t("enter_verification_code")}
            </h1>
            <TotpSection className="xl:my-6 mt-2 mb-4 h-16 w-full xl:gap-8 gap-4"
                         onValueChange={code => setTotpCode(code)}
            />

            <NahrainButton onClick={onClickSubmitTotp}>
                {isLoading ? <CircularProgress sx={{color: "var(--on-primary)"}}/> :
                    <p className="text-2xl ">{t("continue")}</p>}
            </NahrainButton>

            <button
                className="border-2 border-strokeGray text-onBackground flex-grow w-full max-h-14 rounded-lg text-[24px] mt-4"
                onClick={onNavigateHome}>
                {t("skip")}
            </button>

            <ErrorSnackbar
                open={snackbarState.open}
                onClose={() => setSnackbarState({...snackbarState, open: false})}
                message={snackbarState.message}
            />
        </BaseAuthentication>
    );
};


