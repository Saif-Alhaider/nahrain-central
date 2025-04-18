import {ReactComponent as IcUsers} from 'presentation/Common/resources/images/ic_users.svg'
import {ReactComponent as IcAddCircle} from 'presentation/Common/resources/images/ic_add_circle.svg'
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {AdminCard} from "../AdminCard";
import {NahrainThemeContext} from "../../../context/NahrainThemeContext";

import {CircularProgress} from "@mui/material";
import {getRequest} from "../../../api/postRequest";
import {AdminConfig} from "../../../api/config/AuthConfig";
import {AuthContext} from "../../../context/AuthContext";
import {DialogSidebarSelectUserType} from "./createNewUserDialogSidebar/DialogSidebarSelectUserType";
import {DialogSidebarInputUserInfo} from "./createNewUserDialogSidebar/DialogSidebarInputUserInfo";
import {DialogSidebarSuccessScreen} from "./createNewUserDialogSidebar/DialogSidebarSuccessScreen";
import {ChangePendingUserType} from "./setPendingType/ChangePendingUserType";
import {SetStudentStage} from "./setPendingType/SetStudentStage";

export const Users = () => {
    const [t, i18] = useTranslation("global");
    const {
        dialogSidebar, setDialogSidebar
    } = useContext(NahrainThemeContext)
    const hasFetched = useRef(false);
    const {accessToken} = useContext(AuthContext);

    const initialState = {
        admins: {
            data: [], loading: true, totalUsers: 0, pageSize: 1, currentPage: 1, error: null
        }, profs: {
            data: [], loading: true, totalUsers: 0, pageSize: 1, currentPage: 1, error: null
        }, students: {
            data: [], loading: true, totalUsers: 0, pageSize: 1, currentPage: 1, error: null
        },
        pendingUsers: {
            data: [], loading: true, totalUsers: 0, pageSize: 1, currentPage: 1, error: null
        },
    };

    const dialogSidebarInitialState = {
        selectedRole: null,
        currentDialogSidebarScreen: 0
    }

    const [usersData, setUsersData] = useState(initialState);
    const [dialogSidebarState, setDialogSidebarState] = useState(dialogSidebarInitialState);

    const handleDialogSidebarChange = (field, value) => {
        setDialogSidebarState((prev) => ({...prev, [field]: value}));
    };

    const sidebarDialogScreens = [<DialogSidebarSelectUserType
        onClickNext={(role) => {
            handleDialogSidebarChange("selectedRole", role)
            handleDialogSidebarChange("currentDialogSidebarScreen", dialogSidebarState.currentDialogSidebarScreen + 1)
        }
        }/>,
        <DialogSidebarInputUserInfo role={dialogSidebarState.selectedRole}
                                    onClickNext={() => handleDialogSidebarChange("currentDialogSidebarScreen", dialogSidebarState.currentDialogSidebarScreen + 1)}/>,
        <DialogSidebarSuccessScreen title={t("new_user_created")} description={t("new_user_created_successfully")}
                                    onDismiss={() => dialogSidebar.onDismiss()}/>]


    const updateUsersData = (type, data) => {
        const users = data.payload.users.map((user) => ({
            fullName: user.fullName, email: user.email, id: user.id, date: user.date,
        }));

        setUsersData((prevState) => ({
            ...prevState, [type]: {
                data: users,
                loading: false,
                totalUsers: data.payload.totalNumberOfUsers,
                pageSize: data.payload.totalPages,
                error: null,
            },
        }));
    };

    const handleFetchError = (type, error) => {
        setUsersData((prevState) => ({
            ...prevState, [type]: {
                ...prevState[type],
                loading: false,
                error: error.message || t("failed_to_load_users"),
            },
        }));
    };

    useEffect(() => {
        setDialogSidebar(prev => ({
            ...prev,
            onDismiss: () => {
                setDialogSidebar(prev => ({...prev, isVisible: false,}))
                setDialogSidebarState(prev => ({...prev, currentDialogSidebarScreen: 0}))
            },
            child: sidebarDialogScreens[dialogSidebarState.currentDialogSidebarScreen],
            indicatorMaxScreens: sidebarDialogScreens.length,
            indicatorCurrentScreen: dialogSidebarState.currentDialogSidebarScreen
        }));
    }, [setDialogSidebar, dialogSidebarState.currentDialogSidebarScreen]);


    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchUsers("admins", usersData.admins.currentPage)
        fetchUsers("profs", usersData.profs.currentPage)
        fetchUsers("students", usersData.students.currentPage)
        fetchUsers("pendingUsers", usersData.pendingUsers.currentPage)
    }, []);

    const fetchUsers = (type, pageNumber) => {
        setUsersData(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                loading: true,
                error: null
            }
        }));

        const pathMap = {
            admins: AdminConfig.GET_ALL_ADMINS,
            profs: AdminConfig.GET_ALL_PROFS,
            students: AdminConfig.GET_ALL_STUDENT,
            pendingUsers: AdminConfig.GET_ALL_PENDING_USERS
        };

        getRequest({
            path: pathMap[type],
            params: {
                pageNumber: pageNumber - 1, // api expects 0-based index
                pageSize: 4,
            },
            onSuccess: (data) => updateUsersData(type, data),
            onError: (err) => handleFetchError(type, err),
            token: accessToken,
        });
    };

    const handlePageChange = (type, pageNumber) => {
        setUsersData((prevState) => ({
            ...prevState, [type]: {
                ...prevState[type],
                currentPage: pageNumber,
            },
        }));

        fetchUsers(type, pageNumber);
    };

    const handleRetry = (type) => {
        fetchUsers(type, usersData[type].currentPage);
    };

    return (<div className={`bg-background p-6 h-fit flex-1`}>
        <AdminCard title={t("users_management")} description={t('users_screen_description')}
                   ButtonIcon={IcAddCircle} buttonTitle={t('add_new_user')} TitleIcon={IcUsers}
                   onButtonClick={() => {
                       setDialogSidebar(prev => ({
                               ...prev,
                               isVisible: !prev.isVisible,
                               currentDialogSidebarScreen: 0
                           })
                       );
                   }
                   }
        />

        <UsersSection
            title={t("admins")}
            description={t("admin_description")}
            users={usersData.admins}
            isLoading={usersData.admins.loading}
            error={usersData.admins.error}
            onPageChange={(page) => handlePageChange("admins", page)}
            onRetry={() => handleRetry("admins")}
        />
        <hr className="border-[0.5px] my-4 border-strokeGray unselectable"/>
        <UsersSection
            title={t("professors")}
            description={t("professors_description")}
            users={usersData.profs}
            isLoading={usersData.profs.loading}
            error={usersData.profs.error}
            onPageChange={(page) => handlePageChange("profs", page)}
            onRetry={() => handleRetry("profs")}
        />
        <hr className="border-[0.5px] my-4 border-strokeGray unselectable"/>

        <UsersSection
            title={t("students")}
            description={t("students_description")}
            users={usersData.students}
            isLoading={usersData.students.loading}
            error={usersData.students.error}
            onPageChange={(page) => handlePageChange("students", page)}
            onRetry={() => handleRetry("students")}
        />

        <hr className="border-[0.5px] my-4 border-strokeGray unselectable"/>

        <UsersSection
            title={t("pending_users")}
            description={t("pending_users_description")}
            users={usersData.pendingUsers}
            isLoading={usersData.pendingUsers.loading}
            error={usersData.pendingUsers.error}
            onPageChange={(page) => handlePageChange("pendingUsers", page)}
            onRetry={() => handleRetry("pendingUsers")}
            onUserClick={(userId) => {
                setDialogSidebar(prev => ({
                        ...prev,
                        isVisible: !prev.isVisible,
                        child: <ChangePendingUserType userId={userId}
                                                      onSuccess={role => {
                                                          if (role === "STUDENT") {
                                                              updateToSetStudentStage({
                                                                  title: t("new_user_created"),
                                                                  description: t("new_user_created_successfully"),
                                                                  role: role,
                                                                  userId: userId,
                                                                  setDialogSidebar: setDialogSidebar,
                                                                  dialogSidebar:dialogSidebar
                                                              })
                                                          } else {
                                                              updateToFinishScreen(
                                                                  {
                                                                      title: t("new_user_created"),
                                                                      description: t("new_user_created_successfully"),
                                                                      setDialogSidebar: setDialogSidebar,
                                                                      onDismiss: () => {
                                                                          dialogSidebar.onDismiss()
                                                                      },
                                                                  })
                                                          }
                                                      }}/>,
                        indicatorMaxScreens: null,
                        indicatorCurrentScreen: null
                    })
                );
            }}
        />
    </div>)
}
function updateToFinishScreen({title, description, setDialogSidebar, onDismiss}) {
    setDialogSidebar(prev => ({
            ...prev,
            child: <DialogSidebarSuccessScreen title={title} description={description} onDismiss={() => onDismiss?.()}/>,
            indicatorMaxScreens: null,
            indicatorCurrentScreen: null
        })
    );
}

