import React from "react";
import Button from "./Button";

const SKModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500/50  flex items-center justify-center z-500 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Syarat & Ketentuan</h3>
          <div className="prose text-sm text-gray-700 space-y-3">
            <p>1. Penumpang wajib hadir 15 menit sebelum keberangkatan.</p>
            <p>
              2. Pembatalan dapat dilakukan maksimal 2 jam sebelum
              keberangkatan.
            </p>
            <p>
              3. Refund akan diproses dalam 3-5 hari kerja untuk pembatalan yang
              memenuhi syarat.
            </p>
            <p>4. Penumpang wajib membawa identitas diri yang sah.</p>
            <p>5. Bagasi maksimal 20kg per penumpang.</p>
            <p>
              6. Dilarang membawa barang berbahaya dan menyimpan makanan berbau
              menyengat.
            </p>
            <p>7. Anak di bawah 2 tahun gratis tanpa tempat duduk terpisah.</p>
            <p>
              8. Perusahaan tidak bertanggung jawab atas kehilangan barang
              pribadi.
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              buttonClassName="bg-[#e33320] text-white px-6 py-2 rounded-md"
              text="Tutup"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SKModal;
