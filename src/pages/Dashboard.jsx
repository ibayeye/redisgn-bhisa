import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpeg";
import CardLayanan from "../components/CardLayanan";
import Fieldset from "../components/Fieldset";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { LuBus } from "react-icons/lu";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import SectionMembership from "../sections/SectionMembership";
import SectionPromo from "../sections/SectionPromo";
import SectionWhyUs from "../sections/SectionWhyUs";
import SectionPartnership from "../sections/SectionPartnership";
import SectionLocation from "../sections/SectionLocation";
import data from "../../public/data/shuttles.json";
import Alert from "../components/Alert";

const Dashboard = () => {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  const asalOptions = data.PointKeberangkatan;
  const tujuanOptions = data.PointTujuan;

  console.log(asalOptions, tujuanOptions);

  const [asal, setAsal] = useState(null);
  const [tujuan, setTujuan] = useState(null);
  const [tanggal, setTanggal] = useState("");
  const [error, setError] = useState("");

  const handleAsalChange = (val) => {
    if (val === tujuan) {
      setError("Asal dan tujuan tidak boleh sama!");
    } else {
      setError("");
    }
    setAsal(val);
  };

  const handleTujuanChange = (val) => {
    if (val === asal) {
      setError("Asal dan tujuan tidak boleh sama!");
    } else {
      setError("");
    }
    setTujuan(val);
  };

  const handleCari = () => {
    if (!asal || !tujuan || !tanggal) {
      setError("Lengkapi asal, tujuan, dan tanggal dulu ya!");
      return;
    }
    if (asal === tujuan) {
      setError("Asal dan tujuan tidak boleh sama!");
      return;
    }

    navigate(
      `/pencarian?asal=${encodeURIComponent(asal)}&tujuan=${encodeURIComponent(
        tujuan
      )}&tanggal=${tanggal}`
    );
  };

  console.log(tujuan, asal);
  return (
    <main>
      <div className="relative z-10">
        <img src={banner} alt="Banner" className="w-full max-h-[500px]" />

        <div className="hidden lg:block absolute bottom-[200px] left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-10">
          <h1 className="text-center text-4xl font-bold text-white drop-shadow-lg mb-6">
            Pesan tiket perjalanan Anda dengan mudah dan cepat!
          </h1>

          <div className="grid grid-cols-11 gap-4 p-4 bg-white rounded-box items-end">
            <div className="col-span-3">
              <Dropdown
                label="Asal"
                placeholder="Pilih point keberangkatan"
                icon={<LuBus className="text-3xl text-[#e33320]" />}
                labelClassName="text-lg font-semibold text-gray-700"
                options={asalOptions}
                onChange={handleAsalChange}
              />
            </div>

            <div className="col-span-3">
              <Dropdown
                label="Tujuan"
                placeholder="Pilih point tujuan"
                icon={<FaMapMarkerAlt className="text-3xl text-[#e33320]" />}
                labelClassName="text-lg font-semibold text-gray-700"
                options={tujuanOptions}
                onChange={handleTujuanChange}
              />
            </div>

            <div className="col-span-3">
              <Fieldset
                type="date"
                label="Tanggal"
                icon={<FaCalendarAlt className="text-3xl text-[#e33320]" />}
                labelClassName="text-lg font-semibold text-gray-700"
                inputClassName="border rounded-md p-2 w-full"
                min={today}
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </div>

            <div className="col-span-2 flex items-end">
              <Button
                buttonClassName="bg-[#e33320] text-white hover:bg-[#c22d1a] transition-colors w-full h-12 text-sm font-medium"
                text="Cari Jadwal"
                icon={<IoSearch className="text-xl" />}
                onClick={handleCari}
              />
            </div>
          </div>
        </div>

        <div className="block lg:hidden w-full px-4 mt-4">
          <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">
            Pesan tiket perjalanan Anda
          </h1>

          <div className="grid grid-cols-1 gap-4 p-4 bg-white rounded-box shadow">
            <Dropdown
              label="Asal"
              placeholder="Pilih point keberangkatan"
              icon={<LuBus className="text-2xl text-[#e33320]" />}
              labelClassName="text-base font-semibold text-gray-700"
              options={asalOptions}
              onChange={handleAsalChange}
            />

            <Dropdown
              label="Tujuan"
              placeholder="Pilih point tujuan"
              icon={<FaMapMarkerAlt className="text-2xl text-[#e33320]" />}
              labelClassName="text-base font-semibold text-gray-700"
              options={tujuanOptions}
              onChange={handleTujuanChange}
            />

            <Fieldset
              type="date"
              label="Tanggal"
              icon={<FaCalendarAlt className="text-2xl text-[#e33320]" />}
              labelClassName="text-base font-semibold text-gray-700"
              inputClassName="border rounded-md p-2 w-full"
              min={today}
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />

            <Button
              buttonClassName="bg-[#e33320] text-white hover:bg-[#c22d1a] transition-colors w-full h-12 text-sm font-medium"
              text="Cari Jadwal"
              icon={<IoSearch className="text-xl" />}
              onClick={handleCari}
            />
          </div>
        </div>

        {error && <Alert label={error} onClose={() => setError("")} />}

        <div className="hidden lg:block">
          <CardLayanan />
        </div>
      </div>

      <div className="flex flex-col items-center mt-34 px-18">
        <SectionLocation />
      </div>
      <div className="w-full py-4 gap-4 flex flex-col px-18">
        <SectionPromo />
      </div>
      <div className="w-full py-4">
        <SectionMembership />
      </div>
      <div className="w-full py-4 gap-4 flex flex-col px-18">
        <SectionWhyUs />
      </div>
      <div className="w-full py-4">
        <SectionPartnership />
      </div>
    </main>
  );
};

export default Dashboard;
