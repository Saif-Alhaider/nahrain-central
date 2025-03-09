import {useTranslation} from "react-i18next";
import React from "react";
import {ReactComponent as IcWidget} from "presentation/Common/resources/images/ic_widget.svg";
import {ReactComponent as IcMenuDots} from 'presentation/Common/resources/images/ic_menu_dots.svg'
import {AdminCard} from "./AdminCard";
import {ReactComponent as IcAddCircle} from 'presentation/Common/resources/images/ic_add_circle.svg'
import {ReactComponent as IcSchedule} from 'presentation/Common/resources/images/ic_calendar.svg'


export const Schedule = () => {
    const [t, i18] = useTranslation("global");

    return (
        <div className={`bg-background p-6 h-fit`}>
            <AdminCard title={t("schedule")} description={t('schedule_description')}
                       ButtonIcon={IcAddCircle} buttonTitle={t('create_new_schedule')} TitleIcon={IcSchedule}/>
            <h1 className={`text-2xl text-onBackground font-medium mt-12`}>{t("all_schedules")}</h1>

            <div className={`border border-softGray p-4 rounded-lg mt-6`}>
                <div className={`flex flex-row justify-between items-center`}>
                    <div className={`flex flex-row items-center gap-2`}>
                        <IcWidget className={`text-onBackground`}/>
                        <h1 className={`text-2xl text-onBackground font-medium `}>2023 - 2024 Second Course </h1>
                    </div>
                    <IcMenuDots className="text-onBackground cursor-pointer"/>

                </div>
                <div>
                    <div className={`flex flex-wrap gap-2 items-center mt-4 text-nowrap`}>
                        <span className={`bg-[#FAEFB4] py-1 px-3 rounded-full text-[#AC8D3F]`}>
                    Drafted
                </span>
                        <p className={`text-[16px] text-onBackgroundCaption`}>Created: Dec 5, 2024</p>
                        <p className={`text-[16px] text-onBackgroundCaption`}>Updated: Dec 8,2024</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
