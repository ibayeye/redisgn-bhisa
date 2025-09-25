import React from "react";
import Fieldset from "./Fieldset";

const FormPenumpangList = ({
  formPemesan,
  setFormPemesan,
  validators,
  selectedSeats,
}) => {
  const handlePassengerChange = (index, value) => {
    const result = validators.validateNama(value);
    setFormPemesan((prev) => {
      const updatedPenumpang = [...prev.penumpang];
      updatedPenumpang[index] = {
        value,
        error: result.error,
        valid: result.valid,
      };
      return { ...prev, penumpang: updatedPenumpang };
    });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Data Penumpang
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formPemesan.penumpang.map((p, i) => (
          <div key={i} className="w-full">
            <Fieldset
              label={`Nama Penumpang ${i + 1}`}
              placeholder="Masukkan nama penumpang"
              labelClassName="text-base font-semibold text-gray-700 mb-2"
              inputClassName={`border rounded-md p-3 w-full ${
                p.error ? "border-red-500" : p.valid ? "border-gray-300" : ""
              }`}
              value={i === 0 ? formPemesan.nama.value : p.value}
              onChange={(e) => handlePassengerChange(i, e.target.value)}
              disabled={i === 0}
            />
            {p.error && <p className="text-red-500 text-sm mt-1">{p.error}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormPenumpangList;
