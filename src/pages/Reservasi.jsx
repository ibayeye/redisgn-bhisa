import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Fieldset from "../components/Fieldset";
import Alert from "../components/Alert";
import schedulesData from "../data/shuttles.json";
import { BsTicketPerforated } from "react-icons/bs";
import TravelSummary from "../components/TravelSummary";
import { formatRupiah } from "../utils/constant.js";
import { useCountdown } from "../hooks/useCountdown.js";
import SeatSelector from "../components/SeatSelector.jsx";
import { useFormValidation } from "../hooks/useFormValidation.js";
import SKModal from "../components/SKModal.jsx";
import FormPemesan from "../components/FormPemesan.jsx";
import { useCoupon } from "../utils/useCoupon.js";
import { useBookingValidation } from "../utils/useBookingValidation.js";
import { useAlert } from "../hooks/useAlert.js";
import Skeleton from "../components/Skeleton.jsx";
import FormPenumpangList from "../components/FormPenumpangList.jsx";

const Reservasi = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  const [jadwal, setJadwal] = useState(null);
  const [maxSeats, setMaxSeats] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [kupon, setKupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const { alertState, showAlert, closeAlert } = useAlert();

  const { timeLeft, formatTime } = useCountdown(600, () =>
    showAlert("Waktu reservasi telah habis!")
  );

  const { validateNama, validateEmail, validateWhatsApp } = useFormValidation();
  const { applyCoupon } = useCoupon(jadwal, selectedSeats, showAlert);

  const [formPemesan, setFormPemesan] = useState({
    nama: { value: "", error: "", valid: false },
    email: { value: "", error: "", valid: false },
    whatsapp: { value: "", error: "", valid: false },
    penumpang: selectedSeats.map(() => ({
      value: "",
      error: "",
      valid: false,
    })),
  });

  const { isValid, getErrors } = useBookingValidation(
    formPemesan,
    selectedSeats,
    agreeTerms,
    timeLeft
  );
  const allValid = isValid;

  const [takenSeats] = useState([3, 7, 11]);

  useEffect(() => {
    if (state?.jumlahKursi) {
      setMaxSeats(Number(state.jumlahKursi));
    }
    if (id) {
      const found = schedulesData.schedules.find((s) => s.id === id);
      setJadwal(found || null);
    }
  }, [id, state]);

  useEffect(() => {
    if (maxSeats > 0) {
      setFormPemesan((prev) => ({
        ...prev,
        penumpang: Array.from({ length: maxSeats }, (_, i) => ({
          value: "",
          error: "",
          valid: false,
        })),
      }));
    }
  }, [maxSeats]);

  const handlePassengerChange = (index, newValue) => {
    const { error, valid } = validateNama(newValue);
    setFormPemesan((prev) => {
      const newPenumpang = [...prev.penumpang];
      newPenumpang[index] = { value: newValue, error, valid };
      return { ...prev, penumpang: newPenumpang };
    });
  };

  const handleSeatToggle = useCallback(
    (seatNo) => {
      if (takenSeats.includes(seatNo)) {
        showAlert(`Kursi ${seatNo} sudah dipesan oleh penumpang lain`);
        return;
      }
      if (selectedSeats.includes(seatNo)) {
        setSelectedSeats((prev) => prev.filter((s) => s !== seatNo));
      } else {
        if (selectedSeats.length >= maxSeats) {
          showAlert(`Anda hanya bisa memilih ${maxSeats} kursi`);
          return;
        }
        setSelectedSeats((prev) => [...prev, seatNo]);
      }
    },
    [takenSeats, selectedSeats, maxSeats, showAlert]
  );

  const handleKuponApply = useCallback(() => {
    const { discount: finalDiscount } = applyCoupon(kupon);
    setDiscount(finalDiscount);
  }, [kupon, applyCoupon]);

  const bookingTotal = useMemo(() => {
    if (!jadwal) return 0;
    return jadwal.price * selectedSeats.length - discount;
  }, [jadwal, selectedSeats, discount]);

  const handleKonfirmasi = () => {
    if (!jadwal) return showAlert("Data jadwal tidak ditemukan");
    if (timeLeft <= 0) return showAlert("Waktu reservasi telah habis");
    if (selectedSeats.length === 0) return showAlert("Silakan pilih kursi");
    if (!formPemesan.nama.valid)
      return showAlert("Nama tidak valid: " + formPemesan.nama.error);
    if (!formPemesan.email.valid)
      return showAlert("Email tidak valid: " + formPemesan.email.error);
    if (!formPemesan.whatsapp.valid)
      return showAlert("WhatsApp tidak valid: " + formPemesan.whatsapp.error);
    if (!agreeTerms)
      return showAlert("Anda harus menyetujui syarat dan ketentuan");

    const bookingData = {
      scheduleId: jadwal.id,
      seats: selectedSeats.join(","),
      total: bookingTotal,
      passengers: [
        formPemesan.nama.value,
        ...formPemesan.penumpang.slice(1).map((p) => p.value),
      ],
      contact: {
        email: formPemesan.email.value,
        whatsapp: formPemesan.whatsapp.value,
      },
      discount,
    };

    navigate("/pembayaran", { state: bookingData });
  };

  if (!jadwal) {
    return (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <Skeleton className="h-6 w-40 mb-4" />
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-28 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <Skeleton className="h-8 w-48 mb-6" />
                <Skeleton className="h-6 w-40 mb-4" />
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-10 w-full mb-8" />
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="grid grid-cols-4 gap-2 mb-8">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
                <Skeleton className="h-6 w-40 mb-4" />
                <Skeleton className="h-10 w-2/3 mb-8" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>

        {alertState.show && (
          <Alert
            label={alertState.message}
            onClose={closeAlert}
            autoClose={true}
            duration={3000}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-gradient-to-br from-[#e33320] to-[#c22d1a] rounded-lg p-6 text-white shadow-lg">
                <h2 className="text-xl font-bold mb-4">Ringkasan Perjalanan</h2>
                <TravelSummary
                  jadwal={jadwal}
                  state={state}
                  timeLeft={timeLeft}
                  maxSeats={maxSeats}
                  selectedSeats={selectedSeats}
                  discount={discount}
                  formatRupiah={formatRupiah}
                  formatTime={formatTime}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Form Reservasi
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Data Pemesan
                </h3>
                <FormPemesan
                  formPemesan={formPemesan}
                  setFormPemesan={setFormPemesan}
                  validators={{ validateNama, validateEmail, validateWhatsApp }}
                />
              </div>

              <FormPenumpangList
                formPemesan={formPemesan}
                setFormPemesan={setFormPemesan}
                validators={{ validateNama }}
                selectedSeats={selectedSeats}
              />

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Pilih Kursi ({selectedSeats.length}/{maxSeats})
                </h3>
                <SeatSelector
                  maxSeats={maxSeats}
                  selectedSeats={selectedSeats}
                  takenSeats={takenSeats}
                  onToggle={handleSeatToggle}
                />
              </div>

              <div className="mb-8">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Fieldset
                      label="Kode Kupon"
                      placeholder="Masukkan kode kupon (contoh: BHISA10)"
                      labelClassName="text-lg font-semibold text-gray-800"
                      inputClassName="border rounded-md p-3 w-full"
                      value={kupon}
                      onChange={(e) => setKupon(e.target.value)}
                      icon={
                        <BsTicketPerforated className="text-[#e33320] text-2xl" />
                      }
                    />
                  </div>
                  <div className="flex items-end py-1">
                    <Button
                      buttonClassName="bg-[#e33320] text-white rounded-md hover:bg-[#c22d1a] transition-colors"
                      text="Terapkan"
                      onClick={handleKuponApply}
                      disabled={!kupon.trim() || selectedSeats.length === 0}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Kupon tersedia: BHISA10 (10%), NEWUSER (15%), PROMO20 (20%)
                </p>
              </div>

              <div className="mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 text-[#e33320] rounded border-2 border-gray-300 focus:ring-[#e33320]"
                    />
                    <div className="flex-1">
                      <span className="text-gray-700">
                        Saya setuju dengan{" "}
                        <button
                          type="button"
                          className="text-[#e33320] font-semibold hover:underline"
                          onClick={() => setShowTerms(true)}
                        >
                          Syarat & Ketentuan
                        </button>
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        Dengan mencentang kotak ini, Anda menyetujui kebijakan
                        pembatalan, ketentuan pembayaran, dan syarat perjalanan
                        kami.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  buttonClassName={`w-full py-4 text-lg font-semibold rounded-lg transition-all duration-200 ${
                    allValid
                      ? "bg-[#e33320] text-white hover:bg-[#c22d1a] shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  text={`Konfirmasi Booking - ${formatRupiah(bookingTotal)}`}
                  onClick={handleKonfirmasi}
                  disabled={!allValid}
                />

                {!allValid && (
                  <div className="text-center text-sm text-gray-500">
                    {getErrors().map((err, i) => (
                      <div key={i}>• {err}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {alertState.show && (
        <Alert
          label={alertState.message}
          onClose={closeAlert}
          autoClose={true}
          duration={3000}
        />
      )}

      {showTerms && <SKModal onClose={() => setShowTerms(false)} />}
    </div>
  );
};

export default Reservasi;
