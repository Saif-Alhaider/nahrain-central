import React from "react";
import {BaseAuthentication} from "../BaseAuthentication";
import finishSignup from "./resources/finishSignup.png"
import {useTranslation} from "react-i18next";

export const FinishSignup = () => {
    const [t] = useTranslation("global");
    return (
        <BaseAuthentication
            image={finishSignup}
            imageClassName="translate-y-44 scale-150"
            description="Professors can publish student grades on Nahrain Central, allowing students to easily view their results and track their academic progress through the platform.">
            <div className="xl:flex-grow-0 flex-grow xl:mt-0 mt-6">
                <h1 className="text-[32px] text-onBackground w-full xl:text-start text-center font-semibold">{t("finish_signup_title")}</h1>
                <p className="text-sm text-onBackgroundCaption mt-6 xl:text-start text-center">{t("finish_signup_description")}</p>
            </div>
        </BaseAuthentication>
    )
}
