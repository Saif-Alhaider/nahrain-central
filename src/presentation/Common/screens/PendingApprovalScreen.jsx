import {useTranslation} from "react-i18next";
import {BaseAuthentication} from "./Authentication/BaseAuthentication";
import finishSignup from "./Authentication/Finish Signup/resources/finishSignup.png";
import React, {useContext, useEffect, useRef} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {postRequest} from "../../../api/postRequest";
import {AuthConfig} from "../../../api/config/AuthConfig";
import {NahrainLogger} from "../../../debug/NahrainLogger";

export const PendingApprovalScreen = () => {
    const [t] = useTranslation("global");
    const {refreshToken, setAccessToken, setRefreshToken, setNahrainEmail, setFullName} = useContext(AuthContext);

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        postRequest({
            path: AuthConfig.REFRESH_TOKEN,
            data: {refreshToken: refreshToken},
            onSuccess: (data) => {
                setAccessToken(data.payload.token);
                setNahrainEmail(data.payload.user.email);
                setFullName(data.payload.user.fullName);
            },
            onError: (error) => NahrainLogger.error("Failed to fetch refresh token: " + error),
        });
    }, []);


    return <BaseAuthentication
        image={finishSignup} imageClassName="translate-y-44 scale-150"
        description={t("professors_can_publish_student_grades")}
    >
        <h1 className={`text-[32px] text-onBackground w-full xl:text-start text-center font-semibold`}>{t("account_created_successfully")}</h1>
        <p className={`text-lg text-onBackgroundCaption mt-4`}>{t("account_created_successfully_description")}</p>
        <button onClick={() => {
            setAccessToken(null)
            setRefreshToken(null)
        }}
                className={`bg-background w-fit py-2 px-4 mt-4 text-onBackground rounded text-xl font-bold`}>{t("logout")}</button>
    </BaseAuthentication>
}
