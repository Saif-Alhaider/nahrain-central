import {AdminCard} from "../AdminCard";
import {ReactComponent as IcBook} from 'presentation/Common/resources/images/ic_book.svg'
import {ReactComponent as IcAddCircle} from 'presentation/Common/resources/images/ic_add_circle.svg'
import {ReactComponent as IcSetting} from 'presentation/Common/resources/images/ic_settings.svg'
import {ReactComponent as IcUser} from 'presentation/Common/resources/images/ic_user.svg'
import {ReactComponent as IcLink} from 'presentation/Common/resources/images/ic_link.svg'
import {ReactComponent as IcBulb} from "presentation/Common/resources/images/ic_bulb_bold.svg"
import {
    ReactComponent as IcTheoreticalAndPractical
} from "presentation/Common/resources/images/ic_theoratical_and_practical.svg"
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
import {CurriculumViewDialogSidebar} from "./dialogsidebarScreens/CurriculumViewDialogSidebar";

export const Curriculum = () => {
    const [t] = useTranslation("global");
    const {accessToken} = useContext(AuthContext);
    const {dialogSidebar, setDialogSidebar} = useContext(NahrainThemeContext);

    // Form and data states
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

    const [dialogSidebarState, setDialogSidebarState] = useState({
        currentDialogSidebarScreen: 0,
    });

    const fetchCurriculums = () => {
        setCurriculums(prev => ({...prev, loading: true, error: null}));

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

    // Create new curriculum
    const createCurriculum = (curriculumData, onSuccess) => {
        postRequest({
            path: AdminConfig.CURRICULUM,
            data: curriculumData,
            onSuccess: onSuccess,
            token: accessToken,
            onError: (err) => console.error(err),
        });
    };

    const handleDialogSidebarChange = (field, value) => {
        setDialogSidebarState(prev => ({...prev, [field]: value}));
    };

    const handleFormDataChange = (newData) => {
        setFormData(prev => ({...prev, ...newData}));
    };

    const sidebarDialogScreens = [
        <NewCurriculumDialogSidebar
            onClickNext={(type) => {
                handleFormDataChange({curriculumType: type});
                handleDialogSidebarChange("currentDialogSidebarScreen", 1);
            }}
        />,
        <CurriculumInfo
            role={""}
            onClickNext={(data) => {
                handleFormDataChange({
                    name: data.material_name,
                    stageType: data.stage,
                    resources: data.sources
                });
                handleDialogSidebarChange("currentDialogSidebarScreen", 2);
            }}
        />,
        <SelectProfDialogSidebar
            onClickNext={(selectedProfIds) => {
                handleFormDataChange({profsIds: selectedProfIds});
                const payload = {
                    name: formData.name,
                    curriculumType: formData.curriculumType,
                    stageType: formData.stageType,
                    profsIds: selectedProfIds,
                    resources: formData.resources
                };
                createCurriculum(payload, () => {
                    handleDialogSidebarChange("currentDialogSidebarScreen", 3);
                    fetchCurriculums();
                });
            }}
        />,
        <DialogSidebarSuccessScreen
            title={t("curriculum_created_successfully")}
            description={t("curriculum_created_successfully_description")}
            onDismiss={() => dialogSidebar.onDismiss()}
        />
    ];

    // Initialize dialog and fetch data
    useEffect(() => {
        setDialogSidebar(prev => ({
            ...prev,
            onDismiss: () => {
                setDialogSidebar(prev => ({...prev, isVisible: false}));
                setDialogSidebarState(prev => ({...prev, currentDialogSidebarScreen: 0}));
            },
            child: sidebarDialogScreens[dialogSidebarState.currentDialogSidebarScreen],
            indicatorMaxScreens: sidebarDialogScreens.length,
            indicatorCurrentScreen: dialogSidebarState.currentDialogSidebarScreen
        }));

        fetchCurriculums();
    }, [dialogSidebarState.currentDialogSidebarScreen]);

    const mapCurriculumData = (data) => {
        if (!data) return {size: 0, items: []};
        return {
            size: data.size || data.items?.length || 0,
            items: data.items?.map(item => ({
                id: item.id,
                name: item.name,
                type: item.type,
                profs: item.profs || [],
                resources: item.resources || []
            })) || []
        };
    };

    return (
        <div className="bg-background h-fit pb-6">
            <AdminCard
                className="px-6 pt-6"
                TitleIcon={IcBook}
                title={t("curriculum")}
                buttonTitle={t("create_new_curriculum")}
                ButtonIcon={IcAddCircle}
                description={t("curriculum_description")}
                onButtonClick={() => {
                    setDialogSidebar(prev => ({
                        ...prev,
                        isVisible: !prev.isVisible,
                        currentDialogSidebarScreen: 0,
                        child: sidebarDialogScreens[0],
                        indicatorMaxScreens: sidebarDialogScreens.length,
                        indicatorCurrentScreen: 0
                    }));
                }}
            />

            {curriculums.loading && (
                <div className="flex justify-center my-8">
                    <CircularProgress/>
                </div>
            )}

            {curriculums.error && (
                <div className="bg-errorBackground p-6 rounded-lg text-error my-4 text-center mx-6">
                    <p className="font-semibold text-xl">{t('error_loading_curricula')}</p>
                    <button
                        onClick={fetchCurriculums}
                        className="mt-4 bg-primary text-onPrimary px-4 py-2 rounded font-semibold"
                    >
                        {t('retry')}
                    </button>
                </div>
            )}

            {!curriculums.loading && !curriculums.error && (
                ['first_year', 'second_year', 'third_year', 'final_year'].map((year) => {
                    const curriculumData = mapCurriculumData(curriculums[year]);
                    return (
                        <div key={year} className="mt-8">
                            <div className="flex items-center justify-between mb-4 mx-6">
                                <h2 className="text-2xl font-bold text-onBackground">
                                    {t(year)} {curriculumData.size > 0 && `(${curriculumData.size})`}
                                </h2>
                            </div>

                            {curriculumData.size > 0 ? (
                                <div className="relative">
                                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide w-full">
                                        {curriculumData.items.map((curriculum) => (
                                            <div
                                                key={curriculum.id}
                                                className="flex-shrink-0 w-[300px] first:ms-6 ms-4 last:me-12 cursor-pointer"
                                                onClick={() => {
                                                    setDialogSidebar(prev => ({
                                                        ...prev,
                                                        isVisible: true,
                                                        child: <CurriculumViewDialogSidebar
                                                            key={curriculum.id}
                                                            id={curriculum.id}
                                                            onDismiss={() => setDialogSidebar(prev => ({
                                                                ...prev,
                                                                isVisible: false
                                                            }))
                                                            }
                                                        />,
                                                        indicatorMaxScreens: null,
                                                        indicatorCurrentScreen: null
                                                    }));
                                                }}
                                            >
                                                <SettingsCard
                                                    materialType={curriculum.type}
                                                    materialName={curriculum.name}
                                                    profNames={curriculum.profs.map(p => p.fullName)}
                                                    resources={curriculum.resources}
                                                    t={t}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-card rounded-lg p-8 text-center mx-6">
                                    <p className="text-onBackgroundCaption">
                                        {t('no_curriculum_available')}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};
const SettingsCard = ({materialType, materialName, profNames = [], resources = [], t}) => {
    const getMaterialIcon = () => {
        switch (materialType) {
            case "THEORETICAL":
                return <IcBulb className="text-onBackground size-9"/>;
            case "LAB":
                return <IcSetting className="text-onBackground size-9"/> // Assuming you have IcLab icon
            default:
                return <IcTheoreticalAndPractical className="text-onBackground size-9"/>;
        }
    }

    const renderItemsWithCount = (items, icon, capitalize = false) => {
        if (items.length === 0) {
            return (
                <div className="flex items-center gap-2 text-onBackgroundCaption/50">
                    {icon}
                    <p>{t(`no_${items === profNames ? 'professors' : 'resources'}_assigned`)}</p>
                </div>
            );
        }

        return (
            <div className="flex items-center gap-2">
                {icon}
                <div className="flex items-baseline truncate">
          <span className={`${capitalize ? 'capitalize' : ''} font-semibold text-onBackground`}>
            {items[0]}
          </span>
                    {items.length > 1 && (
                        <span
                            className="flex items-center justify-center text-onBackgroundCaption text-md ml-1">
              +{items.length - 1}
            </span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="border border-softGray rounded-lg p-2 w-[323px] min-h-[200px]">
            <div className="flex justify-between items-center">
                {getMaterialIcon()}

                <button className="bg-secondary text-onPrimary rounded-full px-4 py-2">
                    Edit
                </button>
            </div>

            <h1 className="mt-4 text-onBackground font-semibold text-xl line-clamp-2 capitalize">
                {materialName || "Untitled Material"}
            </h1>

            <div className="flex flex-col gap-1 mt-2 text-onBackgroundCaption">
                {renderItemsWithCount(profNames, <IcUser className="min-w-4"/>)}
            </div>

            <hr className="border-[0.5px] my-3 border-strokeGray"/>

            <div className="flex flex-col gap-1">
                {renderItemsWithCount(resources, <IcLink className="min-w-4"/>, true)}
            </div>
        </div>
    );


};