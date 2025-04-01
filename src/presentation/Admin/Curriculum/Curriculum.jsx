import {AdminCard} from "../AdminCard";
import {ReactComponent as IcBook} from 'presentation/Common/resources/images/ic_book.svg'
import {ReactComponent as IcAddCircle} from 'presentation/Common/resources/images/ic_add_circle.svg'
import {useTranslation} from "react-i18next";
import React, {useContext, useEffect, useState} from "react";
import {NahrainThemeContext} from "../../../context/NahrainThemeContext";
import {NewCurriculumDialogSidebar} from "./dialogsidebarScreens/NewCurriculumDialogSidebar";
import {SelectProfDialogSidebar} from "./dialogsidebarScreens/SelectProfDialogSidebar";
import {CurriculumInfo} from "./dialogsidebarScreens/CurriculumInfo";
import {DialogSidebarSuccessScreen} from "../users/createNewUserDialogSidebar/DialogSidebarSuccessScreen";

export const Curriculum = () => {
    const [t, i18] = useTranslation("global");

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

    function updateToFinishScreen(setDialogSidebar, onDismiss) {
        setDialogSidebar(prev => ({
                ...prev,
                child: <DialogSidebarSuccessScreen onDismiss={() => onDismiss?.()}/>,
                indicatorMaxScreens: null,
                indicatorCurrentScreen: null
            })
        );
    }


    const sidebarDialogScreens = [<NewCurriculumDialogSidebar onClickNext={() => {
        handleDialogSidebarChange("currentDialogSidebarScreen", dialogSidebarState.currentDialogSidebarScreen + 1)
    }}/>, <CurriculumInfo role={""} onClickNext={() => {
        handleDialogSidebarChange("currentDialogSidebarScreen", dialogSidebarState.currentDialogSidebarScreen + 1)
    }}/>, <SelectProfDialogSidebar onClickNext={() => {
        handleDialogSidebarChange("currentDialogSidebarScreen", dialogSidebarState.currentDialogSidebarScreen + 1)
    }}/>,
        <DialogSidebarSuccessScreen title={t("new_user_created")} description={t("new_user_created_successfully")}
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

        </div>
    )
}
