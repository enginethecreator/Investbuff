import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe } from "lucide-react";
import { changeLanguage } from "../../i18n";

export function LandingNavbar() {
  const { t: lt } = useTranslation("landing");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1c]/90 backdrop-blur-md border-b border-[#1a2238]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#d4a94f] flex items-center justify-center text-[#0a0f1c] font-bold text-sm">
              IB
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              {lt("app.name")}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#c7cedb]">
            <a href="#features" className="hover:text-[#d4a94f] transition-colors">
              {lt("nav.features")}
            </a>
            <a href="#plans" className="hover:text-[#d4a94f] transition-colors">
              {lt("nav.plans")}
            </a>
            <a href="#preview" className="hover:text-[#d4a94f] transition-colors">
              {lt("landing.dashLabel")}
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />              <a
                href="/auth"
                className="text-sm font-medium text-[#c7cedb] hover:text-white transition-colors"
              >
                {lt("nav.login")}
              </a>
              <a
                href="/auth"
                className="rounded-xl bg-[#d4a94f] text-[#0a0f1c] text-sm font-semibold px-5 py-2.5 hover:brightness-110 transition-all shadow-lg shadow-[#d4a94f]/20"
              >
                {lt("nav.signup")}
              </a>
          </div>

          <button
            className="md:hidden text-[#c7cedb] p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#1a2238] bg-[#0a0f1c]">
          <nav className="px-5 py-4 flex flex-col gap-4 text-sm font-medium text-[#c7cedb]">
            <a
              href="#features"
              className="hover:text-[#d4a94f] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {lt("nav.features")}
            </a>
            <a
              href="#plans"
              className="hover:text-[#d4a94f] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {lt("nav.plans")}
            </a>
            <a
              href="#preview"
              className="hover:text-[#d4a94f] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {lt("landing.dashLabel")}
            </a>
            <div className="pt-2 border-t border-[#1a2238] flex flex-col gap-3">
              <LanguageSwitcher />
              <a
                href="/auth"
                className="text-sm font-medium text-[#c7cedb] hover:text-white transition-colors text-center"
                onClick={() => setMobileOpen(false)}
              >
                {lt("nav.login")}
              </a>
              <a
                href="/auth"
                className="rounded-xl bg-[#d4a94f] text-[#0a0f1c] text-sm font-semibold px-5 py-2.5 text-center hover:brightness-110 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {lt("nav.signup")}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  return (
    <div className="flex items-center gap-1.5 rounded-xl border border-[#1a2238] bg-[#060a14] px-2 py-1.5">
      <Globe size={14} className="text-[#d4a94f]" />
      <select
        value={current}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent text-sm text-[#e6ecf5] outline-none cursor-pointer appearance-none pr-4"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='%23d4a94f' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 6px center",
        }}
      >
        <option value={current}>{current.toUpperCase()}</option>
        <option value="en-US">EN</option>
        <option value="es-ES">ES</option>
      </select>
    </div>
  );
}
