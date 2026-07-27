import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

const ProviderContactCard = ({ provider }) => {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900">
        Contact Information
      </h2>

      <p className="mt-3 text-gray-600">
        Reach out to the provider for any service-related questions.
      </p>

      <div className="mt-8 space-y-5">

        {/* Phone */}

        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-100 p-3">
            <Phone className="text-blue-600" size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-semibold text-gray-900">
              {provider?.phone || "Not available"}
            </p>
          </div>
        </div>

        {/* Email */}

        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-100 p-3">
            <Mail className="text-blue-600" size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-semibold text-gray-900 break-all">
              {provider?.email || "Not available"}
            </p>
          </div>
        </div>

        {/* Location */}

        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-100 p-3">
            <MapPin className="text-blue-600" size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Location
            </p>

            <p className="font-semibold text-gray-900">
              {provider?.location || "Not available"}
            </p>
          </div>
        </div>

      </div>

      <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
        <MessageCircle size={18} />
        Send Message
      </button>

    </section>
  );
};

export default ProviderContactCard;