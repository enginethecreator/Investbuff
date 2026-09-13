import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enUS from "./locales/en-US.json";
import esES from "./locales/es-ES.json";

const resources = {
  "en-US": { translation: enUS as unknown as Record<string, string> },
  "es-ES": { translation: esES as unknown as Record<string, string> },
};

const storedLang = typeof window !== "undefined" ? localStorage.getItem("investbuff-lang") : null;
const storedAutoDetect = typeof window !== "undefined"
  ? localStorage.getItem("investbuff-lang-auto") === "true"
  : true;

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLang ?? "en-US",
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: [],
      lookupLocalStorage: "investbuff-lang",
    },
    react: {
      useSuspense: false,
    },
  });

const defaultInstance = i18n;

export const changeLanguage = (code: string) => {
  localStorage.setItem("investbuff-lang", code);
  localStorage.removeItem("investbuff-lang-auto");
  defaultInstance.changeLanguage(code);
  syncHtmlLang(code);
};

export const enableAutoDetect = () => {
  localStorage.setItem("investbuff-lang-auto", "true");
  defaultInstance.changeLanguage(getInitialLanguage());
  syncHtmlLang(getInitialLanguage());
};

export const disableAutoDetect = () => {
  localStorage.removeItem("investbuff-lang-auto");
};

export const isAutoDetectEnabled = () => {
  return localStorage.getItem("investbuff-lang-auto") === "true";
};

export const registerTranslations = (code: string, translations: Record<string, string>) => {
  defaultInstance.addResourceBundle(code, "translation", translations, true);
  if (defaultInstance.language === code) {
    defaultInstance.changeLanguage(code);
  }
};

export const getBrowserLanguages = () => {
  if (typeof navigator === "undefined") return ["en-US"];
  return (navigator.languages || [navigator.language || "en-US"]).map((lang) =>
    lang.split("-").length === 1 ? `${lang}-${lang.toUpperCase()}` : lang
  );
};

function getInitialLanguage(): string {
  if (storedLang) return storedLang;
  if (storedAutoDetect) {
    const browserLangs = getBrowserLanguages();
    if (browserLangs.includes("es-ES")) return "es-ES";
    if (browserLangs.includes("en-US")) return "en-US";
  }
  return "en-US";
}

function syncHtmlLang(code: string) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("lang", code.startsWith("-") ? "en-US" : code);
}

if (typeof document !== "undefined") {
  document.documentElement.setAttribute("lang", getInitialLanguage());
}

export default i18n;
