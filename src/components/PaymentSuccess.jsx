import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Button from "./Button";
import eticket from "../assets/e-ticket.jpg";

const PaymentSuccess = ({ email, navigate }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = eticket;
    link.download = "E-Ticket.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pembayaran Berhasil!
          </h2>
          <p className="text-gray-600 mb-6">
            E-ticket telah dikirim ke email{" "}
            <span className="font-medium">{email}</span>
          </p>
          <div className="space-y-3">
            <Button
              buttonClassName="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
              text="Unduh E-Ticket"
              onClick={handleDownload}
            />
            <Button
              buttonClassName="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
              text="Kembali ke Beranda"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
