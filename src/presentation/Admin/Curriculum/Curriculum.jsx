import {AdminCard} from "../AdminCard";
import {ReactComponent as IcBook} from 'presentation/Common/resources/images/ic_book.svg'
import {ReactComponent as IcAddCircle} from 'presentation/Common/resources/images/ic_add_circle.svg'
import {ReactComponent as IcSetting} from 'presentation/Common/resources/images/ic_settings.svg'
import {ReactComponent as IcUser} from 'presentation/Common/resources/images/ic_user.svg'
import {ReactComponent as IcLink} from 'presentation/Common/resources/images/ic_link.svg'
import {useTranslation} from "react-i18next";
import React, {useContext, useEffect, useState} from "react";
import {NahrainThemeContext} from "../../../context/NahrainThemeContext";
import {NewCurriculumDialogSidebar} from "./dialogsidebarScreens/NewCurriculumDialogSidebar";
import {SelectProfDialogSidebar} from "./dialogsidebarScreens/SelectProfDialogSidebar";
import {CurriculumInfo} from "./dialogsidebarScreens/CurriculumInfo";
import {DialogSidebarSuccessScreen} from "../users/createNewUserDialogSidebar/DialogSidebarSuccessScreen";
import {getRequest, postRequest} from "../../../api/postRequest";
import {AdminConfig} from "../../../api/config/AuthConfig";
import {AuthContext} from "../../../context/AuthContext";
import {CircularProgress} from "@mui/material";

