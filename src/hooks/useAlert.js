import { useState, useCallback } from "react";

export const useAlert = () => {
    const [alertState, setAlertState] = useState({ show: false, message: "" });

    const showAlert = useCallback((message) => {
        setAlertState({ show: true, message });
    }, []);

    const closeAlert = useCallback(() => {
        setAlertState({ show: false, message: "" });
    }, []);

    return {
        alertState,
        showAlert,
        closeAlert
    };
};