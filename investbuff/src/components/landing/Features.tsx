import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Building2,
  HardHat,
  Wind,
  Home,
  Laptop,
  Compass,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    color: "#10b981",
    nameKey: "featAgriculture",
    descKey: "featAgricultureDesc",
  },
  {
    icon: HardHat,
    color: "#d97706",
    nameKey: "featMinerals",
    descKey: "featMineralsDesc",
  },
  {
    icon: Wind,
    color: "#3b82f6",
    nameKey: "featEnergy",
    descKey: "featEnergyDesc",
  },
  {
    icon: Home,
    color: "#8b5cf6",
    nameKey: "featRealEstate",
    descKey: "featRealEstateDesc",
  },
  {
    icon: Laptop,
    color: "#06b6d4",
    nameKey: "featTechnology",
    descKey: "featTechnologyDesc",
  },
  {
    icon: Compass,
    color: "#f43f5e",
    nameKey: "featInfrastructure",
    descKey: "featInfrastructureDesc",
  },
];

export function Features() {
  const { t } = useTranslation("landing");

  return (
    <section id="features" className="py-20 md:py-28 bg-[#070b16]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-18"
        >
          <span className="text-xs font-semibold tracking-widest text-[#d4a94f] uppercase">
            {t("landing.featuresLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4 tracking-tight">
            {t("landing.featuresTitle")}
          </h2>
          <p className="text-[#9aa6bd] text-base md:text-lg leading-relaxed">
            {t("landing.featuresSubtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.nameKey}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="group rounded-2xl border border-[#1a2238] bg-[#0a0f1c]/60 p-6 md:p-7 hover:border-[#d4a94f]/40 hover:bg-[#0a0f1c] transition-all duration-300 hover:shadow-xl hover:shadow-[#d4a94f]/5"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${feature.color}1f` }}
              >
                <feature.icon size={24} color={feature.color} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {t(feature.nameKey)}
              </h3>
              <p className="text-[#9aa6bd] text-sm leading-relaxed">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
