import 'output.css';
import React from "react";

import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {GradesScreen} from "./Prof/Grades/GradesScreen";
import {MainScaffold} from "./Common/component/MainScaffold";
import {SettingsScreen} from "./Common/screens/Settings/SettingsScreen";
import {NotFound404} from "./Common/screens/NotFound404/NotFound404";


function App() {

    document.body.classList.add('dark');

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/nahrain-central' element={<MainScaffold/>}>
                    <Route index={true} element={<div></div>}/>
                    <Route path='grades' element={<GradesScreen/>}/>
                    <Route path='settings' element={<SettingsScreen/>}/>
                    <Route path='*'/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;



