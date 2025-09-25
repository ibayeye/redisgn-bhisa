import React, { useState } from "react";
import { formatRupiah } from "../utils/constant.js";

const SidebarFilter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [operators, setOperators] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [sort, setSort] = useState("termurah");

  const handleOperatorChange = (operator) => {
    setOperators((prev) =>
      prev.includes(operator)
        ? prev.filter((o) => o !== operator)
        : [...prev, operator]
    );
  };

  const handleTimeChange = (slot) => {
    setTimeSlots((prev) =>
      prev.includes(slot) ? prev.filter((t) => t !== slot) : [...prev, slot]
    );
  };

  const applyFilter = () => {
    onFilterChange({ priceRange, operators, timeSlots, sort });
  };

  const operator = ["Primajasa", "TravelX", "ShuttleKu", "Blue Shuttle"];
  const jam = ["Pagi (05:00-11:59)", "Siang (12:00-17:59)", "Malam (18:00-23:59)"];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full h-full flex flex-col gap-6">
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Harga</h3>
        <input
          type="range"
          min="0"
          max="1000000"
          step="50000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
          className="w-full"
        />
        <p className="text-sm text-gray-600 mt-1">
          Maksimal: {formatRupiah(priceRange[1])}
        </p>
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-2">Operator</h3>
        {operator.map((op) => (
          <label key={op} className="flex items-center gap-2 text-sm mb-1">
            <input
              type="checkbox"
              checked={operators.includes(op)}
              onChange={() => handleOperatorChange(op)}
            />
            {op}
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-2">Jam Keberangkatan</h3>
        {jam.map((slot) => (
          <label key={slot} className="flex items-center gap-2 text-sm mb-1">
            <input
              type="checkbox"
              checked={timeSlots.includes(slot)}
              onChange={() => handleTimeChange(slot)}
            />
            {slot}
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-2">Urutkan</h3>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-md p-2 w-full"
        >
          <option value="termurah">Harga Termurah</option>
          <option value="tercepat">Keberangkatan Tercepat</option>
          <option value="durasi">Durasi Terpendek</option>
        </select>
      </div>

      <button
        onClick={applyFilter}
        className="bg-[#e33320] text-white py-2 px-4 rounded-md hover:bg-[#c22d1a] transition-colors cursor-pointer"
      >
        Terapkan
      </button>
    </div>
  );
};

export default SidebarFilter;