function updateToSetStudentStage({title, description,dialogSidebar, setDialogSidebar, role, userId}) {

    setDialogSidebar(prev => ({
            ...prev,
            child: <SetStudentStage role={role} userId={userId} onSuccess={() => updateToFinishScreen(
                {
                    title: title,
                    description: description,
                    setDialogSidebar: setDialogSidebar,
                    onDismiss: () => {
                        dialogSidebar.onDismiss()
                    },
                })}/>,
            indicatorMaxScreens: null,
            indicatorCurrentScreen: null
        })
    );
}


export const UsersTable = ({users, onUserClick, className}) => {
    const {currentLanguage} = useContext(NahrainThemeContext)

    const [t, i18] = useTranslation("global");

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const divRef = useRef(null);

    const updateWidth = useCallback(() => {
        setScreenWidth(window.innerWidth)
    }, []);

    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [updateWidth]);

    let isWrapped = screenWidth > 640 // 640 as in sm in tailwind
    const borderForBodies = `border-0 ${isWrapped ? 'border-b border-card' : ''}`;
    const thBg = `${isWrapped ? 'bg-card' : 'bg-none'}`;

    return (<table
        className={`${className} w-full flex flex-row bg-background overflow-hidden text-onBackground rounded-t-lg ${isWrapped ? 'inline-table' : ''} ${isWrapped ? 'text-center' : 'text-start'}`}
        ref={divRef}>
        <thead>
        {users?.map((data, index) => (<tr
            className={`flex flex-col ${isWrapped ? 'table-row mb-0' : ''} ${index === 0 ? (isWrapped ? 'flex' : '') : (isWrapped ? 'hidden' : '')} ${thBg}`}
            key={index}
        >
            <th className={`py-3 px-4 rounded-none ${isWrapped ? 'text-center' : 'text-start'} text-nowrap`}>
                {t("name")}
            </th>
            <th className={`py-3 px-4 ${isWrapped ? 'text-center' : 'text-start'} text-nowrap`}>
                {t("date_created")}
            </th>
            <th className={`py-3 px-4 ${isWrapped ? 'text-center' : 'text-start border-b border-card'} text-nowrap`}>
                {t("email")}
            </th>
        </tr>))}
        </thead>
        <tbody className={`flex-1`}>
        {users?.map((data, index) => (<tr
            className={`flex flex-col w-full ${isWrapped ? 'table-row mb-0' : ''}`}
            key={index}
        >
            <td className={`${borderForBodies} py-3 px-4 truncate`}>
                <p className={`text-secondary cursor-pointer`}
                   onClick={() => onUserClick(data?.id)}>{data?.fullName}</p>
            </td>
            <td className={`${borderForBodies} py-3 px-4 truncate`}>
                {formatDate(data?.date, currentLanguage)}
            </td>
            <td className={`border-b border-card py-3 px-4 truncate`}>
                {data?.email}
            </td>
        </tr>))}
        </tbody>
    </table>);
};


