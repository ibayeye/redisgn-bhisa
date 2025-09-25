import React from "react";

const Button = ({ text, icon, buttonClassName = "", onClick, disabled }) => {
  return (
    <button
      className={`
        btn flex items-center justify-center gap-2 
        px-4 py-2 text-sm  
        sm:px-5 sm:py-2.5 sm:text-base 
        lg:px-4 lg:py-3 lg:text-lg     
        rounded-md font-medium transition
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${buttonClassName}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
