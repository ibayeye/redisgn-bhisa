import { useState } from "react";
import { PAYMENT_STATUS } from "../utils/constant";

export const usePaymentStatus = () => {
    const [status, setStatus] = useState(PAYMENT_STATUS.PENDING);

    const confirmPayment = () => {
        setStatus(PAYMENT_STATUS.PAID);
        setTimeout(() => setStatus(PAYMENT_STATUS.SUCCESS), 3000);
    };

    return { status, confirmPayment };
};
