import {ContentBox} from "../../Common/component/MainScaffold";
import {ReactComponent as IcAdmin} from "presentation/Common/resources/images/ic_admin.svg"
import {ReactComponent as IcProf} from "presentation/Common/resources/images/ic_prof.svg"
import {ReactComponent as IcStudent} from "presentation/Common/resources/images/ic_student.svg"
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {NahrainButton} from "../../Common/component/NahrainButton";

export const DialogSidebarSelectUserType = ({onClickNext}) => {
    const [selectedType, setSelectedType] = useState(null);
    const [t] = useTranslation("global");

    const UserType = Object.freeze({
        ADMIN: "ADMIN", PROF: "PROF", STUDENT: "STUDENT"
    });

    return (
        <div className={`max-w-[700px] flex flex-col h-full justify-between mx-auto relative`}>
            <div className={`mt-6 flex flex-col gap-4`}>
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
            <div className={`sticky bg-card w-full bottom-0 py-4 mt-2 items-end`}>
                <NahrainButton onClick={() => selectedType && onClickNext(selectedType)}
                               className={`w-full`}>
                    <p className="text-2xl font-semibold">{t("next_button")}</p>
                </NahrainButton>
            </div>
        </div>)
}
