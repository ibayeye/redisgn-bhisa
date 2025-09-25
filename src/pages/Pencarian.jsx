import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Fieldset from "../components/Fieldset";
import Dropdown from "../components/Dropdown";
import { LuBus } from "react-icons/lu";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import data from "../data/pointtrip.json";
import kursi from "../data/kursi.json";
import schedulesData from "../data/shuttles.json";
import Alert from "../components/Alert";
import Accordion from "../components/Accordion";
import SidebarFilter from "../components/SidebarFilter";
import Skeleton from "../components/Skeleton";
import { SlidersHorizontal } from "lucide-react";

const Pencarian = () => {
  const today = new Date().toISOString().split("T")[0];
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    asal: "",
    tujuan: "",
    tanggal: "",
    jumlahKursi: "",
    departures: "",
    originAddress: "",
    destinationAddress: "",
  });

  const [hasil, setHasil] = useState([]);
  const [warning, setWarning] = useState("");
  const [filteredHasil, setFilteredHasil] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFormData((prev) => ({
      ...prev,
      asal: params.get("asal") || "",
      tujuan: params.get("tujuan") || "",
      tanggal: params.get("tanggal") || "",
    }));
  }, [location.search]);

  const asalOptions = data?.PointKeberangkatan || [];
  const tujuanOptions = data?.PointTujuan || [];
  const kursiOptions = kursi?.kursiOptions || [];

  const getGroupFromOption = (groups, selectedValue) => {
    if (!groups || !selectedValue) return null;
    for (const group of groups) {
      const found = group.options.find((opt) => opt.value === selectedValue);
      if (found) return group.group;
    }
    return null;
  };

  const handleSearch = () => {
    if (!schedulesData || !schedulesData.schedules) {
      setWarning("Data jadwal tidak tersedia. Silakan refresh halaman.");
      return;
    }

    setWarning("");
    setLoading(true);
    setHasil([]);

    setTimeout(() => {
      if (!formData.asal || !formData.tujuan) {
        setWarning("Asal dan tujuan harus dipilih.");
        return;
      }
      if (!formData.tanggal) {
        setWarning("Tanggal keberangkatan harus dipilih.");
        return;
      }
      if (!formData.jumlahKursi) {
        setWarning("Jumlah kursi harus dipilih.");
        return;
      }

      const asalGroup = getGroupFromOption(asalOptions, formData.asal);
      const tujuanGroup = getGroupFromOption(tujuanOptions, formData.tujuan);

      const asalDetail = asalOptions
        .flatMap((g) => g.options)
        .find((o) => o.value === formData.asal);

      const tujuanDetail = tujuanOptions
        .flatMap((g) => g.options)
        .find((o) => o.value === formData.tujuan);

      const filtered = schedulesData.schedules
        .filter(
          (schedule) =>
            schedule.origin.toLowerCase() === asalGroup.toLowerCase() &&
            schedule.destination.toLowerCase() === tujuanGroup.toLowerCase()
        )
        .map((item) => ({
          ...item,
          originAddress: asalDetail?.address || "",
          destinationAddress: tujuanDetail?.address || "",
        }));

      setHasil(filtered);
      setFilteredHasil(filtered);
      setLoading(false);
      if (filtered.length === 0) {
        setWarning(
          `Tidak ada jadwal tersedia untuk rute ${asalGroup} ke ${tujuanGroup}.`
        );
      }
    }, 1200);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    let temp = [...hasil];

    if (newFilters.priceRange) {
      temp = temp.filter((item) => item.price <= newFilters.priceRange[1]);
    }

    if (newFilters.operators && newFilters.operators.length > 0) {
      temp = temp.filter((item) =>
        newFilters.operators.includes(item.operator)
      );
    }

    if (newFilters.timeSlots && newFilters.timeSlots.length > 0) {
      temp = temp.filter((item) => {
        return item.departures.some((time) => {
          const hour = parseInt(time.split(":")[0], 10);
          if (
            newFilters.timeSlots.includes("Pagi (05:00-11:59)") &&
            hour >= 5 &&
            hour < 12
          )
            return true;
          if (
            newFilters.timeSlots.includes("Siang (12:00-17:59)") &&
            hour >= 12 &&
            hour < 18
          )
            return true;
          if (
            newFilters.timeSlots.includes("Malam (18:00-23:59)") &&
            hour >= 18 &&
            hour <= 23
          )
            return true;
          return false;
        });
      });
    }

    if (newFilters.sort) {
      if (newFilters.sort === "termurah") {
        temp.sort((a, b) => a.price - b.price);
      } else if (newFilters.sort === "tercepat") {
        temp.sort((a, b) => {
          const aEarliest = Math.min(
            ...a.departures.map((t) => parseInt(t.split(":")[0], 10))
          );
          const bEarliest = Math.min(
            ...b.departures.map((t) => parseInt(t.split(":")[0], 10))
          );
          return aEarliest - bEarliest;
        });
      } else if (newFilters.sort === "durasi") {
        temp.sort((a, b) => a.price - b.price);
      }
    }

    setFilteredHasil(temp);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6">
      <div className="col-span-1 hidden lg:block">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Filter & Sort
        </h2>
        <div className="sticky top-6 h-screen shadow-md">
          <SidebarFilter onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className="col-span-2 w-full">
        <div className="flex justify-end mb-4 lg:hidden">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#e33320] text-white rounded-md shadow hover:bg-[#c22d1a] transition"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filter & Sort
          </button>
        </div>

        {isDrawerOpen && (
          <div className="fixed inset-0 z-500 flex">
            <div
              className="flex-1 bg-black/40"
              onClick={() => setIsDrawerOpen(false)}
            />
            <div className="w-80 max-w-[80%] h-full bg-white shadow-xl p-4 overflow-y-auto animate-slideInRight">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Filter & Sort
                </h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-600 hover:text-gray-900 text-xl"
                >
                  ✕
                </button>
              </div>
              <SidebarFilter onFilterChange={handleFilterChange} />
            </div>
          </div>
        )}

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Pencarian</h2>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Dropdown
              label="Asal"
              placeholder="Pilih kota keberangkatan"
              icon={<LuBus className="text-2xl text-[#e33320]" />}
              labelClassName="text-base font-semibold text-gray-700 mb-2"
              dropdownClassName="border rounded-md p-3 w-full"
              options={asalOptions}
              value={formData.asal}
              onChange={(value) => setFormData({ ...formData, asal: value })}
            />
            <Dropdown
              label="Tujuan"
              placeholder="Pilih kota tujuan"
              icon={<FaMapMarkerAlt className="text-2xl text-[#e33320]" />}
              labelClassName="text-base font-semibold text-gray-700 mb-2"
              dropdownClassName="border rounded-md p-3 w-full"
              options={tujuanOptions}
              value={formData.tujuan}
              onChange={(value) => setFormData({ ...formData, tujuan: value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <Fieldset
              type="date"
              label="Tanggal"
              icon={<FaCalendarAlt className="text-2xl text-[#e33320]" />}
              labelClassName="text-base font-semibold text-gray-700 mb-2"
              inputClassName="border rounded-md p-3 w-full"
              min={today}
              value={formData.tanggal}
              onChange={(e) =>
                setFormData({ ...formData, tanggal: e.target.value })
              }
            />

            <Dropdown
              label="Jumlah Kursi"
              placeholder="Pilih jumlah kursi"
              icon={<FaUser className="text-2xl text-[#e33320]" />}
              labelClassName="text-base font-semibold text-gray-700 mb-2"
              dropdownClassName="border rounded-md p-3 w-full"
              options={kursiOptions}
              value={formData.jumlahKursi}
              onChange={(value) =>
                setFormData({ ...formData, jumlahKursi: value })
              }
            />

            <div className="md:col-span-2">
              <Button
                buttonClassName="bg-[#e33320] text-white hover:bg-[#c22d1a] transition-colors w-full h-12 text-sm font-medium rounded-md"
                text="Ubah Pencarian"
                icon={<IoSearch className="text-lg" />}
                onClick={handleSearch}
              />
            </div>
          </div>

          {warning && <Alert label={warning} onClose={() => setWarning("")} />}

          {loading ? (
            <div className="mt-8 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-300 rounded-md shadow space-y-3"
                >
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : filteredHasil.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Jadwal Tersedia ({filteredHasil.length} hasil)
              </h3>
              <div className="space-y-4">
                {filteredHasil.map((item) => (
                  <Accordion
                    key={item.id}
                    departures={item.departures}
                    operator={item.operator}
                    origin={item.origin}
                    originAddress={item.originAddress}
                    destination={item.destination}
                    destinationAddress={item.destinationAddress}
                    price={item.price}
                    points={item.points}
                    onChange={(selected) =>
                      navigate(`/reservasi/${item.id}`, {
                        state: {
                          ...item,
                          jumlahKursi: formData.jumlahKursi,
                          tanggal: formData.tanggal,
                          departure: selected.selectedDeparture,
                          originAddress: item.originAddress,
                          destinationAddress: item.destinationAddress,
                        },
                      })
                    }
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
                Tidak ada hasil pencarian
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pencarian;
