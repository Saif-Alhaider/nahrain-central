import {initReactI18next} from "react-i18next";
import {supportedLanguages} from "./supportedLanguages";
import i18next from "i18next";

i18next.use(initReactI18next).init({
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    resources: supportedLanguages,
});
