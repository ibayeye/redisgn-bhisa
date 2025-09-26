import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import {
  formatRupiah,
  maskNumber,
  copyToClipboard,
} from "../utils/constant.js";

const ActivePaymentPanel = ({
  activeMethod,
  paymentMethods,
  showAccountNumber,
  setShowAccountNumber,
  copiedField,
  setCopiedField,
  totalBayar,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6">
      <h4 className="font-semibold text-gray-800 mb-4 text-lg md:text-xl">
        Detail {paymentMethods[activeMethod].name}
      </h4>

      {activeMethod === "transfer" && (
        <div className="grid gap-4 md:grid-cols-2">
          {paymentMethods.transfer.accounts.map((account, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-4 border border-gray-300"
            >
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="font-medium text-base md:text-lg">
                  {account.bank}
                </span>
                <button
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm md:text-base"
                  onClick={() =>
                    copyToClipboard(
                      account.account,
                      setCopiedField,
                      `transfer-${idx}`
                    )
                  }
                >
                  <MdContentCopy />
                  <span>
                    {copiedField === `transfer-${idx}` ? "Tersalin!" : "Salin"}
                  </span>
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Nomor Rekening:</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base md:text-lg break-all">
                    {maskNumber(account.account, showAccountNumber)}
                  </span>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowAccountNumber(!showAccountNumber)}
                    aria-label={
                      showAccountNumber
                        ? "Sembunyikan nomor"
                        : "Tampilkan nomor"
                    }
                  >
                    {showAccountNumber ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="text-sm text-gray-600">a.n. {account.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeMethod === "qris" && (
        <div className="text-center">
          <div className="bg-white p-4 rounded-lg inline-block mb-4">
            <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 text-sm sm:text-base">
                QR Code
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Scan QR Code dengan aplikasi e-wallet atau mobile banking
          </p>
        </div>
      )}

      {activeMethod === "va" && (
        <div className="grid gap-4 md:grid-cols-2">
          {paymentMethods.va.accounts.map((va, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="font-medium text-base md:text-lg">
                  VA {va.bank}
                </span>
                <button
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm md:text-base"
                  onClick={() =>
                    copyToClipboard(va.va, setCopiedField, `va-${idx}`)
                  }
                >
                  <MdContentCopy />
                  <span>
                    {copiedField === `va-${idx}` ? "Tersalin!" : "Salin"}
                  </span>
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Nomor Virtual Account:</p>
                <span className="font-mono text-base md:text-lg break-all">
                  {va.va}
                </span>
                <p className="text-xs text-gray-500">Kode Bank: {va.code}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-lg p-4 border-2 border-[#e33320] mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="font-medium text-base md:text-lg">
            Total Pembayaran:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl md:text-2xl font-bold text-[#e33320]">
              {formatRupiah(totalBayar)}
            </span>
            <button
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm md:text-base"
              onClick={() =>
                copyToClipboard(totalBayar.toString(), setCopiedField, "total")
              }
            >
              <MdContentCopy />
              <span>{copiedField === "total" ? "Tersalin!" : "Salin"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivePaymentPanel;
