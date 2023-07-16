import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import {en} from './en/index';
import {es} from './es/index';

const resources = {
    en,
    es
}


i18n.use(initReactI18next).init({ 
    compatibilityJSON:'v3',
    fallbackLng:'en',
    resources,
    lng:'en',
    interpolation:{
        escapeValue:false
    }
 })

 export default i18n;