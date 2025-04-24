import {useTranslation} from "react-i18next";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {getRequest} from "../../../api/postRequest";
import {AdminConfig} from "../../../api/config/AuthConfig";

export const HomeScreen = () => {
    const [t] = useTranslation("global");
    const {accessToken} = useContext(AuthContext);
    const [counts, setCounts] = useState({
        studentsCount: null,
        profsCount: null
    });

    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchCounts = () => {
        getRequest({
            path: AdminConfig.COUNT,
            onSuccess: (data) => {
                setCounts(data.payload);
            },
            onError: (err) => {
                console.error("Failed to fetch counts:", err);
            },
            token: accessToken,
        });
    };
    const formatCount = (count: number | null) => {
        return count === null ? t("loading") : count.toLocaleString();
    };
    return (
        <div className={`size-full bg-background p-6`}>
            <div className={`flex flex-col gap-2`}>
                <h1 className={`font-semibold text-[32px] text-onBackground`}>{t("dashboard")}</h1>
                <p className={` text-[20px] text-onBackgroundCaption`}>{t("dashboard_description")}</p>
            </div>
            <div className="grid md:!flex md:flex-wrap mt-12 grid-cols-[repeat(auto-fit,minmax(175px,1fr))] gap-2 ">
                <ExamCard className="max-w-[277px] cursor-pointer"/>
                <ViewAllCard
                    className="max-w-[277px] grow cursor-pointer"
                    title={t("total_students")}
                    number={formatCount(counts.studentsCount)}
                />
                <ViewAllCard
                    className="max-w-[277px] grow cursor-pointer"
                    title={t("total_profs")}
                    number={formatCount(counts.profsCount)}
                />
            </div>
        </div>
    )
}


const ExamCard = ({className}) => {
    const [t] = useTranslation("global");
    return (
        <div className={`${className} rounded-2xl bg-secondary p-4`}>
            <h2 className="hidden md:!block text-lg font-semibold text-onPrimary">{t("upcoming_exams_final")}</h2>
            <h2 className="block md:!hidden text-4xl font-semibold text-onPrimary">{t("finals")}</h2>
            <p className="mt-2 md:!text-md text-2xl text-onBackground dark">Dec 20, 2024</p>
            <p className="mt-4 hidden md:!block text-sm text-onPrimary">
                {t("upcoming_exams_final_description")}
            </p>
        </div>
    );
};


const ViewAllCard = ({className, title, number}) => {
    const [t] = useTranslation("global");

    return (
        <div
            className={`${className} max-w-[277px] rounded-2xl border border-softGray p-4 flex flex-col justify-between`}>
            <div className="flex-grow">
                <p className="text-onBackground text-xl">{title}</p>
            </div>
            <div>
                <h1 className={`text-5xl font-semibold text-onBackground mx-auto mt-2 text-center`}>{number}</h1>
            </div>
            <div className="hidden md:!block text-secondary text-sm font-semibold mt-4 cursor-pointer">
                {t("view_all")}
            </div>
        </div>
    );
};