import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const metrics = [
  { labelKey: "dashTotalValue", value: "$284,630", color: "#10b981" },
  { labelKey: "dashTotalReturn", value: "+$41,280", color: "#d4a94f" },
  { labelKey: "dashActiveInv", value: "8", color: "#3b82f6" },
  { labelKey: "dashMonthlyIncome", value: "$12,450", color: "#8b5cf6" },
];

const activities = [
  {
    nameKey: "dashAgriFund",
    returnKey: "dashAgriReturn",
    color: "#10b981",
  },
  {
    nameKey: "dashSolarProject",
    returnKey: "dashSolarReturn",
    color: "#d97706",
  },
  {
    nameKey: "dashGoldMining",
    returnKey: "dashGoldReturn",
    color: "#3b82f6",
  },
];

const allocation = [
  { key: "dashPortAgri", share: 30, color: "#10b981" },
  { key: "dashPortEnergy", share: 25, color: "#d97706" },
  { key: "dashPortMinerals", share: 20, color: "#3b82f6" },
  { key: "dashPortRE", share: 15, color: "#8b5cf6" },
  { key: "dashPortTech", share: 10, color: "#06b6d4" },
];

export function DashboardPreview() {
  const { t } = useTranslation("landing");

  return (
    <section id="preview" className="py-20 md:py-28 bg-[#070b16]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-18"
        >
          <span className="text-xs font-semibold tracking-widest text-[#d4a94f] uppercase">
            {t("landing.dashLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4 tracking-tight">
            {t("landing.dashTitle")}
          </h2>
          <p className="text-[#9aa6bd] text-base md:text-lg leading-relaxed">
            {t("landing.dashSubtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-[#1a2238] bg-[#0a0f1c]/70 shadow-2xl shadow-black/40 overflow-hidden backdrop-blur-sm">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#1a2238] bg-[#060a14]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <span className="w-3 h-3 rounded-full bg-[#10b981]" />
              </div>
              <div className="flex-1 text-center">
                <div className="text-[10px] text-[#9aa6bd] tracking-wide">investbuff-dashboard</div>
              </div>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#3b3f54]" />
                <span className="w-3 h-3 rounded-full bg-[#3b3f54]" />
              </div>
            </div>

            <div className="p-5 md:p-7">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {metrics.map((metric) => (
                  <div
                    key={metric.labelKey}
                    className="rounded-xl border border-[#1a2238] bg-[#060a14] p-4"
                  >
                    <div className="text-xs text-[#9aa6bd] mb-2">{t(metric.labelKey)}</div>
                    <div className="text-xl md:text-2xl font-bold text-white">{metric.value}</div>
                    <div className="mt-2 w-full h-1 rounded-full bg-[#1a2238] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${60 + Math.random() * 30}%`, backgroundColor: metric.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-white font-semibold text-sm mb-3">{t("landing.dashRecentActivity")}</h3>
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div
                      key={activity.nameKey}
                      className="flex items-center justify-between rounded-xl border border-[#1a2238] bg-[#060a14] px-4 py-3"
                    >
                      <div>
                        <div className="text-sm text-white font-medium">{t(activity.nameKey)}</div>
                        <div className="text-xs text-[#9aa6bd] mt-0.5">{t("landing.dashLabel").toLowerCase()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[#10b981]">{t(activity.returnKey)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold text-sm mb-3">{t("landing.dashPortfolio")}</h3>
                <div className="flex h-4 rounded-full overflow-hidden border border-[#1a2238] bg-[#060a14]">
                  {allocation.map((slice) => (
                    <div
                      key={slice.key}
                      className="h-full transition-all duration-500"
                      style={{ width: `${slice.share}%`, backgroundColor: slice.color }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-2 mt-3">
                  {allocation.map((slice) => (
                    <div key={slice.key} className="flex items-center gap-2 text-xs text-[#c7cedb]">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: slice.color }}
                      />
                      {t(slice.key)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
