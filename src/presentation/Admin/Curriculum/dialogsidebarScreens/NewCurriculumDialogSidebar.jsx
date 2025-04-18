import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {ContentBox} from "../../../Common/component/MainScaffold";
import {NahrainButton} from "../../../Common/component/NahrainButton";
import {
    ReactComponent as IcTheoreticalAndPractical
} from "presentation/Common/resources/images/ic_theoratical_and_practical.svg"
import {ReactComponent as IcSetting} from "presentation/Common/resources/images/ic_setting_bold.svg"
import {ReactComponent as IcBulb} from "presentation/Common/resources/images/ic_bulb_bold.svg"

export const NewCurriculumDialogSidebar = ({onClickNext}) => {
    const [selectedType, setSelectedType] = useState(null);
    const [isLoading] = useState(null);
    const [t] = useTranslation("global");
    const UserType = Object.freeze({
        LAB: "LAB", THEORETICAL: "THEORETICAL", THEORETICAL_AND_LAB: "THEORETICAL_AND_LAB"
    });

    const handleNext = () => {
        if (!selectedType) {
            // Show validation error
            return;
        }
        onClickNext(selectedType); // Pass the selected type
    };


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
                    icon={<IcTheoreticalAndPractical/>}
                    title={t("theoretical_and_lab")}
                />
            </div>
        </div>

        <div className={`sticky bg-card w-full bottom-0 py-4 mt-2 items-end`}>
            <NahrainButton onClick={handleNext}
                           className={`w-full`} isLoading={isLoading}>
                <p className="text-2xl font-semibold">{t("next_button")}</p>
            </NahrainButton>
        </div>
    </div>)
}
