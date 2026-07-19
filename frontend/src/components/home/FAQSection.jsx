import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../constants/hero";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-muted-foreground">
            Everything you need to know about ServiceHub.
          </p>
        </div>

        {/* FAQ */}

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-foreground">
                  {faq.q}
                </span>

                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="border-t border-border px-5 py-4 text-muted-foreground leading-7">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;