export const Curriculum = () => {
    const [t, i18] = useTranslation("global");
    const {accessToken} = useContext(AuthContext)


    const [formData, setFormData] = useState({
        name: '',
        curriculumType: null,
        stageType: null,
        profsIds: [],
        resources: []
    });

    const [curriculums, setCurriculums] = useState({
        first_year: null,
        second_year: null,
        third_year: null,
        final_year: null,
        loading: false,
        error: null
    });

    const fetchCurriculums = () => {
        setCurriculums(prev => ({ ...prev, loading: true, error: null }));

        getRequest({
            path: AdminConfig.CURRICULUM,
            onSuccess: (data) => {
                setCurriculums({
                    first_year: data.payload.first_year,
                    second_year: data.payload.second_year,
                    third_year: data.payload.third_year,
                    final_year: data.payload.final_year,
                    loading: false,
                    error: null
                });
            },
            onError: (err) => {
                setCurriculums(prev => ({
                    ...prev,
                    loading: false,
                    error: err.message
                }));
                console.error(err);
            },
            token: accessToken
        });
    };

    useEffect(() => {
        fetchCurriculums();
    }, []);

    const {
        dialogSidebar, setDialogSidebar
    } = useContext(NahrainThemeContext)

    const dialogSidebarInitialState = {
        currentDialogSidebarScreen: 0,
    }
    const [dialogSidebarState, setDialogSidebarState] = useState(dialogSidebarInitialState);

    const handleDialogSidebarChange = (field, value) => {
        setDialogSidebarState((prev) => ({...prev, [field]: value}));
    };

    const handleFormDataChange = (newData) => {
        setFormData(prev => ({...prev, ...newData}));
    };


    const createCurriculum = (curriculumData, onSuccess) => {
        postRequest({
            path: AdminConfig.CURRICULUM,
            data: curriculumData,
            onSuccess: onSuccess,
            token: accessToken,
            onError: () => {
            },
        });
    };

    const sidebarDialogScreens = [<NewCurriculumDialogSidebar onClickNext={(type) => {
        handleFormDataChange({curriculumType: type});
        handleDialogSidebarChange("currentDialogSidebarScreen", 1);
    }}/>, <CurriculumInfo role={""} onClickNext={(data) => {
        handleFormDataChange({
            name: data.material_name,
            stageType: data.stage,
            resources: data.sources
        });
        handleDialogSidebarChange("currentDialogSidebarScreen", 2);
    }}/>, <SelectProfDialogSidebar onClickNext={(selectedProfIds) => {
        handleFormDataChange({profsIds: selectedProfIds});

        const payload = {
            name: formData.name,
            curriculumType: formData.curriculumType,
            stageType: formData.stageType,
            profsIds: selectedProfIds,
            resources: formData.resources
        };

        createCurriculum(payload, () => {
            handleDialogSidebarChange("currentDialogSidebarScreen", 3)
        })

    }}/>,
        <DialogSidebarSuccessScreen title={t("curriculum_created_successfully")}
                                    description={t("curriculum_created_successfully_description")}
                                    onDismiss={() => dialogSidebar.onDismiss()}/>]

    useEffect(() => {
        setDialogSidebar(prev => ({
            ...prev,
            onDismiss: () => {

                setDialogSidebar(prev => ({...prev, isVisible: false}))
                setDialogSidebarState(prev => ({...prev, currentDialogSidebarScreen: 0}))
            }
            ,
            child: sidebarDialogScreens[dialogSidebarState.currentDialogSidebarScreen],
            indicatorMaxScreens: sidebarDialogScreens.length,
            indicatorCurrentScreen: dialogSidebarState.currentDialogSidebarScreen
        }));
    }, [setDialogSidebar, dialogSidebarState.currentDialogSidebarScreen]);

    return (
        <div className={`bg-background p-6 h-fit `}>
            <AdminCard TitleIcon={IcBook} title={t("curriculum")} buttonTitle={t("create_new_curriculum")}
                       ButtonIcon={IcAddCircle} description={t("curriculum_description")} onButtonClick={
                () => {
                    setDialogSidebar(prev => ({
                            ...prev,
                            isVisible: !prev.isVisible,
                        })
                    );
                }
            }/>
            {curriculums.loading ? (
                <div className="flex justify-center my-8">
                    <CircularProgress />
                </div>
            ) : curriculums.error ? (
                <div className="bg-errorBackground p-4 rounded-lg text-error my-4 text-center">
                    <p>{t('error_loading_curricula')}</p>
                    <button
                        onClick={fetchCurriculums}
                        className="mt-2 bg-primary text-onPrimary px-4 py-2 rounded"
                    >
                        {t('retry')}
                    </button>
                </div>
            ) : (
                ['first_year', 'second_year', 'third_year', 'final_year'].map((year) => (
                    <div key={year} className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-onBackground">
                                {t(year)} {curriculums[year]?.size > 0 && `(${curriculums[year].size})`}
                            </h2>
                        </div>

                        {(curriculums[year]?.size || 0 > 0) ? (
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {mapCurriculumData(curriculums[year]).items.map((curriculum) => (
                                    <SettingsCard
                                        key={curriculum.id}
                                        materialType={curriculum.type}
                                        materialName={curriculum.name}
                                        profNames={curriculum.profs.map(p => p.name)}
                                        resources={curriculum.resources}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-card rounded-lg p-8 text-center">
                                <p className="text-onBackgroundCaption">
                                    {t('no_curriculum_available')}
                                </p>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}
const mapCurriculumData = (data) => {
    if (!data) return null;

    return {
        size: data.size || 0,
        items: (data.items || []).map(item => ({
            id: item.id,
            name: item.name,
            type: item.type,
            profs: item.profs || [],
            resources: item.resources || []
        }))
    };
};

const SettingsCard = ({materialType, materialName, profNames = [], resources = []}) => {
    return (
        <div className="border border-softGray rounded-lg p-2 w-[323px] min-h-[200px]">
            <div className="flex justify-between items-center">
                <IcSetting className="text-onBackground size-9"/>
                <button className="bg-secondary text-onPrimary rounded-full px-4 py-2">
                    Edit
                </button>
            </div>

            <h1 className="mt-4 text-onBackground font-semibold text-xl line-clamp-2">
                {materialName || "Untitled Material"}
            </h1>

            <div className="flex flex-col gap-1 mt-2 text-onBackgroundCaption">
                {profNames.length > 0 ? (
                    profNames.map((name, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <IcUser className="min-w-4"/>
                            <p className="truncate">{name}</p>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center gap-2 text-onBackgroundCaption/50">
                        <IcUser className="min-w-4"/>
                        <p>No professors assigned</p>
                    </div>
                )}
            </div>

            <hr className="border-[0.5px] my-3 border-strokeGray"/>

            <div className="flex flex-col gap-1">
                {resources.length > 0 ? (
                    resources.map((resource, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <IcLink className="min-w-4"/>
                            <p className="truncate capitalize">{resource}</p>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center gap-2 text-onBackgroundCaption">
                        <IcLink className="min-w-4"/>
                        <p>No resources added</p>
                    </div>
                )}
            </div>
        </div>
    );
};