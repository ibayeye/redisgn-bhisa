import React from "react";
import Fieldset from "./Fieldset";

const FormPemesan = ({ formPemesan, setFormPemesan, validators }) => {
  const { validateNama, validateEmail, validateWhatsApp } = validators;
  return (
    <div className="space-y-4">
      <div>
        <Fieldset
          label="Nama Pemesan"
          placeholder="Masukkan nama pemesan"
          labelClassName="text-base font-semibold text-gray-700 mb-2"
          inputClassName={`border rounded-md p-3 w-full ${
            formPemesan.nama.error
              ? "border-red-500"
              : formPemesan.nama.valid
              ? "border-gray-500"
              : ""
          }`}
          value={formPemesan.nama.value}
          onChange={(e) => {
            const result = validateNama(e.target.value);
            setFormPemesan((prev) => ({
              ...prev,
              nama: {
                value: e.target.value,
                error: result.error,
                valid: result.valid,
              },
            }));
          }}
        />
        {formPemesan.nama.error && (
          <p className="text-red-500 text-sm mt-1">{formPemesan.nama.error}</p>
        )}
      </div>

      <div>
        <Fieldset
          label="Email"
          type="email"
          placeholder="nama@email.com"
          instruction="E-ticket akan dikirim ke email ini"
          labelClassName="text-base font-semibold text-gray-700 mb-2"
          inputClassName={`border rounded-md p-3 w-full ${
            formPemesan.email.error
              ? "border-red-500"
              : formPemesan.email.valid
              ? "border-gray-500"
              : ""
          }`}
          value={formPemesan.email.value}
          onChange={(e) => {
            const result = validateEmail(e.target.value);
            setFormPemesan((prev) => ({
              ...prev,
              email: {
                value: e.target.value,
                error: result.error,
                valid: result.valid,
              },
            }));
          }}
        />
        {formPemesan.email.error && (
          <p className="text-red-500 text-sm mt-1">{formPemesan.email.error}</p>
        )}
      </div>

      <div>
        <Fieldset
          label="WhatsApp"
          type="tel"
          inputMode={"numeric"}
          pattern={"[0-9]*"}
          placeholder="08xxxxxxxxxx"
          labelClassName="text-base font-semibold text-gray-700 mb-2"
          inputClassName={`border rounded-md p-3 w-full ${
            formPemesan.whatsapp.error
              ? "border-red-500"
              : formPemesan.whatsapp.valid
              ? "border-gray-500"
              : ""
          }`}
          value={formPemesan.whatsapp.value}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");
            const result = validateWhatsApp(e.target.value);
            setFormPemesan((prev) => ({
              ...prev,
              whatsapp: {
                value: onlyNumbers,
                error: result.error,
                valid: result.valid,
              },
            }));
          }}
        />
        {formPemesan.whatsapp.error && (
          <p className="text-red-500 text-sm mt-1">
            {formPemesan.whatsapp.error}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormPemesan;
