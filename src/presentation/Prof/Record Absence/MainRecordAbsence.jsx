import {useTranslation} from "react-i18next";
import {DetailedActionCard} from "../../Common/component/DetailedActionCard";
import React, {useContext, useEffect, useState} from "react";
import {MaterialDetailedCard} from "../Exams/ExamsScreen";
import {ReactComponent as IcSettings} from 'presentation/Common/resources/images/ic_settings.svg'
import {ReactComponent as IcLightbulb} from 'presentation/Common/resources/images/ic_lightbulb.svg'
import {ContentBox} from "../../Common/component/MainScaffold";
import {wait} from "@testing-library/user-event/dist/utils";
import {NahrainThemeContext} from "../../../context/NahrainThemeContext";
import {Link} from "react-router-dom";

export const MainRecordAbsence = ({ className }) => {
    const [t] = useTranslation("global");
    const { dialogSidebar, setDialogSidebar } = useContext(NahrainThemeContext);

    const [currentSidebarDialogScreen, setCurrentSidebarDialogScreen] = useState(0);

    let profMaterials = [
        {
            stage: "Freshman",
            name: "لغة عربية",
        },
        {
            stage: "Senior",
            name: "اخلاقيات المهنة",
        }
    ];

    const publishContentScreens = [
        <ChooseLectureType onClickContinue={() => setCurrentSidebarDialogScreen(currentSidebarDialogScreen + 1)} />,
        <ChooseWhichStage
            profMaterials={profMaterials}
            onNavigate={() => {
                setDialogSidebar(prev => ({ ...prev, isVisible: false }));
                wait(350).then(r => setCurrentSidebarDialogScreen(0));
            }}
        />
    ];

    useEffect(() => {
        setDialogSidebar(prev => ({
            ...prev,
            onDismiss: () => {
                setDialogSidebar(prev => ({ ...prev, isVisible: false }));
                wait(350).then(r => setCurrentSidebarDialogScreen(0));
            },
            child: publishContentScreens[currentSidebarDialogScreen],
            indicatorMaxScreens: publishContentScreens.length,
            indicatorCurrentScreen: currentSidebarDialogScreen
        }));
    }, [setDialogSidebar, currentSidebarDialogScreen]);

    return (
        <div className={`${className} w-full bg-background p-6`}>
            <DetailedActionCard
                onClick={() => {
                    setDialogSidebar(prev => ({
                        ...prev,
                        isVisible: !prev.isVisible,
                        child: publishContentScreens[currentSidebarDialogScreen],
                        indicatorMaxScreens: publishContentScreens.length,
                        indicatorCurrentScreen: currentSidebarDialogScreen
                    }));
                }}
                title={t("attendance_title")}
                description={t("attendance_description")}
                buttonTitle={t("attendance_button_text")}
            />

            <h1 className={`text-onBackground text-2xl font-semibold mt-4`}>{t("recording_history")}</h1>

            <MaterialDetailedCard
                className={`mt-4`}
                dayOfWeek="MON"
                dayOfMonth={22}
                examFormat={"Theoretical"}
                assessmentType={"Lecture"}
                startTime={"10:00"}
                endTime={"10:30"}
                material={"Communication 1"}
                stage={"Junior"}
            />
        </div>
    );
};


const ChooseLectureType = ({onClickContinue}) => {
    const [t] = useTranslation("global");
    const LectureTypes = Object.freeze({
        THEORATICAL: "THEORATICAL", PRACTICAL: "PRACTICAL",
    });

    const [selectedType, setSelectedType] = useState(null); //of type LectureTypes
    const maxWidth = "max-w-[700px]"
    return (<div className={`flex flex-col h-full justify-between`}>
        <div>
            <div className={`flex flex-col gap-4`}>
                <ContentBox className={`mx-auto ${maxWidth}`}
                            onClick={() => setSelectedType(LectureTypes.THEORATICAL)}
                            enabled={selectedType === LectureTypes.THEORATICAL}
                            icon={<IcLightbulb/>}
                            title={"محاضرة نظري"}
                />
                <ContentBox className={`mx-auto ${maxWidth}`}
                            onClick={() => setSelectedType(LectureTypes.PRACTICAL)}
                            enabled={selectedType === LectureTypes.PRACTICAL}
                            icon={<IcSettings/>}
                            title={"محاضرة مختبر"}
                />
            </div>
        </div>

        <button onClick={() => selectedType !== null ? onClickContinue() : null}
                className={`bg-primary w-full mx-auto ${maxWidth} w-full text-white h-14 rounded-lg text-[24px] mb-6`}>{t("next_button")}
        </button>
    </div>)
}

export const ChooseWhichStage = ({profMaterials, onNavigate}) => {
    const [t] = useTranslation("global");
    const maxWidth = "max-w-[700px]"
    const [selectedType, setSelectedType] = useState(null);

    return (
        <div className={`flex flex-col h-full justify-between`}>
            <div>
                {profMaterials.map((material) => {
                    return (
                        <ContentBox className={`mx-auto mt-4 ${maxWidth}`}
                                    onClick={() => setSelectedType(material.name)}
                                    enabled={selectedType === material.name}
                                    title={t(material.stage.toLocaleLowerCase())}
                                    description={material.name}
                        />
                    )
                })}
            </div>

            <Link
                to={selectedType !== null ? "/take-absence" : "#"}
                onClick={(e) => {
                    if (selectedType === null) {
                        e.preventDefault(); // Prevent navigation if null
                    } else {
                        onNavigate(); // Call function before navigating
                    }
                }}
                className={`cursor-pointer bg-primary mx-auto w-full ${maxWidth} text-white h-14 rounded-lg text-[24px] mb-6 flex items-center justify-center`}
            >
                {t("attendance_button_text")}
            </Link>

        </div>

    )

}
