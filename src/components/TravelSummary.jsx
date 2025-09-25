import React from "react";
import { FaClock, FaMapMarkerAlt, FaMapMarkedAlt } from "react-icons/fa";

const TravelSummary = ({
  jadwal,
  state,
  timeLeft,
  maxSeats,
  selectedSeats,
  discount,
  formatRupiah,
  formatTime,
}) => {
  if (!jadwal) return null;

  return (
    <div>
      <div className="bg-white/20 rounded-lg p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaClock className="text-yellow-300" />
          <span className="text-sm">Waktu tersisa:</span>
        </div>
        <div className="text-lg font-bold text-yellow-300">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold">{jadwal.operator}</h3>
          <p className="text-white/90">
            {state?.tanggal
              ? new Date(state.tanggal).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "-"}{" "}
            {state?.departure || "00:00"} WIB
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div>
              <FaMapMarkerAlt className="text-xl mt-1 text-green-300" />
            </div>
            <div>
              <p className="font-bold">{jadwal.origin}</p>
              <p className="text-sm text-white/80">
                {state?.originAddress || "Point keberangkatan"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div>
              <FaMapMarkedAlt className="text-xl mt-1 text-red-300" />
            </div>
            <div>
              <p className="font-bold">{jadwal.destination}</p>
              <p className="text-sm text-white/80">
                {state?.destinationAddress || "Point tujuan"}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Kursi dipesan:</span>
            <span className="font-bold">{maxSeats}</span>
          </div>
          <div className="flex justify-between">
            <span>Harga per kursi:</span>
            <span className="font-bold">{formatRupiah(jadwal.price)}</span>
          </div>
          <div className="flex justify-between">
            <span>Kursi terpilih:</span>
            <span className="font-bold">
              {selectedSeats.length > 0 ? selectedSeats.join(", ") : "-"}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-300">
              <span>Diskon:</span>
              <span className="font-bold">{formatRupiah(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-xl font-bold border-t border-white/20 pt-2">
            <span>Total:</span>
            <span>
              {formatRupiah(jadwal.price * selectedSeats.length - discount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelSummary;
