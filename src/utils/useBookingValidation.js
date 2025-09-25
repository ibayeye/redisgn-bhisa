export const useBookingValidation = (
    formPemesan,
    selectedSeats,
    agreeTerms,
    timeLeft
) => {
    const isValid = () => {
        // validasi email & whatsapp
        const emailValid = formPemesan.email?.valid;
        const whatsappValid = formPemesan.whatsapp?.valid;

        // validasi penumpang (semua harus valid)
        const passengersValid =
            formPemesan.penumpang?.length > 0
                ? formPemesan.penumpang.every((p) => p.valid)
                : false;

        return (
            emailValid &&
            whatsappValid &&
            passengersValid &&
            selectedSeats.length > 0 &&
            agreeTerms &&
            timeLeft > 0
        );
    };

    const getErrors = () => {
        const errors = [];

        if (!formPemesan.email?.valid) errors.push("Lengkapi email");
        if (!formPemesan.whatsapp?.valid) errors.push("Lengkapi WhatsApp");

        if (
            !formPemesan.penumpang?.length ||
            !formPemesan.penumpang.every((p) => p.valid)
        ) {
            errors.push("Lengkapi data penumpang");
        }

        if (selectedSeats.length === 0) errors.push("Pilih kursi");
        if (!agreeTerms) errors.push("Setujui syarat & ketentuan");
        if (timeLeft <= 0) errors.push("Waktu habis");

        return errors;
    };

    return { isValid, getErrors };
};
