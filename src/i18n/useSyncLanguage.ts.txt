import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useSyncLanguage() {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const lang = i18n.language?.startsWith("-") ? "en-US" : i18n.language ?? "en-US";
    document.documentElement.setAttribute("lang", lang);
  }, [i18n.language]);
}
