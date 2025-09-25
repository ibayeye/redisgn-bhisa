import React from "react";
import { FiX } from "react-icons/fi";
import Fieldset from "./Fieldset";
import { BsTicketPerforated } from "react-icons/bs";

const CardReservasi = () => {
  return (
    <div className=" bg-white grid grid-rows gap-2 p-4 rounded-lg shadow-md w-auto">
      <div className="grid grid-rows">
        <h1 className="font-bold">Cek Reservasi Anda</h1>
        <div className="divider m-0 w-full"></div>
      </div>
      <Fieldset
        label="Kode Tiket"
        placeholder="Masukkan kode (TORDER-XXXX-XXX)"
        className={"input w-78"}
        icon={<BsTicketPerforated className="text-2xl" />}
      />
    </div>
  );
};

export default CardReservasi;
