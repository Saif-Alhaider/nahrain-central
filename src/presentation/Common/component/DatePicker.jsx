import React, {useEffect, useRef, useState} from "react";
import {ReactComponent as IcCalendar} from "presentation/Common/resources/images/ic_calendar.svg";
import {useTranslation} from "react-i18next";


export const DatePicker = ({className}) => {
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

    const [t] = useTranslation("global");


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
                placeholder={t("yyyy/mm/dd")}
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
