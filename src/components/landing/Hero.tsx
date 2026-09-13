import { useTranslation } from "react-i18next";
import { ArrowRight, TrendingUp, Users, PiggyBank, Globe, Building2, Wind, HardHat, Laptop } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { labelKey: "statInvestors", value: "10,000+", icon: Users },
  { labelKey: "statInvested", value: "$284M+", icon: PiggyBank },
  { labelKey: "statReturn", value: "12.4%", icon: TrendingUp },
  { labelKey: "statCountries", value: "40+", icon: Globe },
];

const sectors = [
  { icon: Building2, color: "#10b981", nameKey: "featAgriculture" },
  { icon: HardHat, color: "#d97706", nameKey: "featMinerals" },
  { icon: Wind, color: "#3b82f6", nameKey: "featEnergy" },
  { icon: Laptop, color: "#8b5cf6", nameKey: "featTechnology" },
];

export function Hero() {
  const { t } = useTranslation("landing");

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#d4a94f] blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#14b8a6] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4a94f]/40 bg-[#d4a94f]/10 px-4 py-1.5 text-xs font-medium text-[#d4a94f] mb-6 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#d4a94f]" />
              {t("landing.badge")}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6">
              {t("landing.heroTitle")}{" "}
              <span className="text-[#d4a94f]">{t("landing.heroTitleHighlight")}</span>
            </h1>

            <p className="text-base sm:text-lg text-[#9aa6bd] leading-relaxed max-w-xl mb-8">
              {t("landing.heroSubtitle")}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/auth"
                className="inline-flex items-center gap-2 rounded-xl bg-[#d4a94f] text-[#0a0f1c] font-semibold px-6 py-3.5 hover:brightness-110 transition-all shadow-xl shadow-[#d4a94f]/25"
              >
                {t("landing.ctaStart")}
                <ArrowRight size={18} />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl border border-[#2a3550] text-white font-medium px-6 py-3.5 hover:bg-white/5 hover:border-[#d4a94f]/50 transition-all"
              >
                {t("landing.ctaExplore")}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="hidden lg:flex gap-6">
            {sectors.map((sector) => (
              <div
                key={sector.nameKey}
                className="flex items-center gap-3 rounded-xl border border-[#1a2238] bg-[#0a0f1c]/60 px-4 py-3 backdrop-blur-sm"
              >
                <sector.icon size={20} color={sector.color} />
                <span className="text-sm text-[#c7cedb]">{t(sector.nameKey)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.labelKey}
              className="rounded-2xl border border-[#1a2238] bg-[#0a0f1c]/70 p-5 md:p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-[#9aa6bd] mb-3">
                <stat.icon size={18} color="#d4a94f" />
                <span className="text-sm font-medium">{t(stat.labelKey)}</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
