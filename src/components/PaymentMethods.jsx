import React from "react";

const PaymentMethods = ({ activeMethod, setActiveMethod, paymentMethods }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Pilih Metode Pembayaran
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(paymentMethods).map(([key, method]) => (
          <button
            key={key}
            className={`border-2 rounded-lg p-4 transition-all ${
              activeMethod === key
                ? "border-[#e33320] bg-red-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setActiveMethod(key)}
          >
            <div className="text-center">
              <span
                className={`font-medium ${
                  activeMethod === key ? "text-[#e33320]" : "text-gray-700"
                }`}
              >
                {method.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
