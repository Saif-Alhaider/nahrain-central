import 'output.css';
import React, {useContext, useEffect, useState} from "react";

import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {GradesScreen} from "./Prof/Grades/GradesScreen";
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
import {SignupScreen} from "./Common/screens/Authentication/Signup/SignupScreen";
import {TotpScreen} from "./Common/screens/Authentication/TOTP/TotpScreen";
import {PrivateRoutes} from "../routes/PrivateRoutes";
import {LoginScreen} from "./Common/screens/Authentication/Login/LoginScreen";
import {AuthRoutes} from "../routes/AuthRoutes";
import {ScanTotpScreen} from "./Common/screens/Authentication/Scan TOTP/ScanTotpScreen";
import {PendingApprovalScreen} from "./Common/screens/PendingApprovalScreen";
import {PendingApprovalRoutes} from "../routes/PendingApprovalRoutes";
import {AuthContext} from "../context/AuthContext";
import {NahrainLogger} from "../debug/NahrainLogger";
import {StudentRecordedLectures} from "./Student/StudentRecordedLectures/StudentRecordedLectures";
import {Users} from "./Admin/users/Users";
import {Schedule} from "./Admin/Schedule";
import {Syllabus} from "./Admin/Syllabus";


function App() {

    const [theme, setTheme] = useState("light");
    const {currentTheme, currentLanguage, currentFont} = useContext(NahrainThemeContext)
    const {role} = useContext(AuthContext);

    const direction = supportedLanguages[currentLanguage].direction

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (event) => setTheme(event.matches ? "dark" : "light");
        setTheme(mediaQuery.matches ? "dark" : "light");
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);


    document.body.classList.add(currentTheme === "deviceTheme" ? theme : currentTheme);

    return (
        <div
            className={`${currentTheme === "deviceTheme" ? theme : currentTheme} ${direction} ${currentFont}`}
            dir={direction}>
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route element={<AuthRoutes/>}>
                            <Route path='sign-up' element={<SignupScreen/>}/>
                            <Route path='login' element={<LoginScreen/>}/>
                            <Route path='totp' element={<TotpScreen/>}/>
                        </Route>
                        <Route path='scan-totp' element={<ScanTotpScreen/>}/>

                        <Route element={<PendingApprovalRoutes/>}>
                            <Route path='pending-approval' element={<PendingApprovalScreen/>}/>
                        </Route>

                        <Route element={<PrivateRoutes />} >
                            <Route index element={getHomeScreen(role)} />

                            {role && (
                                <>
                                    {/* PROF Role */}
                                    {role.authority === 'PROF' && (
                                        <>
                                            <Route path='recorded-lectures' element={<ProfRecordedLectures />} />
                                            <Route path='grades' element={<GradesScreen />} />
                                            <Route path='record-absence' element={<MainRecordAbsence />} />
                                            <Route path='lectures-schedule' element={<div></div>} />
                                            <Route path='exams' element={<ExamsScreen />} />
                                            <Route path='settings' element={<SettingsScreen />} />
                                            <Route path='announcement' element={<AnnouncementScreen />} />
                                            <Route path='take-absence' element={<RecordAbsence />} />
                                        </>
                                    )}

                                    {/* STUDENT Role */}
                                    {role.authority === 'STUDENT' && (
                                        <>
                                            <Route path='lectures-schedule' element={<div></div>} />
                                            <Route path='recorded-lectures' element={<StudentRecordedLectures />} />
                                            <Route path='settings' element={<SettingsScreen />} />

                                        </>
                                    )}

                                    {/* ADMIN Role */}
                                    {role.authority === 'ADMIN' && (
                                        <>
                                            <Route path='settings' element={<SettingsScreen />} />
                                            <Route path='users' element={<Users />} />
                                            <Route path='schedule' element={<Schedule />} />
                                            <Route path='syllabus' element={<Syllabus/>} />
                                            <Route path='announcement' element={<AnnouncementScreen />} />
                                        </>
                                    )}
                                </>
                            )}
                        </Route>


                    </Route>
                <Route path='*' element={<NotFound404/>}/>
            </Routes>
        </BrowserRouter>
</div>
)
    ;
}

export default App;

const getHomeScreen = (role) => {
    if (role === null) return <Navigate to="/login" replace/>;
    switch (role.authority) {
        case 'PROF':
            return <HomeScreen />;
        case 'STUDENT':
            return <HomeScreen />;
        case 'ADMIN':
            return <HomeScreen />;
        default:
            return null;
    }
};