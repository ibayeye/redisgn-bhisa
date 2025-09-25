import React from "react";
import data from "../data/partnership.json";

const SectionPartnership = () => {
  return (
    <div className="">
      <h1 className="text-lg font-semibold text-neutral mb-6 px-16">
        Our Partnership
      </h1>

      <div className="relative overflow-hidden">
        <div className="flex animate-marquee-right gap-8 w-max">
          {data.data.map((image, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 w-28 h-16 flex items-center justify-center"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}

          {data.data.map((image, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 w-28 h-16 flex items-center justify-center"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionPartnership;
