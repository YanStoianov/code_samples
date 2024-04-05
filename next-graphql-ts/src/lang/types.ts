export type Messages = Record<string, string>;

export enum SupportedLocales {
  EN_UK = "en-UK",
}

export interface LocaleMessage {
  messages: Messages;
  locale: string;
}

export type IAppLocale = {
  [Locales in SupportedLocales]: LocaleMessage;
};
