import 'output.css';
import React from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GradesScreen} from "./Prof/Grades/GradesScreen";
import {MainScaffold} from "./Common/component/MainScaffold";
import {SettingsScreen} from "./Common/screens/Settings/SettingsScreen";
import {NotFound404} from "./Common/screens/NotFound404/NotFound404";
import {ProfRecordedLectures} from "./Prof/ProfRecordedLectures/ProfRecordedLectures";
import {ExamsScreen} from "./Prof/Exams/ExamsScreen";


function App() {

    document.body.classList.add('light');

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route path='/nahrain-central' element={<MainScaffold />}>
                        <Route index={true} element={<div></div>}/>
                        <Route path='recorded-lectures' element={<ProfRecordedLectures/>}/>
                        <Route path='grades' element={<GradesScreen/>}/>
                        <Route path='exams' element={<ExamsScreen/>}/>
                        <Route path='settings' element={<SettingsScreen/>}/>
                    </Route>
                    <Route path='*' element={<NotFound404/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;



