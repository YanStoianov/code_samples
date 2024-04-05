// TYPES
import { LocaleMessage, SupportedLocales } from "@/lang/types";
// MODULES
import appModule from "../modules/appModule/enUK.json";
import authModule from "../modules/authModule/enUK.json";

const EnUkLang: LocaleMessage = {
  messages: {
    ...appModule,
    ...authModule
  },
  locale: SupportedLocales.EN_UK,
};
export default EnUkLang;
