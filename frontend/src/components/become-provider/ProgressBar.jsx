const ProgressBar = ({
  step = 1,
  totalSteps = 6,
}) => {
  const steps = [
    "Basic",
    "Professional",
    "Services",
    "Documents",
    "Availability",
    "Review",
  ];

  return (
    <section className="border-b bg-white">

      <div className="mx-auto max-w-5xl px-6 py-10">

        <h1 className="text-4xl font-bold text-gray-900">
          Become a Provider
        </h1>

        <p className="mt-2 text-gray-600">
          Complete the following steps to join our verified providers.
        </p>

        {/* Progress */}

        <div className="mt-10 flex items-center justify-between">

          {steps.map((item, index) => {

            const current = index + 1;

            return (

              <div
                key={item}
                className="flex flex-1 items-center"
              >

                {/* Circle */}

                <div className="flex flex-col items-center">

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm font-semibold transition

                    ${
                      current < step
                        ? "border-blue-600 bg-blue-600 text-white"

                        : current === step
                        ? "border-blue-600 bg-white text-blue-600"

                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {current}
                  </div>

                  <span
                    className={`mt-3 text-sm font-medium

                    ${
                      current <= step
                        ? "text-blue-600"

                        : "text-gray-400"
                    }`}
                  >
                    {item}
                  </span>

                </div>

                {/* Line */}

                {current !== totalSteps && (

                  <div
                    className={`mx-3 h-1 flex-1 rounded-full

                    ${
                      current < step

                        ? "bg-blue-600"

                        : "bg-gray-200"
                    }`}
                  />

                )}

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
};

export default ProgressBar;