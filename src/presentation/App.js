import 'output.css';
import React from "react";

import {BrowserRouter} from "react-router-dom";
import {GradesScreen} from "./Prof/Grades/GradesScreen";
import {MainScaffold} from "./Common/component/MainScaffold";
import {SettingsScreen} from "./Common/Settings/SettingsScreen";


function App() {

    document.body.classList.add('dark');

    return (
        <BrowserRouter>
            <MainScaffold title={"Settings"} child={<SettingsScreen/>}/>
        </BrowserRouter>
    );
}

export default App;



