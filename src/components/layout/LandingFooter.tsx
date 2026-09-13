import { useTranslation } from "react-i18next";

export function LandingFooter() {
  const { t } = useTranslation("landing");

  return (
    <footer className="border-t border-[#1a2238] bg-[#060a14]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 md:py-18">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#d4a94f] flex items-center justify-center text-[#0a0f1c] font-bold text-sm">
                IB
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">
                {t("app.name")}
              </span>
            </div>
            <p className="text-sm text-[#9aa6bd] leading-relaxed max-w-xs">
              {t("landing.footerDesc")}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{t("landing.footerPlatform")}</h4>
            <ul className="space-y-3 text-sm text-[#9aa6bd]">
              <li><a href="#features" className="hover:text-[#d4a94f] transition-colors">Features</a></li>
              <li><a href="#plans" className="hover:text-[#d4a94f] transition-colors">Plans</a></li>
              <li><a href="#preview" className="hover:text-[#d4a94f] transition-colors">Dashboard</a></li>
              <li><a href="/auth" className="hover:text-[#d4a94f] transition-colors">Sign Up</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{t("landing.footerCompany")}</h4>
            <ul className="space-y-3 text-sm text-[#9aa6bd]">
              <li><a href="#" className="hover:text-[#d4a94f] transition-colors">{t("landing.footerAbout")}</a></li>
              <li><a href="#" className="hover:text-[#d4a94f] transition-colors">{t("landing.footerCareers")}</a></li>
              <li><a href="#" className="hover:text-[#d4a94f] transition-colors">{t("landing.footerBlog")}</a></li>
              <li><a href="#" className="hover:text-[#d4a94f] transition-colors">{t("landing.footerHelp")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{t("landing.footerLegal")}</h4>
            <ul className="space-y-3 text-sm text-[#9aa6bd]">
              <li><a href="#" className="hover:text-[#d4a94f] transition-colors">{t("landing.footerTerms")}</a></li>
              <li><a href="#" className="hover:text-[#d4a94f] transition-colors">{t("landing.footerPrivacy")}</a></li>
              <li><a href="#" className="hover:text-[#d4a94f] transition-colors">{t("landing.footerRisk")}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#1a2238] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#9aa6bd]">
          <p>{t("landing.footerCopyright")}</p>
          <p className="max-w-md text-center md:text-left">{t("landing.footerDisclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
