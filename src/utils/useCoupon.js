import { formatRupiah } from "../utils/constant.js";

export const useCoupon = (jadwal, selectedSeats, showAlert) => {
    const applyCoupon = (kupon) => {
        if (!jadwal || selectedSeats.length === 0) {
            showAlert("Pilih kursi terlebih dahulu sebelum menggunakan kupon");
            return { discount: 0 };
        }

        const validCoupons = {
            BHISA10: { percent: 10, maxDiscount: 50000 },
            NEWUSER: { percent: 15, maxDiscount: 75000 },
            PROMO20: { percent: 20, maxDiscount: 100000 },
        };

        const coupon = validCoupons[kupon.toUpperCase().trim()];
        if (!coupon) {
            showAlert("Kode kupon tidak valid");
            return { discount: 0 };
        }

        const baseDiscount =
            ((jadwal.price * coupon.percent) / 100) * selectedSeats.length;
        const finalDiscount = Math.min(baseDiscount, coupon.maxDiscount);

        showAlert(`Kupon berhasil diterapkan! Hemat ${formatRupiah(finalDiscount)}`);
        return { discount: finalDiscount };
    };

    return { applyCoupon };
};
