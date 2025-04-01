import React, {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {AuthContext} from "../../../../context/AuthContext";
import {ContentBox} from "../../../Common/component/MainScaffold";
import {NahrainButton} from "../../../Common/component/NahrainButton";
import {
    ReactComponent as IceTheoreticalAndPractical
} from "presentation/Common/resources/images/ic_theoratical_and_practical.svg"
import {ReactComponent as IcSetting} from "presentation/Common/resources/images/ic_setting_bold.svg"
import {ReactComponent as IcBulb} from "presentation/Common/resources/images/ic_bulb_bold.svg"

export const NewCurriculumDialogSidebar = ({curriculumId,onClickNext}) => {
    const [selectedType, setSelectedType] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [t] = useTranslation("global");
    const {accessToken} = useContext(AuthContext)

    const UserType = Object.freeze({
        LAB: "LAB", THEORETICAL: "THEORETICAL", THEORETICAL_AND_LAB: "THEORETICAL_AND_LAB"
    });


    return (<div className={`max-w-[700px] flex flex-col h-full justify-between mx-auto relative`}>
        <div>
            <div>
                <h1 className={`text-onBackground text-2xl font-semibold`}>{t("choose_curriculum_type")}</h1>
                <p className={`text-onBackgroundCaption text-[16px] mt-2`}>{t("create_new_curriculum_description")}</p>
            </div>

            <div className={`flex flex-col gap-4 mt-6`}>
                <ContentBox
                    onClick={() => setSelectedType(UserType.THEORETICAL)}
                    enabled={selectedType === UserType.THEORETICAL}
                    icon={<IcBulb/>}
                    title={t("theoretical")}
                />
                <ContentBox
                    onClick={() => setSelectedType(UserType.LAB)}
                    enabled={selectedType === UserType.LAB}
                    icon={<IcSetting/>}
                    title={t("lab")}
                />

                <ContentBox
                    onClick={() => setSelectedType(UserType.THEORETICAL_AND_LAB)}
                    enabled={selectedType === UserType.THEORETICAL_AND_LAB}
                    icon={<IceTheoreticalAndPractical/>}
                    title={t("theoretical_and_lab")}
                />
            </div>
        </div>

        <div className={`sticky bg-card w-full bottom-0 py-4 mt-2 items-end`}>
            <NahrainButton onClick={onClickNext}
                className={`w-full`} isLoading={isLoading}>
                <p className="text-2xl font-semibold">{t("next_button")}</p>
            </NahrainButton>
        </div>
    </div>)
}
