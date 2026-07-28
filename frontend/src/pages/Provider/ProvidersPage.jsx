import { useState } from "react";

import ProviderHero from "../../components/providers/ProviderHero";
import ProviderSearch from "../../components/providers/ProviderSearch";
import ProviderFilters from "../../components/providers/ProviderFilters";
import ProviderCard from "../../components/providers/ProviderCard";
import ProviderPagination from "../../components/providers/ProviderPagination";

import { providers } from "../../constants/providers";


const ProvidersPage = () => {

  const [search, setSearch] = useState("");

  const [profession, setProfession] = useState("");

  const [location, setLocation] = useState("");

  const [currentPage, setCurrentPage] = useState(1);


  // Temporary filtering
  // Later replaced by API query

  const filteredProviders = providers.filter((provider) => {

    const searchMatch =
      provider.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      provider.profession
        ?.toLowerCase()
        .includes(search.toLowerCase());


    const professionMatch =
      profession
        ? provider.profession === profession
        : true;


    const locationMatch =
      location
        ? provider.location
          ?.toLowerCase()
          .includes(location.toLowerCase())
        : true;


    return (
      searchMatch &&
      professionMatch &&
      locationMatch
    );

  });


  return (

    <main className="min-h-screen bg-gray-50">


      {/* Hero */}

      <ProviderHero />


      <section className="mx-auto max-w-7xl px-6 py-12 space-y-8">


        {/* Search */}

        <ProviderSearch
          search={search}
          setSearch={setSearch}
        />


        {/* Filters */}

        <ProviderFilters

          profession={profession}

          setProfession={setProfession}

          location={location}

          setLocation={setLocation}

        />


        {/* Provider Grid */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">


          {filteredProviders.map((provider) => (

            <ProviderCard

              key={provider._id}

              provider={provider}

            />

          ))}


        </div>



        {/* Empty State */}

        {
          filteredProviders.length === 0 && (

            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">

                No Providers Found

              </h2>


              <p className="mt-2 text-gray-500">

                Try changing your search or filters.

              </p>


            </div>

          )
        }



        {/* Pagination */}

        <ProviderPagination

          currentPage={currentPage}

          totalPages={3}

          onPageChange={setCurrentPage}

        />


      </section>


    </main>

  );

};


export default ProvidersPage;