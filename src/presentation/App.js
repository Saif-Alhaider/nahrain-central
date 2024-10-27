import 'output.css';
import React from "react";
import {TotpScreen} from "./Authentication/TOTP/TotpScreen";
import {LoginScreen} from "./Authentication/Login/LoginScreen";
import {FinishSignup} from "./Authentication/Finish Signup/FinishSignup";

function App() {
    return (
        <div className="bg-orange-500 w-full">
        <FinishSignup/>
        </div>
    );
}

export default App;



