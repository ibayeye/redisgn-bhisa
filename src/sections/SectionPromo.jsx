import React from "react";
import Card from "../components/Card";
import data from "../../public/data/promo.json";

const SectionPromo = () => {

  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-semibold text-neutral mb-4">Spesial Promo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.data.map((image, index) => (
          <Card
            key={index}
            src={image.src}
            alt={image.alt}
            title={image.title}
            description={image.description}
            price={image.price}
            type={image.type}
            sizeText={"text-sm"}
            height={"h-8"}
            center="text-left"
            objectFit="contain"
          />
        ))}
      </div>
    </div>
  );
};

export default SectionPromo;
