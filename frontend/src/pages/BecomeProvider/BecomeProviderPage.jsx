import BecomeProviderHero from "../../components/become-provider/BecomeProviderHero";
import BusinessInformation from "../../components/become-provider/BusinessInformation";
import SkillsSection from "../../components/become-provider/SkillsSection";
import ExperienceSection from "../../components/become-provider/ExperienceSection";
import DocumentUpload from "../../components/become-provider/DocumentUpload";
import AvailabilitySection from "../../components/become-provider/AvailabilitySection";
import SubmitSection from "../../components/become-provider/SubmitSection";

const BecomeProviderPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">

      <BecomeProviderHero />

      <section className="mx-auto max-w-5xl space-y-8 px-6 py-12">

        <BusinessInformation />

        <SkillsSection />

        <ExperienceSection />

        <DocumentUpload />

        <AvailabilitySection />

        <SubmitSection />

      </section>

    </main>
  );
};

export default BecomeProviderPage;