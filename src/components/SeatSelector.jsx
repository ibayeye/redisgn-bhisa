import React from "react";

const SeatSelector = ({ maxSeats, selectedSeats, takenSeats, onToggle }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {Array.from({ length: 14 }, (_, idx) => {
          const seatNo = idx + 1;
          const isSelected = selectedSeats.includes(seatNo);
          const isTaken = takenSeats.includes(seatNo);

          return (
            <button
              key={seatNo}
              disabled={isTaken}
              className={`p-3 border-2 rounded-lg font-semibold transition-all duration-200
                  ${
                    isTaken
                      ? "bg-red-200 border-red-300 text-red-600 cursor-not-allowed"
                      : isSelected
                      ? "bg-blue-500 border-blue-600 text-white shadow-lg"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300"
                  }`}
              onClick={() => onToggle(seatNo)}
            >
              {seatNo}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
          <span>Tersedia</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 border-2 border-blue-600 rounded"></div>
          <span>Dipilih</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-200 border-2 border-red-300 rounded"></div>
          <span>Terisi</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
