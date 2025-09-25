import React from "react";
import membership from "../assets/membership.png";

const SectionMembership = () => {
  return (
    <div className="bg-[#e33320] py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Text */}
        <div className="flex-1 text-white flex flex-col justify-center text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mb-4">
            Jadi Member Bhisa Sekarang!
          </h1>
          <p className="text-base sm:text-lg opacity-90 mb-6">
            Nikmati berbagai keuntungan eksklusif, mulai dari diskon spesial,
            poin reward, hingga promo terbatas hanya untuk member Bhisa.
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="bg-white text-[#e33320] font-bold rounded-md px-6 py-3 shadow hover:bg-gray-100 transition">
              Daftar Membership
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={membership}
            alt="Membership"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionMembership;
