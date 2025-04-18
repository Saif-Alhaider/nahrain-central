import {useTranslation} from "react-i18next";
import {ReactComponent as IcUser} from 'presentation/Common/resources/images/ic_user.svg'
import {ReactComponent as IcBook} from 'presentation/Common/resources/images/ic_book.svg'
import {ReactComponent as IcLink} from 'presentation/Common/resources/images/ic_link.svg'
import {getRequest} from "../../../../api/postRequest";
import {AdminConfig} from "../../../../api/config/AuthConfig";
import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../../../context/AuthContext";
import {CircularProgress} from "@mui/material";

export const CurriculumViewDialogSidebar = ({id}) => {
    const [t] = useTranslation("global");
    const {accessToken} = useContext(AuthContext);
    const hasFetched = useRef(false);

    const [curriculumState, setCurriculumState] = useState({
        id: null,
        name: '',
        curriculumType: null,
        stageType: null,
        profs: [],
        resources: [],
        error: null,
        loading: true,
    });

    // Map stage types to display names
    const stageTypeMap = {
        FIRST: t("freshman"),
        SECOND: t("sophomore"),
        THIRD: t("junior"),
        FOURTH: t("senior"),
    };

    // Map curriculum types to display names
    const curriculumTypeMap = {
        THEORETICAL: t("theoretical"),
        LAB: t("lab"),
        THEORETICAL_AND_LAB: t("theoretical_and_lab"),
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        setCurriculumState(prev => ({...prev, loading: true, error: null}));

        getRequest({
            path: `${AdminConfig.CURRICULUM}/${id}`,
            onSuccess: (data) => {
                setCurriculumState({
                    id: data.payload.id,
                    name: data.payload.name,
                    curriculumType: data.payload.type,
                    stageType: data.payload.stageType,
                    profs: data.payload.profs,
                    resources: data.payload.resources,
                    loading: false,
                    error: null
                });
            },
            onError: (err) => {
                setCurriculumState(prev => ({
                    ...prev,
                    loading: false,
                    error: err.message
                }));
                console.error(err);
            },
            token: accessToken
        });
    }, [id, accessToken]);

    if (curriculumState.loading) {
        return (
            <div className={`flex items-center w-full h-full justify-center`}>
                <CircularProgress/>
            </div>
        );
    }

    if (curriculumState.error) {
        return (
            <div className="max-w-[700px] h-full mx-auto relative flex items-center justify-center">
                <p className="text-error">{curriculumState.error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-[700px] h-full mx-auto relative">
            <div className="flex justify-between mb-6 flex-col ">
                <h1 className="text-2xl font-bold text-onBackground">
                    {t("curriculum_details")}
                </h1>
                <hr className="border-[0.5px] my-4 border-softGray w-full unselectable"/>
            </div>

            <div className="space-y-6">
                <div className="bg-card rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <IcBook className="text-onBackground size-8"/>
                        <h2 className="text-4xl font-semibold text-onBackground capitalize">
                            {curriculumState.name}
                        </h2>
                    </div>

                    <div className="flex flex-col text-onBackgroundCaption gap-2 flex-wrap text-xl">
                        {curriculumState.stageType && (
                            <span className="px-3 py-1 rounded-full">
                                {stageTypeMap[curriculumState.stageType] || curriculumState.stageType}
                            </span>
                        )}
                        {curriculumState.curriculumType && (
                            <span className="px-3 py-1 rounded-full">
                                {curriculumTypeMap[curriculumState.curriculumType] || curriculumState.curriculumType}
                            </span>
                        )}
                    </div>
                </div>

                <div className="bg-card rounded-lg p-4">
                    <h3 className="text-2xl font-medium text-onBackground mb-3">
                        {t("professors")}
                    </h3>
                    <div className="space-y-2">
                        {(curriculumState.profs || []).length > 0 ? (
                            (curriculumState.profs || []).map((prof) => (
                                <div key={prof.id} className="flex items-center gap-3">
                                    <IcUser className="text-onBackground size-5"/>
                                    <p className="text-onBackground">{prof.fullName}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-onBackgroundCaption">
                                {t("no_professors_assigned")}
                            </p>
                        )}
                    </div>
                </div>

                <div className="bg-card rounded-lg p-4">
                    <h3 className="text-2xl font-medium text-onBackground mb-3">
                        {t("resources")}
                    </h3>
                    <div className="space-y-2">
                        {(curriculumState.resources || []).length > 0 ? (
                            (curriculumState.resources || []).map((resource, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <IcLink className="text-onBackground size-5"/>
                                    <p className="text-onBackground">{resource}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-onBackgroundCaption">
                                {t("no_resources_added")}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};