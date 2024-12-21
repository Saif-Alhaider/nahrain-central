import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import reportWebVitals from 'reportWebVitals';
import App from "./presentation/App";
import {NahrainThemeProvider} from "./context/NahrainThemeContext";
import "./translation/i18n";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <NahrainThemeProvider>
                <App/>
            </NahrainThemeProvider>
        </I18nextProvider>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();