export const UsersSection = ({title, description, users, isLoading, error, onPageChange, onUserClick, onRetry}) => {
    const usersPerPage = 4
    const totalPages = Math.ceil(users.totalUsers / usersPerPage);
    const [t] = useTranslation("global");

    return (
        <div className={`flex flex-wrap justify-between gap-4`}>
            <div className={`md:flex-1 min-w-[340px]`}>
                <h1 className={`text-xl text-onBackground font-medium`}>{title}</h1>
                <p className={`text-[16px] text-onBackgroundCaption mt-2`}>{description}</p>
            </div>

            {error ? (
                <div className={`flex flex-col items-center justify-center gap-4 flex-1 py-8`}>
                    <div className="text-center">
                        <p className="text-onBackground text-lg font-medium">{t("something_went_wrong")}</p>
                    </div>
                    <button
                        onClick={onRetry}
                        className={`rounded bg-primary px-4 py-2 text-onPrimary hover:bg-primaryDark transition-colors font-semibold`}
                    >
                        {t("retry")}
                    </button>
                </div>
            ) : isLoading ? (
                <LoadingTable/>
            ) : users.data.length === 0 ? (
                <EmptyData/>
            ) : (
                <div className={`flex flex-col ltr:items-end rtl:items-start gap-3 flex-1`}>
                    <div className="mt-4 border border-onBackgroundCaption rounded-t-lg w-full">
                        <h1 className="text-onBackground bg-card h-12 ps-4 flex items-center visible sm:hidden rounded-t-lg">{title}</h1>
                        <UsersTable
                            users={users.data}
                            className="rounded-t-lg md:min-w-[600px]"
                            onUserClick={(userId) => onUserClick?.(userId)}
                        />
                    </div>

                    <div className={`flex flex-row gap-2`}>
                        {Array.from({length: totalPages}, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => onPageChange(index + 1)}
                                disabled={users.currentPage === index + 1}
                                style={{fontWeight: users.currentPage === index + 1 ? "bold" : "normal"}}
                                className={`rounded border border-softGray px-3 size-fit py-2 text-onBackground`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}


const LoadingTable = () => {
    return (<div className="flex-1 flex justify-center items-center">
        <CircularProgress className={`w-full`} sx={{color: "rgba(var(--on-background))"}}/>
    </div>)
}

const EmptyData = () => {
    const [t] = useTranslation("global");
    return (<div
        className={`flex-1 bg-card border border-onBackgroundCaption rounded-t-lg flex items-center justify-center p-4 md:min-w-[600px]`}>
        <h1 className={`text-onBackground text-2xl text-center font-semibold`}>{t("no_current_data")}</h1>
    </div>)
}

function formatDate(dateString, locale = "en") {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Unknown";
        }
        return date.toLocaleDateString(locale, {
            month: "short", day: "numeric", year: "numeric",
        });
    } catch (error) {
        return "Unknown";
    }
}