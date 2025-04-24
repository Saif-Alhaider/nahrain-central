import {useTranslation} from "react-i18next";
import {ReactComponent as IcUser} from 'presentation/Common/resources/images/ic_user.svg'

import React, {useContext, useEffect, useState} from "react";
import {CurriculumViewDialogSidebar} from "../Curriculum/dialogsidebarScreens/CurriculumViewDialogSidebar";
import {NahrainThemeContext} from "../../../context/NahrainThemeContext";
import {getRequest} from "../../../api/postRequest";
import {NahrainLogger} from "../../../debug/NahrainLogger";
import {AuthContext} from "../../../context/AuthContext";
import {CircularProgress} from "@mui/material";

export const DialogSidebarUserDetails = ({id, role}) => {
    const [t] = useTranslation("global");
    const {setDialogSidebar} = useContext(NahrainThemeContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {accessToken} = useContext(AuthContext);

    useEffect(() => {
        const fetchUserData = () => {
            setLoading(true);
            getRequest({
                    path: `admin/users/${id}`,
                    token: accessToken,
                    onSuccess: (response) => {
                        setUser(response.payload);
                        setLoading(false);
                    },
                    onError: (err) => {
                        setError(err);
                        NahrainLogger.error(err);
                        setLoading(false);
                    }
                }
            );
        };

        fetchUserData();
    }, [id, accessToken]);

    const handleCurriculumClick = (curriculumId) => {
        setDialogSidebar(prev => ({
            ...prev,
            isVisible: true,
            onDismiss: () => {
                setDialogSidebar(prev => ({...prev, isVisible: false}));
                setDialogSidebar(prev => ({...prev, currentDialogSidebarScreen: 0}));
            },
            child: <CurriculumViewDialogSidebar id={curriculumId}/>,
            indicatorMaxScreens: null,
            indicatorCurrentScreen: null
        }));
    };

    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <CircularProgress/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-onBackground">
                    {t("error_loading_user")}
                </h1>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-primary text-onPrimary rounded"
                >
                    {t("retry")}
                </button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-onBackground">
                    {t("user_not_found")}
                </h1>
            </div>
        );
    }
    return (
        <div>
            <div className="flex justify-between mb-6 flex-col ">
                <h1 className="text-2xl font-bold text-onBackground">
                    {t("user_details")}
                </h1>
                <hr className="border-[0.5px] my-4 border-softGray w-full unselectable"/>
            </div>

            <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <IcUser className="text-onBackground size-8"/>
                    <h2 className="text-4xl font-semibold text-onBackground capitalize">
                        {user.fullName}
                    </h2>
                </div>
                <p className="text-onBackgroundCaption">{user.email}</p>

            </div>

            <div className="space-y-4 gap-4">

                <div className={`mt-4`}>
                    <h3 className="text-2xl font-medium text-onBackground mb-3">
                        {t("date_created")}
                    </h3>
                    <p className="text-onBackgroundCaption">
                        {new Date(user.date).toLocaleDateString()}
                    </p>
                </div>

                {role === "PROF" && (
                    <div>
                        <h3 className="text-2xl font-medium text-onBackground mb-3">
                            {t("curriculums")}
                        </h3>
                        {user.curriculums && user.curriculums.length > 0 ? (
                            <div className="space-y-2 cursor-pointer">
                                {user.curriculums.map(curriculum => (
                                    <div
                                        key={curriculum.id}
                                        className="text-secondary hover:underline"
                                        onClick={() => handleCurriculumClick(curriculum.id)}
                                    >
                                        {curriculum.name}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-onBackgroundCaption italic">
                                {t("none")}
                            </p>
                        )}
                    </div>
                )}

                {role === "STUDENT" && user.stageType && (
                    <div>
                        <h3 className="text-2xl font-medium text-onBackground mb-3">
                            {t("stage")}
                        </h3>
                        <p className="text-onBackgroundCaption">{t(user.stageType.toLowerCase())}</p>
                    </div>
                )}
            </div>
        </div>
    );
};