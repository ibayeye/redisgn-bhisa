export const useFormValidation = () => {
    const validateNama = (value) => {
        if (!value.trim()) return { error: "Nama tidak boleh kosong", valid: false };
        if (value.trim().length < 2) return { error: "Nama minimal 2 karakter", valid: false };
        return { error: "", valid: true };
    };

    const validateEmail = (value) => {
        if (!value.trim()) return { error: "Email tidak boleh kosong", valid: false };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value)
            ? { error: "", valid: true }
            : { error: "Format email tidak valid", valid: false };
    };

    const validateWhatsApp = (value) => {
        if (!value.trim()) return { error: "Nomor WhatsApp tidak boleh kosong", valid: false };
        const phoneRegex = /^[\+]?[0-9]{10,15}$/;
        return phoneRegex.test(value.replace(/\s/g, ""))
            ? { error: "", valid: true }
            : { error: "Format nomor tidak valid (10-15 digit)", valid: false };
    };

    return { validateNama, validateEmail, validateWhatsApp };
};
