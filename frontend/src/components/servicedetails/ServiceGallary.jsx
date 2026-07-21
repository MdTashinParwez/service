import { useState } from "react";

const ServiceGallery = ({ images = [] }) => {
  const [activeImage, setActiveImage] = useState(0);

  // Fallback image
  const gallery =
    images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200",
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200",
          "https://images.unsplash.com/photo-1521207418485-99c705420785?w=1200",
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200",
        ];

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <div className="overflow-hidden rounded-2xl border bg-white">
        <img
          src={gallery[activeImage]}
          alt="Service"
          className="h-[450px] w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {gallery.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`overflow-hidden rounded-xl border-2 transition ${
              activeImage === index
                ? "border-blue-600"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`Preview ${index + 1}`}
              className="h-24 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceGallery;