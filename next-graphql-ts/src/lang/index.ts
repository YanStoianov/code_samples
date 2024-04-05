import enLang from "./entries/en-UK";
import { IAppLocale, SupportedLocales } from "./types";

const AppLocale: IAppLocale = {
  [SupportedLocales.EN_UK]: enLang,
};

export default AppLocale;
