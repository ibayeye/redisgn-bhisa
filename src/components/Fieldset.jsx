import React from "react";

const Fieldset = ({
  label,
  type = "text",
  placeholder,
  instruction,
  iconSide = "left",
  icon,
  labelClassName = "",
  inputClassName = "",
  inputMode,
  pattern,
  ...rest
}) => {
  return (
    <fieldset className="fieldset space-y-2">
      <label className={`block ${labelClassName}`}>{label}</label>
      <div className="flex items-center">
        {iconSide === "left" && icon && <span className="mr-2">{icon}</span>}
        <input
          type={type}
          inputMode={inputMode}
          pattern={pattern}
          className={`input input-bordered flex-1 placeholder:text-gray-400 ${inputClassName}`}
          placeholder={placeholder}
          {...rest}
        />
        {iconSide === "right" && icon && <span className="ml-2">{icon}</span>}
      </div>
      {instruction && <p className="text-sm text-gray-500">{instruction}</p>}
    </fieldset>
  );
};

export default Fieldset;
