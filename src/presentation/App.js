import 'output.css';
import React, {useContext, useEffect, useState} from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GradesScreen} from "./Prof/Grades/GradesScreen";
import {MainScaffold} from "./Common/component/MainScaffold";
import {SettingsScreen} from "./Common/screens/Settings/SettingsScreen";
import {NotFound404} from "./Common/screens/NotFound404/NotFound404";
import {ProfRecordedLectures} from "./Prof/ProfRecordedLectures/ProfRecordedLectures";
import {ExamsScreen} from "./Prof/Exams/ExamsScreen";
import {NahrainThemeContext} from "../context/NahrainThemeContext";
import {supportedLanguages} from "../translation/supportedLanguages";
import {AnnouncementScreen} from "./Common/screens/Announcement/AnnouncementScreen";
import {HomeScreen} from "./Prof/Home/HomeScreen";
import {MainRecordAbsence} from "./Prof/Record Absence/MainRecordAbsence";
import {RecordAbsence} from "./Prof/Record Absence/RecordAbsence";


function App() {

    const [theme, setTheme] = useState("light");
    const {currentTheme, currentLanguage,currentFont} = useContext(NahrainThemeContext)

    const direction = supportedLanguages[currentLanguage].direction

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (event) => setTheme(event.matches ? "dark" : "light");
        setTheme(mediaQuery.matches ? "dark" : "light");
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    document.body.classList.add("light");

    return (
        <div
            className={`${currentTheme === "deviceTheme" ? theme : currentTheme} ${direction} ${currentFont}`} dir={direction}>
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route path='/nahrain-central' element={<MainScaffold/>}>
                            <Route index={true} element={<HomeScreen/>}/>
                            <Route path='recorded-lectures' element={<ProfRecordedLectures/>}/>
                            <Route path='grades' element={<GradesScreen/>}/>
                            <Route path='record-absence' element={<MainRecordAbsence/>}/>
                            <Route path='lectures-schedule' element={<div></div>}/>
                            <Route path='exams' element={<ExamsScreen/>}/>
                            <Route path='settings' element={<SettingsScreen/>}/>
                            <Route path='announcement' element={<AnnouncementScreen/>}/>
                            <Route path='take-absence' element={<RecordAbsence/>}/>
                        </Route>
                        <Route path='*' element={<NotFound404/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;



