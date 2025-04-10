import {ContentBox} from "../../../Common/component/MainScaffold";
import {NahrainButton} from "../../../Common/component/NahrainButton";
import React, {useCallback, useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {AdminConfig, ChangeUserType} from "../../../../api/config/AuthConfig";
import {putRequest} from "../../../../api/postRequest";
import {AuthContext} from "../../../../context/AuthContext";

export const SetStudentStage = ({role, userId, onSuccess, onFail}) => {
    const [t] = useTranslation("global");

    const [isLoading, setIsLoading] = useState(null);
    const {accessToken} = useContext(AuthContext)


    const Stage = Object.freeze({
        FRESHMAN: "FIRST", SOPHOMORE: "SECOND", JUNIOR: "THIRD", SENIOR: "FOURTH"
    });

    const [state, setState] = useState({
        stage: null
    });

    const onChangeUserType = useCallback(() => {
        setIsLoading(true);
        const requestBody = ChangeUserType({role: role, stage: state.stage});

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


    }, [role, onSuccess, onFail, accessToken, userId, state.stage]);


    const handleChange = (field, value) => {
        setState((prev) => ({...prev, [field]: value}));
    };
    return (<div className={`max-w-[700px] flex flex-col h-full justify-between mx-auto relative`}>
        <div className={`flex flex-col  gap-4 `}>
            <ContentBox
                onClick={() => handleChange("stage", Stage.FRESHMAN)}
                enabled={state.stage === Stage.FRESHMAN}
                title={t('freshman')}
            />

            <ContentBox
                onClick={() => handleChange("stage", Stage.SOPHOMORE)}
                enabled={state.stage === Stage.SOPHOMORE}
                title={t('sophomore')}
            />

            <ContentBox
                onClick={() => handleChange("stage", Stage.JUNIOR)}
                enabled={state.stage === Stage.JUNIOR}
                title={t('junior')}
            />

            <ContentBox
                onClick={() => handleChange("stage", Stage.SENIOR)}
                enabled={state.stage === Stage.SENIOR}
                title={t('senior')}
            />

        </div>

        <div className={`sticky bg-card w-full bottom-0 py-4 mt-2 items-end`}>
            <NahrainButton onClick={() => onChangeUserType()}
                           isLoading={isLoading}
                           className={`w-full`}>
                <p className="text-2xl font-semibold">{t("next_button")}</p>
            </NahrainButton>
        </div>
    </div>)
}
