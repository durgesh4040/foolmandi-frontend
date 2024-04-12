import React, { useState } from "react";
import { useEffect } from "react";

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 3000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [activeIndex, images.length]);

  return (
    <div className="relative w-full max-w-screen-lg h-64 mx-auto overflow-hidden rounded-lg shadow-lg m-3 bg-green-50">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 hover:bg-opacity-70 focus:outline-none"
        onClick={goToPrevSlide}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 hover:bg-opacity-70 focus:outline-none"
        onClick={goToNextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
