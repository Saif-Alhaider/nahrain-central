import React, {useCallback, useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {ReactComponent as IcAdmin} from "presentation/Common/resources/images/ic_admin.svg"
import {ReactComponent as IcProf} from "presentation/Common/resources/images/ic_prof.svg"
import {ReactComponent as IcStudent} from "presentation/Common/resources/images/ic_student.svg"
import {ContentBox} from "../../../Common/component/MainScaffold";
import {NahrainButton} from "../../../Common/component/NahrainButton";
import {AdminConfig, ChangeUserType} from "../../../../api/config/AuthConfig";
import {putRequest} from "../../../../api/postRequest";
import {AuthContext} from "../../../../context/AuthContext";

export const ChangePendingUserType = ({userId, onSuccess, onFail}) => {
    const [selectedType, setSelectedType] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [t] = useTranslation("global");
    const {accessToken} = useContext(AuthContext)

    const UserType = Object.freeze({
        ADMIN: "ADMIN", PROF: "PROF", STUDENT: "STUDENT"
    });

    const onChangeUserType = useCallback(() => {
        setIsLoading(true);
        const requestBody = ChangeUserType({role: selectedType});

        if (selectedType === UserType.STUDENT) {
            onSuccess(selectedType)
        } else {
            putRequest({
                path: AdminConfig.PENDING_USER + userId,
                data: requestBody,
                onSuccess: () => {
                    onSuccess();
                    setIsLoading(false);
                },
                onError: onFail,
                token: accessToken
            });
        }


    }, [accessToken, selectedType, onSuccess, onFail, userId, UserType.STUDENT]);


    return (<div className={`max-w-[700px] flex flex-col h-full justify-between mx-auto relative`}>
        <div>
            <div>
                <h1 className={`text-onBackground text-2xl font-semibold`}>{t("change_user_role")}</h1>
                <p className={`text-onBackgroundCaption text-[16px] mt-2`}>{t("change_user_role_description")}</p>
            </div>

            <div className={`flex flex-col gap-4 mt-6`}>
                <ContentBox
                    onClick={() => setSelectedType(UserType.ADMIN)}
                    enabled={selectedType === UserType.ADMIN}
                    icon={<IcAdmin/>}
                    title={t("admin")}
                    description={t("select_admin_description")}
                />

                <ContentBox
                    onClick={() => setSelectedType(UserType.PROF)}
                    enabled={selectedType === UserType.PROF}
                    icon={<IcProf/>}
                    title={t("prof")}
                    description={t("select_prof_description")}
                />
                <ContentBox
                    onClick={() => setSelectedType(UserType.STUDENT)}
                    enabled={selectedType === UserType.STUDENT}
                    icon={<IcStudent/>}
                    title={t("student")}
                    description={t("select_student_description")}
                />
            </div>
        </div>

        <div className={`sticky bg-card w-full bottom-0 py-4 mt-2 items-end`}>
            <NahrainButton onClick={() => selectedType && onChangeUserType()}
                           className={`w-full`} isLoading={isLoading}>
                <p className="text-2xl font-semibold">{t("next_button")}</p>
            </NahrainButton>
        </div>
    </div>)
}
