import React from "react";
import { IoWarning } from "react-icons/io5";
import { formatRupiah } from "../utils/constant.js";

const InvoiceSummary = ({
  scheduleId,
  seats,
  passengers,
  contact,
  total,
  discount,
  adminFee,
  totalBayar,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Ringkasan Tagihan
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Detail Perjalanan</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              Booking ID: <span className="font-mono">{scheduleId}</span>
            </p>
            <p>
              Kursi: <span className="font-medium">{seats}</span>
            </p>
            <p>
              Penumpang:{" "}
              <span className="font-medium">{passengers.length} orang</span>
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-2">Kontak</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              Email: <span className="font-medium">{contact.email}</span>
            </p>
            <p>
              WhatsApp: <span className="font-medium">{contact.whatsapp}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal Tiket</span>
          <span>{formatRupiah(total + discount)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Diskon</span>
            <span>-{formatRupiah(discount)}</span>
          </div>
        )}
        {adminFee > 0 && (
          <div className="flex justify-between text-sm">
            <span>Biaya Admin</span>
            <span>{formatRupiah(adminFee)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total Bayar</span>
          <span className="text-[#e33320]">{formatRupiah(totalBayar)}</span>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-6">
        <div className="flex items-start gap-2">
          <IoWarning className="text-yellow-500 text-lg mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium">Penting!</p>
            <p>
              Transfer sesuai nominal exact. E-ticket dikirim setelah pembayaran
              dikonfirmasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummary;
