import {
  provider,
} from "../../constants/provider";

import ProviderHero from "../../components/provider/ProviderHero";
import ProviderAbout from "../../components/provider/ProviderAbout";
import ProviderStats from "../../components/provider/ProviderStats";
import ProviderSkills from "../../components/provider/ProviderSkills";
import ProviderServices from "../../components/provider/ProviderServices";
import ProviderAvailability from "../../components/provider/ProviderAvailability";
import ProviderContactCard from "../../components/provider/ProviderContactCard";

const ProviderPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <ProviderHero
        provider={provider}
      />

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

          {/* Left Side */}

          <div className="space-y-8">

            <ProviderAbout
              provider={provider}
            />

            <ProviderStats
              provider={provider}
            />

            <ProviderSkills
              provider={provider}
            />

            <ProviderServices
              provider={provider}
            />

          </div>

          {/* Right Sidebar */}

          <div className="space-y-8">

            <ProviderAvailability
              provider={provider}
            />

            <ProviderContactCard
              provider={provider}
            />

          </div>

        </div>

      </section>

    </main>
  );
};

export default ProviderPage;