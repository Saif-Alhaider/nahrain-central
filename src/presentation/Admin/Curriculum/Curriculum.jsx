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
import {postRequest} from "../../../api/postRequest";
import {AdminConfig} from "../../../api/config/AuthConfig";
import {AuthContext} from "../../../context/AuthContext";

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
            path: AdminConfig.CREATE_NEW_CURRICULUM,
            data: curriculumData,
            onSuccess: onSuccess,
            token:accessToken,
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
            <SettingsCard/>
        </div>
    )
}


const SettingsCard = ({materialType, materialName,}) => {
    return (
        <div className="border border-softGray rounded-lg p-2 w-[323px]">
            <div className={`flex justify-between items-center`}>
                <IcSetting className={`text-onBackground size-9`}/>
                <button className={`bg-secondary text-onPrimary rounded-full px-4 py-2`}>Edit</button>
            </div>

            <h1 className={`mt-8 text-onBackground font-semibold text-xl`}>Digital Logic</h1>

            <div className={`flex gap-2 mt-2 text-onBackgroundCaption`}>
                <IcUser/>
                <p>د. كريم مظلوم</p>
            </div>

            <hr className="border-[0.5px] my-4 border-strokeGray unselectable"/>

            <div className={`flex gap-2 text-onBackgroundCaption mb-2`}>
                <IcLink/>
                <p className={`capitalize`}>Headway Junior</p>
            </div>
        </div>
    );
}