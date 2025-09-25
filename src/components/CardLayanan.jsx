import React from "react";
import { Link } from "react-router-dom";

const CardLayanan = () => {
  const images = [
    {
      url: "https://bhisa.id/img/logo-bhisa/hiace.png",
      name: "Shuttle",
      alt: "Shuttle",
      to: "/pencarian",
    },
    {
      url: "https://bhisa.id/img/logo-bhisa/kirim.png",
      name: "Kirim Paket",
      alt: "Kirim Paket",
      to: "/pencarian",
    },
    {
      url: "https://bhisa.id/img/logo-bhisa/bus.png",
      name: "Bus AKAP",
      alt: "Bus AKAP",
      to: "/pencarian",
    },
    {
      url: "https://bhisa.id/img/logo-bhisa/hiacenbus.png",
      name: "Sewa Armada",
      alt: "Sewa Armada",
      to: "/pencarian",
    },
  ];

  return (
    <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 bg-white grid grid-cols-4 gap-4 p-4 rounded-lg shadow-md">
      {images.map((image, index) => (
        <Link
          key={index}
          to={image.to}
          className="cursor-pointer hover:transform hover:scale-105 transition-transform duration-200"
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-54 h-36 object-fill"
          />
          <p className="text-center">{image.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default CardLayanan;
