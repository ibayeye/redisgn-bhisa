import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://bhisa.sgp1.cdn.digitaloceanspaces.com/2025/04/25/680b5da4b0fbb-phpGO5ZqC",
    "https://bhisa.id/uploads/headbnerbhis01.jpg",
    "https://bhisa.sgp1.cdn.digitaloceanspaces.com/2025/04/14/67fc935f58758-php8CyF5m",
    "https://bhisa.id/uploads/headbnerbhis03.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg">
      <div className="relative h-96">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={handlePrev}
          className="btn btn-circle bg-black/50 hover:bg-[#e33320] text-white border-none"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="btn btn-circle bg-black/50 hover:bg-[#e33320] text-white border-none"
        >
          ❯
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
