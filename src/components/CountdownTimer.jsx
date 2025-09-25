import React from "react";
import { FaClock } from "react-icons/fa";

const CountdownTimer = ({ countdown }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6"
      role="alert"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaClock className="text-orange-500" aria-hidden="true" />
          <div>
            <h3 className="font-semibold text-orange-800">
              Waktu Pembayaran Tersisa
            </h3>
            <p className="text-sm text-orange-600">
              Selesaikan sebelum waktu habis
            </p>
          </div>
        </div>
        <div className="text-2xl font-bold text-orange-500" aria-live="polite">
          {formatTime(countdown)}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
