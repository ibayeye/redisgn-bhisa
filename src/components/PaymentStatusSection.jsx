import React from "react";
import { FaCheckCircle, FaDownload } from "react-icons/fa";
import Button from "./Button";

const PaymentStatusSection = ({ status, contact, onConfirm, navigate }) => {
  if (status === "success") {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Pembayaran Berhasil!
        </h2>
        <p className="text-gray-600 mb-6">
          E-ticket telah dikirim ke email {contact.email}
        </p>
        <div className="space-y-3">
          <Button
            buttonClassName="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
            text={
              <>
                <FaDownload /> Unduh E-Ticket
              </>
            }
            onClick={() => navigate("/e-ticket")}
          />
          <Button
            buttonClassName="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
            text="Kembali ke Beranda"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    );
  }

  if (status === "paid") {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <h3 className="font-semibold text-blue-800 mb-2">
            Memverifikasi Pembayaran
          </h3>
          <p className="text-blue-600">
            Mohon tunggu, kami sedang mengecek pembayaran Anda...
          </p>
        </div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <Button
        buttonClassName="w-full bg-[#e33320] text-white py-4 text-lg font-semibold rounded-lg hover:bg-[#c22d1a]"
        text="Saya Sudah Transfer"
        onClick={onConfirm}
      />
    );
  }

  return null;
};

export default PaymentStatusSection;
