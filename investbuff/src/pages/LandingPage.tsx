import { useSyncLanguage } from "../i18n/useSyncLanguage";
import { LandingNavbar } from "../components/layout/LandingNavbar";
import { LandingFooter } from "../components/layout/LandingFooter";
import {
  Hero,
  Features,
  PlansSection,
  DashboardPreview,
  CTASection,
} from "../components/landing";

export function LandingPage() {
  useSyncLanguage();

  return (
    <div className="min-h-screen bg-[#070b16] text-white selection:bg-[#d4a94f]/30">
      <LandingNavbar />
      <main>
        <Hero />
        <Features />
        <PlansSection />
        <DashboardPreview />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}

export default LandingPage;
