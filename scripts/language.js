import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../locales/en.json'
import hi from '../locales/hi.json'
import ta from '../locales/ta.json'

export const languageResources = {
    English:{translation:en},
    Hindi:{translation:hi},
    Tamil:{translation:ta}
}

i18next.use(initReactI18next).init({
    compatibilityJSON:'v3',
    lng:'English',
    fallbackLng:"English",
    resources:languageResources
})

export default i18next