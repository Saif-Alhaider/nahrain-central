import {useTranslation} from "react-i18next";
import {NahrainButton} from "../../../Common/component/NahrainButton";
import React from "react";

export const DialogSidebarSuccessScreen = ({onDismiss}) => {
    const [t] = useTranslation("global");
    return (
        <div className={`max-w-[700px] mx-auto relative flex flex-col justify-between h-full`}>
            <div className={`flex flex-col gap-2`}>
                <h1 className={`text-2xl text-onBackground font-semibold`}>{t("new_user_created")}</h1>
                <p className={`text-onBackgroundCaption text-[16px]`}>{t("new_user_created_successfully")}</p>
            </div>

            <NahrainButton onClick={() => {
                onDismiss()
            }} className={`w-full mb-4`}>
                <p className="text-2xl font-semibold">{t("close_button")}</p>
            </NahrainButton>
        </div>
    )
}
