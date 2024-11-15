import 'output.css';
import React from "react";

import {BrowserRouter} from "react-router-dom";
import {GradesScreen} from "./Prof/Grades/GradesScreen";
import {MainScaffold} from "./Common/component/MainScaffold";
import {SettingsScreen} from "./Common/screens/Settings/SettingsScreen";
import {NotFound404} from "./Common/screens/NotFound404/NotFound404";


function App() {

    document.body.classList.add('dark');

    return (
        <BrowserRouter>
        </BrowserRouter>
    );
}

export default App;



