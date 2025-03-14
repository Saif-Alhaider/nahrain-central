import {ReactComponent as IcUsers} from 'presentation/Common/resources/images/ic_users.svg'
import {ReactComponent as IcAddCircle} from 'presentation/Common/resources/images/ic_add_circle.svg'
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {AdminCard} from "./AdminCard";
import {NahrainThemeContext} from "../../context/NahrainThemeContext";
import {ProgressBar} from "../Common/component/ProgressBar";
import {NahrainInput} from "../Common/component/NahrainInput";
import {ReactComponent as IcTextSquare} from "presentation/Common/resources/images/ic_text_square.svg";
import {ReactComponent as IcCalendar} from "presentation/Common/resources/images/ic_calendar.svg";
import {ReactComponent as IcEmail} from "presentation/Common/resources/images/ic_email.svg";
import {ReactComponent as IcPhone} from "presentation/Common/resources/images/ic_phone.svg";
import {DropDown} from "../Common/component/DropDown";
import {CircularProgress, MenuItem} from "@mui/material";
import {NahrainButton} from "../Common/component/NahrainButton";

const products = [
    {
        "name": "أحمد علي",
        "date_created": "Feb 22,2025",
        "email": "ahmed.kareem@nahrainuniv.edu.iq"

    },
    {
        "name": "فاطمة الزهراء",
        "date_created": "Mar 01,2025",
        "email": "sara.tamimi@nahrainuniv.edu.iq"
    },
    {
        "name": "محمود سعيد",
        "date_created": "Mar 12,2025",
        "email": "mustafa.jassim@nahrainuniv.edu.iq"
    },
    {
        "name": "سارة محمد",
        "date_created": "Mar 22,2025",
        "email": "layla.hussein@nahrainuniv.edu.iq"
    },
    {
        "name": "يوسف إبراهيم",
        "date_created": "Apr 01,2025",
        "email": "omar.mahmoud@nahrainuniv.edu.iq"
    },
    {
        "name": "علي حسن",
        "date_created": "Apr 02,2025",
        "email": "hanaa.saleh@nahrainuniv.edu.iq"
    },
]
export const Users = () => {
    const [t, i18] = useTranslation("global");
    const {
        isDialogSidebarVisible, setIsDialogSidebarVisible, setDialogSidebarChild, setOnDismissSidebarDialog
    } = useContext(NahrainThemeContext)

    useEffect(() => {
        setOnDismissSidebarDialog(() => () => {
            setIsDialogSidebarVisible(false)
        });
    }, [setOnDismissSidebarDialog]);

    useEffect(() => {
        setDialogSidebarChild(<UserInfoScreen/>);
    }, [setDialogSidebarChild]);

    return (
        <div className={`bg-background p-6 h-fit flex-1`}>
            <AdminCard title={t("users_management")} description={t('users_screen_description')}
                       ButtonIcon={IcAddCircle} buttonTitle={t('add_new_user')} TitleIcon={IcUsers}
                       onButtonClick={() => {
                           setIsDialogSidebarVisible(!isDialogSidebarVisible)

                       }}/>

            <div className={`flex flex-wrap justify-between gap-4`}>
                <div className={`md:flex-1 min-w-[340px]`}>
                    <h1 className={`text-xl text-onBackground font-medium`}>{t("professors")}</h1>
                    <p className={`text-[16px] text-onBackgroundCaption mt-2`}>{t("professors_description")}</p>
                </div>
                <div className={`flex flex-col ltr:items-end rtl:items-start gap-3 flex-1`}>
                    <div className="mt-4  border border-onBackgroundCaption rounded-t-lg w-full">
                        <h1 className="text-onBackground bg-card h-12 ps-4 flex items-center visible sm:hidden rounded-t-lg">{t("professors")}</h1>
                        <UsersTable className="rounded-t-lg"/>
                    </div>
                    <div className={`flex flex-row gap-2 text-onBackground`}>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            1
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            2
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            ...
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            4
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            5
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-[0.5px] my-4 border-strokeGray unselectable"/>
            <div className={`flex flex-wrap justify-between gap-4`}>
                <div className={`md:flex-1 min-w-[340px]`}>
                    <h1 className={`text-xl text-onBackground font-medium`}>{t("students")}</h1>
                    <p className={`text-[16px] text-onBackgroundCaption mt-2`}>{t("students_description")}</p>
                </div>
                <div className={`flex flex-col ltr:items-end rtl:items-start gap-3 flex-1`}>
                    <div className="mt-4  border border-onBackgroundCaption rounded-t-lg w-full">
                        <h1 className="text-onBackground bg-card h-12 ps-4 flex items-center visible sm:hidden rounded-t-lg">{t("students")}</h1>
                        <UsersTable className="rounded-t-lg"/>
                    </div>
                    <div className={`flex flex-row gap-2 text-onBackground`}>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            1
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            2
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            ...
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            4
                        </div>
                        <div className={`rounded border border-softGray px-3 size-fit py-2`}>
                            5
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const UsersTable = ({className}) => {
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

    return (
        <table
            className={`${className} w-full flex flex-row bg-background overflow-hidden text-onBackground rounded-t-lg ${
                isWrapped ? 'inline-table' : ''
            } ${isWrapped ? 'text-center' : 'text-start'}`}
            ref={divRef}>
            <thead>
            {products?.map((data, index) => (
                <tr
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
                </tr>
            ))}
            </thead>
            <tbody className={`flex-1`}>
            {products?.map((data, index) => (
                <tr
                    className={`flex flex-col w-full ${isWrapped ? 'table-row mb-0' : ''}`}
                    key={index}
                >
                    <td className={`${borderForBodies} py-3 px-4 truncate`}>
                        {data?.name}
                    </td>
                    <td className={`${borderForBodies} py-3 px-4 truncate`}>
                        {data?.date_created}
                    </td>
                    <td className={`border-b border-card py-3 px-4 truncate`}>
                        {data?.email}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};


const UserInfoScreen = () => {
    return (
        <div className={`max-w-[700px] mx-auto relative`}>
            <ProgressBar current={1} max={3}/>
            <h1 className={`text-xl mt-6 text-onBackground font-semibold`}>Personal Info <span
                className={`text-error`}>*</span></h1>
            <div className={`mt-6`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>Full Name</h1>
                <NahrainInput type={`text`} className={`mt-2`} placeholder={"محمد على كاظم"}
                              icon={<IcTextSquare/>} onChange={() => {
                }}/>
            </div>

            <div className={`mt-4`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>Full Name</h1>
                <DatePicker className={`mt-2`}/>
            </div>

            <div className={`mt-4`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>Gender</h1>
                <DropDown
                    icon={<IcUsers className={`size-6 text-onBackgroundCaption`}/>}
                    currentValue={null}
                    className={`!mt-2`}
                    placeholder={"Select"}
                    items={['Male', 'Female'].map((item) => (
                        <MenuItem value={item} key={item}>{item}</MenuItem>
                    ))}
                />
            </div>
            <h1 className={`text-xl mt-6 text-onBackground font-semibold`}>Contact Information <span
                className={`text-error`}>*</span></h1>
            <div className={`mt-6`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>Email</h1>
                <NahrainInput type={`email`} className={`mt-2`} placeholder={"ali@nahrainuniv.edu.iq"}
                              icon={<IcEmail/>} onChange={() => {
                }}/>
            </div>
            <div className={`mt-4`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>Phone Number</h1>
                <NahrainInput type={`tel`} className={`mt-2`} placeholder={"+964"}
                              icon={<IcPhone/>} onChange={() => {
                }}/>
            </div>

            <h1 className={`text-xl mt-6 text-onBackground font-semibold`}>Additional Info</h1>
            <div className={`mt-6`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>Providence</h1>
                <DropDown
                    currentValue={null}
                    className={`!mt-2`}
                    placeholder={"Select"}
                    items={['Al-Anbar', 'Babylon', 'Baghdad', 'Basra', 'Dhi Qar', 'Al-Qadisiyyah', 'Diyala', 'Duhok', 'Erbil', 'Karbala', 'Kirkuk', 'Maysan', 'Muthanna', 'Najaf', 'Nineveh', 'Saladin', 'Sulaymaniyah', 'Wasit'
                    ].map((item) => (
                        <MenuItem value={item} key={item}>{item}</MenuItem>
                    ))}
                />
            </div>
            <div className={`sticky bottom-0 py-4 mt-2 bg-card`}>
                <NahrainButton onClick={()=>{}} className={`w-full`}>
                    <p className="text-2xl ">Create New User</p>
                </NahrainButton>
            </div>
        </div>
    )
}


const DatePicker = ({className}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const calendarRef = useRef(null);
    const yearListRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowCalendar(false);
                setShowYearPicker(false);
            }
        };

        if (showCalendar || showYearPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showCalendar, showYearPicker]);

    const handleDateClick = (day) => {
        const date = new Date();
        date.setFullYear(currentYear);
        date.setMonth(currentMonth);
        date.setDate(day);
        setSelectedDate(date);
        setShowCalendar(false);
    };

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const renderCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(currentMonth, currentYear);
        const firstDay = firstDayOfMonth(currentMonth, currentYear);

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="text-center py-2"></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            days.push(
                <div
                    key={day}
                    className="text-center py-2 hover:bg-card cursor-pointer"
                    onClick={() => handleDateClick(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const goToPreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const goToNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleYearSelect = (year) => {
        setCurrentYear(year);
        setShowYearPicker(false);
    };

    const renderYearList = () => {
        const todayYear = new Date().getFullYear();
        const years = [];
        for (let year = todayYear; year >= 1900; year--) {
            years.push(
                <div
                    key={year}
                    className={`py-2 px-4 cursor-pointer hover:bg-card text-center ${year === currentYear ? "font-bold text-secondary" : ""}`}
                    onClick={() => handleYearSelect(year)}
                >
                    {year}
                </div>
            );
        }
        return years;
    };

    useEffect(() => {
        if (showYearPicker && yearListRef.current) {
            const selectedYearElement = yearListRef.current.querySelector(".font-bold");
            if (selectedYearElement) {
                selectedYearElement.scrollIntoView({behavior: "smooth", block: "center"});
            }
        }
    }, [showYearPicker]);

    return (
        <div className={`${className} relative`} ref={calendarRef}>
            <IcCalendar className={`absolute top-4 start-4 text-onBackgroundCaption`}/>
            <input
                type="text"
                readOnly
                value={selectedDate
                    ? `${selectedDate.getFullYear()}/${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}/${selectedDate.getDate().toString().padStart(2, "0")}`
                    : ""}
                onClick={() => setShowCalendar(!showCalendar)}
                className="border border-strokeGray py-4 ps-12 text-onBackground rounded-lg bg-transparent transition-colors focus:outline-none focus:border-secondary placeholder-onBackgroundCaption"
                placeholder="YYYY/MM/DD"
            />
            {showCalendar && (
                <div className="absolute mt-2 rounded shadow-lg bg-background z-40">
                    <div className="flex justify-between items-center p-2">
                        <button onClick={goToPreviousMonth} className="p-1 hover:bg-card rounded text-onBackground">
                            &lt;
                        </button>
                        <span
                            className="font-semibold cursor-pointer hover:text-secondary text-onBackground"
                            onClick={() => setShowYearPicker(true)}
                        >
                            {new Date(currentYear, currentMonth).toLocaleString("default", {month: "long"})} {currentYear}
                        </span>
                        <button onClick={goToNextMonth} className="p-1 hover:bg-card rounded text-onBackground">
                            &gt;
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 p-2 text-onBackground">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="text-center font-semibold py-2">
                                {day}
                            </div>
                        ))}
                        {renderCalendar()}
                    </div>
                </div>
            )}

            {showYearPicker && (
                <div className="absolute mt-2 border rounded shadow-lg bg-background z-50 w-40 p-2 text-onBackground">
                    <div ref={yearListRef} className="h-48 overflow-y-auto">
                        {renderYearList()}
                    </div>
                </div>
            )}
        </div>
    );
};