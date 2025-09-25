import React from "react";
import Card from "../components/Card";
import data from "../../public/data/whyus.json";

const SectionWhyUs = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-semibold text-neutral mb-4">Why Us?</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.data.map((image, index) => (
          <Card
            key={index}
            src={image.src}
            alt={image.alt}
            title={image.title}
            objectFit="cover"
            sizeText={"text-lg"}
            height={"h-8"}
            variant="simple"
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWhyUs;
