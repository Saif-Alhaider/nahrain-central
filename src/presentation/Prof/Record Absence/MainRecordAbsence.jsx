import {useTranslation} from "react-i18next";
import {DetailedActionCard} from "../../Common/component/DetailedActionCard";
import React from "react";
import {MaterialDetailedCard} from "../Exams/ExamsScreen";

export const MainRecordAbsence = ({className}) => {
    const [t] = useTranslation("global");
    return (<div className={`${className} w-full bg-background p-6`}>
        <DetailedActionCard title={t("attendance_title")}
                            description={t("attendance_description")}
                            buttonTitle={t("attendance_button_text")}
        />

        <MaterialDetailedCard className={`mt-4`} dayOfWeek="MON" dayOfMonth={22}
                              examFormat={"Theoretical"} assessmentType={"Lecture"} startTime={"10:00"} endTime={"10:30"}
                              material={"Communication 1"} stage={"Junior"}/>
    </div>)
}
