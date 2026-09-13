import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  const { t } = useTranslation("landing");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1c] via-[#0d1325] to-[#141b33]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#d4a94f] opacity-[0.08] blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {t("landing.ctaTitle")}
          </h2>
          <p className="text-[#9aa6bd] text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {t("landing.ctaSubtitle")}
          </p>
          <a
            href="/auth"
            className="inline-flex items-center gap-2 rounded-xl bg-[#d4a94f] text-[#0a0f1c] font-semibold px-8 py-4 hover:brightness-110 transition-all shadow-xl shadow-[#d4a94f]/30"
          >
            {t("landing.ctaButton")}
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
