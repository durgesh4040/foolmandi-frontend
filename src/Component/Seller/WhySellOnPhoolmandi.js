import React from "react";

const benefits = [
  {
    title: "Nationwide Reach",
    description:
      "Convert your local flower shop to an online shop and reach customers across India",
    icon: "🌐",
  },
  {
    title: "Zero Setup Cost",
    description: "Transition your offline shop to an online platform for free",
    icon: "💵",
  },
  {
    title: "Showcase Your Work",
    description:
      "Decorators can showcase their floral decorations and activities",
    icon: "🌸",
  },
  {
    title: "Seller Managed Delivery",
    description:
      "Manage deliveries yourself to ensure your products reach customers fresh",
    icon: "🚚",
  },
  {
    title: "Local to National",
    description:
      "Expand your local flower shop to become an Indian flower shop",
    icon: "🏪",
  },
  {
    title: "Easy Online Management",
    description:
      "Manage your shop online with our simple and user-friendly interface",
    icon: "💻",
  },
  {
    title: "Flexible Payment Methods",
    description:
      "Handle all payments as per your convenience without needing a dedicated app",
    icon: "💳",
  },
  {
    title: "Free Online Presence",
    description:
      "Get your shop online without any costs and attract more customers",
    icon: "🌟",
  },
];

const WhySellOnPhoolmandi = () => {
  return (
    <div className="bg-gray-100 p-10 mt-20">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Why Convert Your Local Flower Shop to an Online Store with Phoolmandi?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
          >
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhySellOnPhoolmandi;
