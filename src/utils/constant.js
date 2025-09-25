export const ADMIN_FEES = {
  transfer: 0,
  qris: 1000,
  va: 2500,
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  SUCCESS: "success",
};

export const maskNumber = (number, isVisible = false) => {
  if (isVisible) return number;
  return number.replace(/(\d{4})(\d*)(\d{4})/, "$1****$3");
};

export const copyToClipboard = (text, onCopied) => {
  navigator.clipboard.writeText(text).then(() => {
    if (onCopied) onCopied();
  });
};

export const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};
