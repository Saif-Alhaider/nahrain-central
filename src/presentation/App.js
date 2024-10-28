import 'output.css';
import React from "react";
import {TotpScreen} from "./Authentication/TOTP/TotpScreen";
import {LoginScreen} from "./Authentication/Login/LoginScreen";
import {FinishSignup} from "./Authentication/Finish Signup/FinishSignup";
import {ScanTotpScreen} from "./Authentication/Scan TOTP/ScanTotpScreen";

function App() {
    return (
        <div className="bg-orange-500 w-full">
        <ScanTotpScreen/>
        </div>
    );
}

export default App;



