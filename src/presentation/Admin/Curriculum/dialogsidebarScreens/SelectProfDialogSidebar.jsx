import React, {useContext, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {AuthContext} from "../../../../context/AuthContext";
import {NahrainButton} from "../../../Common/component/NahrainButton";
import {AdminConfig} from "../../../../api/config/AuthConfig";
import {getRequest} from "../../../../api/postRequest";
import {NahrainLogger} from "../../../../debug/NahrainLogger";
import {CircularProgress} from "@mui/material";

export const SelectProfDialogSidebar = ({onClickNext}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [t] = useTranslation("global");
    const {accessToken} = useContext(AuthContext);

    const initialState = {
        profs: {
            data: [],
            loading: true,
            totalUsers: 0,
            pageSize: 1,
            currentPage: 1,
        },
        selectedIds: [],
        searchQuery: ""
    };

    const [usersData, setUsersData] = useState(initialState);
    const hasFetched = useRef(false);

    const fetchUsers = (pageNumber) => {


        getRequest({
            path: AdminConfig.GET_ALL_PROFS,
            params: {
                pageNumber: pageNumber - 1,
                pageSize: 20,
            },
            onSuccess: (data) => updateUsersData(data),
            onError: (err) => NahrainLogger.log(err),
            token: accessToken,
        });
        setIsLoading(false);
    };

    const updateUsersData = (data) => {
        const users = data.payload.users.map((user) => ({
            fullName: user.fullName,
            email: user.email,
            id: user.id,
            date: user.date,
        }));

        setUsersData((prevState) => ({
            ...prevState,
            "profs": {
                data: users,
                loading: false,
                totalUsers: data.payload.totalNumberOfUsers,
                pageSize: data.payload.totalPages,
                isSelected: false
            },
        }));
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        setIsLoading(true);
        fetchUsers(usersData.profs.currentPage);
    }, []);

    const updateUserSelection = (id, isSelected) => {
        setUsersData((prevState) => {
            const updatedProfs = prevState.profs.data.map((prof) =>
                prof.id === id ? {...prof, isSelected} : prof
            );

            const updatedSelectedIds = isSelected
                ? [...prevState.selectedIds, id]
                : prevState.selectedIds.filter(selectedId => selectedId !== id);

            return {
                ...prevState,
                profs: {
                    ...prevState.profs,
                    data: updatedProfs,
                },
                selectedIds: updatedSelectedIds,
            };
        });
    };

    const handleNext = () => {
        onClickNext(usersData.selectedIds);
    };

    const handleSkip = () => {
        onClickNext([]);
    };

    return (
        <div className={`max-w-[700px] flex flex-col h-full justify-between mx-auto relative`}>
            <div>
                <div className={`mb-4`}>
                    <h1 className={`text-onBackground text-2xl font-semibold`}>
                        {t("select_professors_for_curriculum")}
                    </h1>
                    <p className={`text-onBackgroundCaption text-[16px] mt-2`}>
                        {t("select_professors_for_curriculum_description")}
                    </p>
                </div>
                {isLoading ? (
                    <CircularProgress sx={{color: "rgba(var(--on-primary))"}}/>
                ) : usersData.profs.data.length > 0 ? (
                    usersData.profs.data.map((prof) => (
                        <ProfSelectableCard
                            key={prof.id}
                            name={prof.fullName}
                            selected={usersData.selectedIds.includes(prof.id)}
                            onClick={() => updateUserSelection(prof.id, !usersData.selectedIds.includes(prof.id))}
                        />
                    ))
                ) : (
                    <h1 className={`text-onBackground font-semibold border p-2 rounded-lg border-softGray`}>
                        {t("no_professors_available")}
                    </h1>
                )}
            </div>

            <div className={`sticky bg-card w-full bottom-0 py-4 mt-2 items-end`}>
                <NahrainButton
                    onClick={handleNext}
                    className={`w-full`}
                    isLoading={isLoading}
                    disabled={isLoading}
                >
                    <p className="text-2xl font-semibold">{t("next_button")}</p>
                </NahrainButton>
                <button
                    onClick={handleSkip}
                    className="border-2 border-strokeGray text-onBackground flex-grow w-full h-14 rounded-lg text-[24px] mt-4"
                >
                    {t("skip")}
                </button>
            </div>
        </div>
    );
};


export const ProfSelectableCard = ({className, name, selected, onClick}) => {
    return (
        <div onClick={() => onClick()}
             className={`${className} cursor-pointer flex flex-row gap-2 select-none items-center justify-between border-2 ${selected ? "border-primary" : "border-softGray"} mt-2 p-3 rounded-xl shadow-sm w-full`}>
            <div className="flex flex-row items-center gap-3 py-2">
                <ProfSelectionCheckbox selected={selected}/>
                <h2 className="font-bold text-xl text-onBackground rtl:text-right">
                    {name}
                </h2>

            </div>
        </div>
    );
};

const ProfSelectionCheckbox = ({selected}) => {
    return (
        <div
            className={`w-6 h-6 flex items-center justify-center border-2 rounded-md cursor-pointer transition 
                ${selected ? "bg-primary border-primary" : "border-gray-400"}`}
        >
            {selected && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                </svg>
            )}
        </div>
    );
};