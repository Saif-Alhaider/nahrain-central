import {useTranslation} from "react-i18next";
import {BaseAuthentication} from "./Authentication/BaseAuthentication";
import finishSignup from "./Authentication/Finish Signup/resources/finishSignup.png";
import React, {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";

export const PendingApprovalScreen = () => {
    const [t] = useTranslation("global");
    const {setAccessToken, } = useContext(AuthContext);


    return <BaseAuthentication
        image={finishSignup} imageClassName="translate-y-44 scale-150"
        description={t("professors_can_publish_student_grades")}
    >
        <h1 className={`text-[32px] text-onBackground w-full xl:text-start text-center font-semibold`}>{t("account_created_successfully")}</h1>
        <p className={`text-lg text-onBackgroundCaption mt-4`}>{t("account_created_successfully_description")}</p>
        <button onClick={()=> setAccessToken(null)} className={`bg-background w-fit py-2 px-4 mt-4 text-onBackground rounded text-xl font-bold`}>{t("logout")}</button>
    </BaseAuthentication>
}
