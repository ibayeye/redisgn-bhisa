import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Pesanan from "./pages/Pesanan";
import Inbox from "./pages/Inbox";
import AkunSaya from "./pages/AkunSaya";
import Shuttle from "./pages/layanan/Shuttle";
import KirimPaket from "./pages/layanan/KirimPaket";
import BusAKAP from "./pages/layanan/BusAKAP";
import SewaArmada from "./pages/layanan/SewaArmada";
import Pencarian from "./pages/Pencarian";
import Reservasi from "./pages/Reservasi";
import Pembayaran from "./pages/Pembayaran";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pesanan" element={<Pesanan />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="profile" element={<AkunSaya />} />
          <Route path="pencarian" element={<Pencarian />} />
          <Route path="reservasi/:id" element={<Reservasi />} />
          <Route path="pembayaran" element={<Pembayaran />} />
          <Route path="layanan/shuttle" element={<Shuttle />} />
          <Route path="layanan/kirim-paket" element={<KirimPaket />} />
          <Route path="layanan/bus-akap" element={<BusAKAP />} />
          <Route path="layanan/sewa-armada" element={<SewaArmada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
