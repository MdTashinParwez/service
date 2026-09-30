import { ChevronRight } from "lucide-react";
import { categories } from "../../constants/hero";

const CategoriesSection = () => {
  return (
    <section className="bg-muted/20 py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Browse categories
            </h2>

            <p className="mt-2 text-base text-muted-foreground">
              From home repairs to digital services — all in one place
            </p>
          </div>

          <button className="hidden items-center gap-1 text-base font-medium text-primary transition-colors hover:text-primary/80 sm:flex">
            View all
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.label}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-6
                  text-center
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-slate-300
                  hover:shadow-md
                "
              >
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${category.color}`}
                >
                  <Icon
                    size={24}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {category.label}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {category.count}
                </p>
              </button>
            );
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 flex justify-center sm:hidden">
          <button className="flex items-center gap-1 text-sm font-medium text-primary">
            View all
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;