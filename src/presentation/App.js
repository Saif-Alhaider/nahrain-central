import 'output.css';
import React from "react";
import {TotpScreen} from "./Common/Authentication/TOTP/TotpScreen";
import {LoginScreen} from "./Common/Authentication/Login/LoginScreen";
import {FinishSignup} from "./Common/Authentication/Finish Signup/FinishSignup";
import {ScanTotpScreen} from "./Common/Authentication/Scan TOTP/ScanTotpScreen";
import {GradesScreen} from "./Prof/Grades/GradesScreen";

function App() {
    return (
        <div className="w-full">
        <ScanTotpScreen/>
        </div>
    );
}

export default App;



