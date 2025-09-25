import React, { useState } from "react";
import { RiCoinsLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import Button from "./Button";
import { formatRupiah } from "../utils/constant.js";

const Accordion = ({
  id,
  operator,
  origin,
  originAddress,
  destination,
  destinationAddress,
  price,
  points,
  departures,
  onChange,
}) => {
  const [selectedDeparture, setSelectedDeparture] = useState(null);

  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl shadow-sm">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title font-semibold text-lg">{operator}</div>

      <div className="collapse-content flex flex-row items-stretch gap-6">
        <div className="flex flex-col gap-8 relative w-64 justify-between">
          <div className="absolute left-1 top-3 bottom-3 w-[2px] bg-[#e33320]"></div>

          <div className="flex flex-row items-start gap-3">
            <div className="w-6 h-3 rounded-full border-2 border-[#e33320]"></div>
            <div className="flex flex-col">
              <span className="font-medium">{origin}</span>
              {originAddress && (
                <span className="text-xs text-gray-500 leading-snug">
                  {originAddress}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-row items-start gap-3">
            <div className="w-6 h-3 rounded-full bg-[#e33320] mt-14"></div>
            <div className="flex flex-col">
              {destinationAddress && (
                <span className="text-xs text-gray-500 leading-snug">
                  {destinationAddress}
                </span>
              )}
              <span className="font-medium">{destination}</span>
            </div>
          </div>
        </div>

        <div className="w-full text-md flex flex-col gap-3 items-end">
          <div className="flex flex-row gap-2 items-center">
            <span className="font-bold text-xl text-[#e33320]">
              {formatRupiah(price)}
            </span>
            <span className="text-gray-500">/kursi</span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <RiCoinsLine className="text-[#e33320] text-xl" />
            <span className="text-gray-500">
              Dapat <span className="font-semibold text-black">{points}</span>{" "}
              Points
            </span>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-gray-500 font-medium">
              Jadwal Keberangkatan:
            </span>
            <div className="flex flex-wrap gap-2 justify-end">
              {departures.map((time, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedDeparture(time)}
                  className={`px-3 py-1 rounded-full border text-sm cursor-pointer transition-colors duration-200
                    ${
                      selectedDeparture === time
                        ? "bg-[#e33320] text-white border-[#e33320]"
                        : "border-gray-300 hover:bg-[#e33320] hover:text-white"
                    }`}
                >
                  {time}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center cursor-pointer hover:text-[#e33320]">
            <FaWhatsapp className="text-green-600 text-xl" />
            <span className="text-gray-500">Hubungi kami</span>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              buttonClassName="bg-[#e33320] text-white hover:bg-[#c22d1a] px-6 py-2 text-sm rounded-md"
              text="Pilih Jadwal"
              disabled={!selectedDeparture}
              onClick={() =>
                onChange({
                  //   id,
                  //   operator,
                  //   origin,
                  //   destination,
                  //   price,
                  selectedDeparture,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
