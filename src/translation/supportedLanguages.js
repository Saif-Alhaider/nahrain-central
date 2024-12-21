import global_en from "./global_en.json"
import global_ar from "./global_ar.json"

export const supportedLanguages = {
  en: {
    name: "English",
    direction: "ltr",
    global: global_en,
  },
  ar: {
    name: "العربية",
    direction: "rtl",
    global: global_ar,
  },
};
