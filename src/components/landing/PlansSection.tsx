import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    nameKey: "planStarter",
    priceKey: "planStarterPrice",
    highlightKey: "planStarterHighlight",
    highlightColor: "#64748b",
    features: ["planStarterF1", "planStarterF2", "planStarterF3", "planStarterF4"],
  },
  {
    nameKey: "planGrowth",
    priceKey: "planGrowthPrice",
    highlightKey: "planGrowthHighlight",
    highlightColor: "#d4a94f",
    featured: true,
    features: ["planGrowthF1", "planGrowthF2", "planGrowthF3", "planGrowthF4", "planGrowthF5"],
  },
  {
    nameKey: "planPremium",
    priceKey: "planPremiumPrice",
    highlightKey: "planPremiumHighlight",
    highlightColor: "#d4a94f",
    features: ["planPremiumF1", "planPremiumF2", "planPremiumF3", "planPremiumF4", "planPremiumF5", "planPremiumF6"],
  },
];

export function PlansSection() {
  const { t } = useTranslation("landing");

  return (
    <section id="plans" className="py-20 md:py-28 bg-[#0a0f1c]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-18"
        >
          <span className="text-xs font-semibold tracking-widest text-[#d4a94f] uppercase">
            {t("landing.plansLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4 tracking-tight">
            {t("landing.plansTitle")}
          </h2>
          <p className="text-[#9aa6bd] text-base md:text-lg leading-relaxed">
            {t("landing.plansSubtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.nameKey}
              initial={{ opacity: 0, y: 24 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 md:p-8 border ${
                tier.featured
                  ? "border-[#d4a94f]/60 bg-gradient-to-b from-[#0a0f1c] to-[#0d1325] shadow-xl shadow-[#d4a94f]/10 scale-105 z-10"
                  : "border-[#1a2238] bg-[#0a0f1c]/60"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#d4a94f] px-4 py-1 text-xs font-semibold text-[#0a0f1c] tracking-wide shadow-lg">
                  {t(tier.highlightKey)}
                </div>
              )}

              <div className="mb-6">
                <div className="text-sm text-[#9aa6bd] mb-1">
                  {t(tier.nameKey)}
                  <span className="text-[#9aa6bd]"> {""} · {t("planStarterMin")}</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {t(tier.priceKey)}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((key) => (
                  <li key={key} className="flex items-start gap-3 text-sm text-[#c7cedb]">
                    <Check size={16} color="#d4a94f" className="mt-0.5 shrink-0" />
                    {t(key)}
                  </li>
                ))}
              </ul>

              <a
                href="/auth"
                className={`block w-full text-center rounded-xl font-semibold text-sm py-3.5 transition-all ${
                  tier.featured
                    ? "bg-[#d4a94f] text-[#0a0f1c] hover:brightness-110 shadow-lg shadow-[#d4a94f]/25"
                    : "border border-[#2a3550] text-white hover:border-[#d4a94f]/50 hover:bg-white/5"
                }`}
              >
                {t("landing.getStarted")}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
