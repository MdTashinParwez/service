import { useState } from "react";

import ProgressBar from "../../components/become-provider/ProgressBar";
import BasicInformation from "../../components/become-provider/BasicInformation";
import ProfessionalInformation from "../../components/become-provider/ProfessionalInformation";
import ServicesInformation from "../../components/become-provider/ServicesInformation";
import DocumentsInformation from "../../components/become-provider/DocumentsInformation";
import AvailabilityInformation from "../../components/become-provider/AvailabilityInformation";
import ReviewInformation from "../../components/become-provider/ReviewInformation";
import SuccessInformation from "../../components/become-provider/SuccessInformation";

const BecomeProviderPage = () => {

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({

    // Basic

    fullName: "",
    email: "",
    phone: "",
    city: "",

    // Professional

    businessName: "",
    profession: "",
    category: "",
    experience: "",
    about: "",
    skills: [],

    // Services

    services: [
      {
        title: "",
        price: "",
        description: "",
      },
    ],

    // Documents

    profilePhoto: null,
    governmentId: null,
    addressProof: null,

    // Availability

    workingDays: [],
    startTime: "",
    endTime: "",

  });

  const nextStep = () => {

    if (step < 7) {
      setStep((prev) => prev + 1);
    }

  };

  const prevStep = () => {

    if (step > 1) {
      setStep((prev) => prev - 1);
    }

  };

  const handleSubmit = () => {

    console.log(formData);

    setStep(7);

  };

  return (

    <main className="min-h-screen bg-gray-50">

      {step <= 6 && (
        <ProgressBar
          step={step}
          totalSteps={6}
        />
      )}

      <section className="mx-auto max-w-5xl px-6 py-10">

        {step === 1 && (
          <BasicInformation
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 2 && (
          <ProfessionalInformation
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 3 && (
          <ServicesInformation
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 4 && (
          <DocumentsInformation
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 5 && (
          <AvailabilityInformation
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 6 && (
          <ReviewInformation
            formData={formData}
          />
        )}

        {step === 7 && (
          <SuccessInformation />
        )}

        {step <= 6 && (

          <div className="mt-10 flex items-center justify-between">

            <button
              onClick={prevStep}
              disabled={step === 1}
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ← Back
            </button>

            {step < 6 ? (

              <button
                onClick={nextStep}
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Next →
              </button>

            ) : (

              <button
                onClick={handleSubmit}
                className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
              >
                Submit Application
              </button>

            )}

          </div>

        )}

      </section>

    </main>

  );

};

export default BecomeProviderPage;