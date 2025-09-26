import React, { useState } from "react";
import data from "../data/pointarea.json";

const SectionWilayah = () => {
  const [open, setOpen] = useState(null);
  const [tab, setTab] = useState("PointBandung");

  const wilayah = {
    PointBandung: "Bandung",
    PointJadetabek: "Jadetabek",
    PointJawaTengah: "Jawa Tengah",
    PointCiayumajakuning: "Ciayumajakuning",
    PointSukabumiGarut: "Sukabumi & Garut",
  };

  const toggleAccordion = (key) => {
    setOpen(open === key ? null : key);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl font-bold mb-4">Pilih Wilayah</h1>

      <div className="sm:hidden space-y-2">
        {Object.keys(wilayah).map((key) => (
          <div key={key} className="border rounded-md">
            <button
              onClick={() => toggleAccordion(key)}
              className="w-full flex justify-between items-center px-4 py-2 text-left font-semibold"
            >
              {wilayah[key]}
              <span>{open === key ? "−" : "+"}</span>
            </button>
            {open === key && (
              <div className="grid grid-cols-3 gap-4 p-4 border-t">
                {data[key].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center gap-2"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <span className="text-sm">{item.alt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="hidden sm:block lg:hidden">
        <div className="flex gap-4 mb-4 overflow-x-auto">
          {Object.keys(wilayah).map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 whitespace-nowrap ${
                tab === key ? "border-b-2 border-[#e33320] font-semibold" : ""
              }`}
            >
              {wilayah[key]}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {data[tab].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-2"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-20 h-20 object-cover rounded-full"
              />
              <span className="text-sm">{item.alt}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-12 gap-4">
        {Object.keys(wilayah).map((key) => (
          <div
            key={key}
            className="col-span-3 p-4 bg-white rounded-md shadow-md"
          >
            <h2 className="font-semibold mb-2 text-center">{wilayah[key]}</h2>
            <div className="grid grid-cols-2 gap-3">
              {data[key].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center gap-2 cursor-pointer hover:transform hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <span className="text-sm">{item.alt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWilayah;
