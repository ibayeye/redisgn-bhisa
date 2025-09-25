import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaDownload } from "react-icons/fa";
import Button from "../components/Button";
import paymentMethods from "../data/paymentsmethods.json";
import PaymentTutorial from "../components/PaymentTutorial";
import InvoiceSummary from "../components/InvoiceSummary";
import PaymentMethods from "../components/PaymentMethods";
import CountdownTimer from "../components/CountdownTimer";
import PaymentStatusSection from "../components/PaymentStatusSection";
import { ADMIN_FEES, PAYMENT_STATUS } from "../utils/constant";
import { usePaymentStatus } from "../hooks/usePaymentStatus";
import ActivePaymentPanel from "../components/ActivePaymentPanel";
import PaymentSuccess from "../components/PaymentSuccess";

const Pembayaran = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  console.log(state);

  const { scheduleId, seats, total, passengers, contact, discount } = state;

  const [activeMethod, setActiveMethod] = useState("transfer");
  const [countdown, setCountdown] = useState(900); // 15 menit
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  // ✅ pakai custom hook untuk status pembayaran
  const { status: paymentStatus, confirmPayment } = usePaymentStatus();

  // Countdown timer jalan hanya kalau masih pending
  useEffect(() => {
    if (paymentStatus === PAYMENT_STATUS.PENDING && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [paymentStatus, countdown]);

  const adminFee = useMemo(() => ADMIN_FEES[activeMethod] || 0, [activeMethod]);
  const totalBayar = total - discount + adminFee;

  if (paymentStatus === PAYMENT_STATUS.SUCCESS) {
    return <PaymentSuccess email={contact.email} navigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Pembayaran
              </h1>

              {/* Countdown Timer */}
              <CountdownTimer countdown={countdown} />

              {/* Payment Methods */}
              <PaymentMethods
                activeMethod={activeMethod}
                setActiveMethod={setActiveMethod}
                paymentMethods={paymentMethods}
              />

              {/* Active Payment Method Panel */}
              <ActivePaymentPanel
                activeMethod={activeMethod}
                paymentMethods={paymentMethods}
                showAccountNumber={showAccountNumber}
                setShowAccountNumber={setShowAccountNumber}
                copiedField={copiedField}
                setCopiedField={setCopiedField}
                totalBayar={totalBayar}
              />

              {/* Tutorial */}
              <PaymentTutorial
                paymentMethods={paymentMethods}
                activeMethod={activeMethod}
              />

              {/* Status + Action */}
              <PaymentStatusSection
                status={paymentStatus}
                contact={contact}
                onConfirm={confirmPayment} // ✅ pakai hook
                navigate={navigate}
              />
            </div>
          </div>

          {/* Ringkasan Tagihan */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <InvoiceSummary
                scheduleId={scheduleId}
                seats={seats}
                passengers={passengers}
                contact={contact}
                total={total}
                discount={discount}
                adminFee={adminFee}
                totalBayar={totalBayar}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pembayaran;
