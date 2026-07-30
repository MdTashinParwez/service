import { useState } from "react";

const professions = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Cleaner",
  "AC Technician",
  "Photographer",
  "Fitness Trainer",
  "Teacher",
  "Full Stack Developer",
];

const categories = [
  "Home Services",
  "IT Services",
  "Education",
  "Health & Wellness",
  "Automobile",
  "Beauty",
  "Photography",
  "Events",
];

const ProfessionalInformation = ({
  formData,
  setFormData,
}) => {
  const [skill, setSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = () => {
    const value = skill.trim();

    if (!value) return;

    if (formData.skills.includes(value)) return;

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, value],
    }));

    setSkill("");
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold">
        Professional Information
      </h2>

      <p className="mt-2 text-gray-600">
        Tell customers about your profession and expertise.
      </p>

      <div className="mt-8 space-y-6">

        {/* Business Name */}

        <div>
          <label className="mb-2 block font-medium">
            Business Name
          </label>

          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter your business name"
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
          />
        </div>

        {/* Profession */}

        <div>
          <label className="mb-2 block font-medium">
            Profession
          </label>

          <select
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
          >
            <option value="">
              Select Profession
            </option>

            {professions.map((profession) => (
              <option
                key={profession}
                value={profession}
              >
                {profession}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}

        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}

        <div>
          <label className="mb-2 block font-medium">
            Experience
          </label>

          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Example: 5 Years"
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
          />
        </div>

        {/* About */}

        <div>
          <label className="mb-2 block font-medium">
            About Yourself
          </label>

          <textarea
            rows={5}
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Tell customers about your experience and expertise..."
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-600"
          />
        </div>

        {/* Skills */}

        <div>
          <label className="mb-2 block font-medium">
            Skills
          </label>

          <div className="flex gap-3">
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Enter a skill"
              className="h-12 flex-1 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
            />

            <button
              type="button"
              onClick={addSkill}
              className="rounded-xl bg-blue-600 px-6 text-white transition hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {formData.skills.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {formData.skills.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700"
                >
                  <span>{item}</span>

                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="font-bold text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ProfessionalInformation;