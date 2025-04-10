import {ReactComponent as Iclock} from "presentation/Prof/Exams/resources/ic_clock.svg";
import {ReactComponent as IcLink} from "presentation/Common/resources/images/ic_link.svg";
import {ReactComponent as IcUsers} from "presentation/Common/screens/Announcement/resources/ic_users.svg";
import {ReactComponent as IcNoteBook} from "presentation/Prof/Exams/resources/ic_notebook.svg";
import React from "react";
import {TableReact} from "../../../Prof/Grades/GradesScreen";
import {useTranslation} from "react-i18next";


export const AnnouncementScreen = () => {
    const [t, i18] = useTranslation("global");
    return (
        <div className={`bg-background p-6 text-onBackground`}>
            <div className={`flex flex-col gap-4 `}>
                <h1 className={`text-2xl font-semibold`}>Nyquist Theorem and QAM Analysis</h1>
                <p className={`text-lg`}>{t("quiz")} 1</p>
            </div>
            <hr className="h-[1px] mt-8 border-t-0 bg-softGray rounded-2xl"/>
            <div className={`flex flex-col md:flex-row gap-6 my-6 w-full`}>
                <p className={`flex-grow w-full`}>
                    Hello, dear ones,<br/>
                    <br/>
                    A reminder:<br/>
                    Sunday, 1/12/2024, is the date for the second midterm exam.<br/>
                    It will take place during the lecture time.<br/>
                    <br/>
                    The topics included in the exam are:<br/>
                    <br/>
                    1. FFT and IFFT<br/>
                    2. Convolution and Deconvolution<br/>
                    3. Circular Convolution<br/>
                    <br/>
                    Best regards to you all, and good luck!
                </p>
                <div
                    className="md:self-stretch md:w-[2px] md:border-none border-t-1 border border-softGray w-full bg-softGray rounded-2xl flex-grow"/>
                <div className={`flex-grow w-full flex flex-col gap-4`}>
                    <AnnouncementLinks title={t("students_scheduled_for_the_exam")}/>
                    <AnnouncementDateAndTime title={t("date_and_time")}/>
                    <AnnouncementSubject title={t("subject")}/>
                    <AnnouncementStage title={t("stage")}/>
                </div>
            </div>
            <hr className="h-[1px] mt-8 border-t-0 bg-softGray rounded-2xl"/>
            <div className="mt-6 border border-onBackgroundCaption rounded-t-lg">
                <h1 className="text-onBackground bg-card h-12 ps-4 flex items-center visible sm:hidden rounded-t-lg">{t("students_scheduled_for_the_exam")}</h1>
                <TableReact className="rounded-t-lg"/>
            </div>
        </div>
    )
}

const AnnouncementLinks = ({title}) => {
    return (
        <AnnouncementInfoTemplate title={title} icon={<IcLink/>}>
            <div className={`text-secondary flex flex-col gap-2 max-w-[300px]`}>
                <a href="#"
                   className={`line-clamp-1 cursor-pointer`}>https://drive.google.com/file/d/1yqAq8ZLww4RLSdf8NcYvRxeUbkK4gYm4/view?usp=sharing</a>
                <a href="#" className={`line-clamp-1 cursor-pointer`}>https://t.me/somechannelname/123</a>
            </div>
        </AnnouncementInfoTemplate>

    )
}

const AnnouncementDateAndTime = ({title}) => {
    return (
        <AnnouncementInfoTemplate title={title} icon={<Iclock/>}>
            <h3 className={`text-onBackgroundCaption font-medium text-lg`}>2024-12-01, Mon, 10:00 - 11:30</h3>
        </AnnouncementInfoTemplate>

    )
}

const AnnouncementSubject = ({title}) => {
    return (
        <AnnouncementInfoTemplate title={title} icon={<IcNoteBook/>}>
            <h3 className={`text-onBackgroundCaption font-medium text-lg line-clamp-2 max-w-[300px]`}>Network
                Communications and
                Protocols</h3>
        </AnnouncementInfoTemplate>

    )
}

const AnnouncementStage = ({title}) => {
    return (
        <AnnouncementInfoTemplate title={title} icon={<IcUsers/>}>
            <h3 className={`text-onBackgroundCaption font-medium text-lg line-clamp-2 max-w-[300px]`}>Sophomore
                Students</h3>
        </AnnouncementInfoTemplate>
    )
}

const AnnouncementInfoTemplate = ({title, icon, children}) => {
    return (
        <div className={`flex flex-col gap-2`}>
            <div className={`flex flex-row gap-2`}>
                {icon}
                <h3 className={`font-semibold`}>{title}</h3>
            </div>
            {children}
        </div>
    )
}


