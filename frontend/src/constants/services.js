// export const services = [
//   {
//     id: 1,
//     title: "Plumbing Services",
//     provider: "Rahul Sharma",
//     category: "Home Services",
//     location: "Delhi",
//     price: 499,
//     rating: 4.9,
//     reviews: 245,
//     image:
//       "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800",
//   },

//   {
//     id: 2,
//     title: "Electrician",
//     provider: "Amit Kumar",
//     category: "Repairs",
//     location: "Mumbai",
//     price: 699,
//     rating: 4.8,
//     reviews: 180,
//     image:
//       "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800",
//   },

//   {
//     id: 3,
//     title: "Full Stack Developer",
//     provider: "Arjun Mehta",
//     category: "Tech",
//     location: "Bangalore",
//     price: 1200,
//     rating: 5.0,
//     reviews: 320,
//     image:
//       "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
//   },

//   {
//     id: 4,
//     title: "Photographer",
//     provider: "Priya Singh",
//     category: "Photography",
//     location: "Pune",
//     price: 999,
//     rating: 4.7,
//     reviews: 150,
//     image:
//       "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
//   },

//   {
//     id: 5,
//     title: "Fitness Trainer",
//     provider: "Rohit Kapoor",
//     category: "Fitness",
//     location: "Noida",
//     price: 799,
//     rating: 4.9,
//     reviews: 275,
//     image:
//       "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
//   },

//   {
//     id: 6,
//     title: "Math Tutor",
//     provider: "Neha Verma",
//     category: "Education",
//     location: "Kolkata",
//     price: 600,
//     rating: 4.8,
//     reviews: 133,
//     image:
//       "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
//   },
// ];

export const services = [
  {
    id: "1",

    title: "AC Repair",

    category: "Home Services",

    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop",

    description:
      "Our professional AC repair service ensures your air conditioner runs efficiently throughout the year. Our certified technicians diagnose issues, repair faulty components, clean the system, and perform complete performance checks using high-quality tools and genuine spare parts.",

    rating: 4.8,

    reviews: 124,

    price: 799,

    duration: "2 Hours",

    location: "New Delhi",

    includes: [
      "Complete AC inspection",
      "Cooling performance check",
      "Filter cleaning",
      "Gas leakage inspection",
      "Electrical connection check",
      "Minor repairs (if required)",
      "Performance testing",
      "Service report after completion",
    ],

    gallery: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900&auto=format&fit=crop",
    ],

    provider: {
      id: "1",

      name: "Rahul Sharma",

      profession: "AC Technician",

      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&auto=format&fit=crop",

      rating: 4.8,

      location: "New Delhi",
    },

    reviewsData: [
      {
        id: 1,

        name: "Amit Kumar",

        rating: 5,

        date: "2 Days Ago",

        comment:
          "Excellent service. Technician arrived on time and fixed the issue quickly.",
      },

      {
        id: 2,

        name: "Neha Sharma",

        rating: 4.8,

        date: "1 Week Ago",

        comment:
          "Professional work and reasonable pricing. Highly recommended.",
      },
    ],

    faq: [
      {
        question: "How long does the service take?",

        answer:
          "Usually between 1 to 2 hours depending on the issue.",
      },

      {
        question: "Are spare parts included?",

        answer:
          "Minor parts are included. Major replacements are charged separately.",
      },
    ],
  },

 {
  id: "2",

  title: "AC Installation",

  category: "Home Services",

  image:
    "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&auto=format&fit=crop",

  description:
    "Professional AC installation by experienced technicians. We ensure proper mounting, copper pipe fitting, wiring, drainage setup, and performance testing for optimal cooling.",

  rating: 4.9,

  reviews: 186,

  price: 999,

  duration: "3 Hours",

  location: "New Delhi",

  includes: [
    "Indoor & outdoor unit installation",
    "Copper pipe connection",
    "Drain pipe fitting",
    "Electrical wiring check",
    "Performance testing",
    "Safety inspection",
    "Installation report",
  ],

  gallery: [
    "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&auto=format&fit=crop",
  ],

  provider: {
    id: "2",

    name: "Amit Kumar",

    profession: "AC Installation Expert",

    image:
      "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=300&auto=format&fit=crop",

    rating: 4.9,

    location: "New Delhi",
  },

  reviewsData: [
    {
      id: 1,
      name: "Rohit Singh",
      rating: 5,
      date: "3 Days Ago",
      comment:
        "Installation was completed perfectly and everything was cleaned before leaving.",
    },
    {
      id: 2,
      name: "Pooja Sharma",
      rating: 4.8,
      date: "1 Week Ago",
      comment:
        "Professional technician and excellent service.",
    },
  ],

  faq: [
    {
      question: "Do you provide installation materials?",
      answer:
        "Basic installation materials are included. Extra copper pipe is charged separately.",
    },
    {
      question: "How much time does installation take?",
      answer:
        "Usually 2–3 hours depending on the installation location.",
    },
  ],
},

{
  id: "3",

  title: "AC Cleaning",

  category: "Home Services",

  image:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&auto=format&fit=crop",

  description:
    "Deep AC cleaning service including filter wash, indoor unit cleaning, outdoor unit cleaning, and cooling performance inspection.",

  rating: 4.7,

  reviews: 143,

  price: 499,

  duration: "1 Hour",

  location: "New Delhi",

  includes: [
    "Filter cleaning",
    "Indoor unit cleaning",
    "Outdoor unit cleaning",
    "Drain pipe inspection",
    "Cooling efficiency check",
    "Final performance test",
  ],

  gallery: [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&auto=format&fit=crop",
  ],

  provider: {
    id: "3",

    name: "Sandeep Verma",

    profession: "AC Cleaning Specialist",

    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&auto=format&fit=crop",

    rating: 4.7,

    location: "New Delhi",
  },

  reviewsData: [
    {
      id: 1,
      name: "Neha Gupta",
      rating: 5,
      date: "Yesterday",
      comment:
        "AC is cooling much better after the cleaning service.",
    },
    {
      id: 2,
      name: "Akash Jain",
      rating: 4.6,
      date: "4 Days Ago",
      comment:
        "Good service and arrived on time.",
    },
  ],

  faq: [
    {
      question: "How often should AC cleaning be done?",
      answer:
        "Every 3–6 months for best cooling performance.",
    },
    {
      question: "Will cleaning improve cooling?",
      answer:
        "Yes, regular cleaning improves airflow and cooling efficiency.",
    },
  ],
},
];
