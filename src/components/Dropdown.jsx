import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const Dropdown = ({
  label,
  placeholder = "Pilih opsi...",
  options = [],
  value,
  onChange,
  instruction,
  iconSide = "left",
  icon,
  labelClassName = "",
  dropdownClassName = "",
  disabled = false,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || null);
  const dropdownRef = useRef(null);

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // update selectedOption ketika props `value` berubah
  useEffect(() => {
    if (value !== undefined) {
      let found = null;

      // support grouped
      options.forEach((item) => {
        if (item.group && Array.isArray(item.options)) {
          const match = item.options.find((opt) => opt.value === value);
          if (match) found = match;
        } else if (item.value === value) {
          found = item;
        }
      });

      setSelectedOption(found);
    }
  }, [value, options]);

  const handleToggle = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value, option);
    }
  };

  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <fieldset className="fieldset space-y-2" ref={dropdownRef}>
      {label && <label className={`block ${labelClassName}`}>{label}</label>}

      <div className="relative">
        <div className="flex items-center">
          {iconSide === "left" && icon && <span className="mr-2">{icon}</span>}
          <div
            className={`
                input input-bordered flex-1 cursor-pointer flex items-center justify-between
                ${
                  disabled
                    ? "bg-gray-100 cursor-not-allowed"
                    : "hover:border-gray-400"
                }
                ${dropdownClassName}
                `}
            onClick={handleToggle}
            {...rest}
          >
            <span
              className={
                selectedOption
                  ? "text-gray-900 truncate"
                  : "text-gray-400 truncate"
              }
            >
              {displayText}
            </span>
            <RiArrowDropDownLine
              className={`h-5 w-5 transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              } ${disabled ? "text-gray-400" : "text-gray-600"}`}
            />
          </div>
          {iconSide === "right" && icon && <span className="ml-2">{icon}</span>}
        </div>

        {/* Dropdown Options */}
        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 z-[9999] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-4 py-3 text-gray-500 text-sm">
                Tidak ada opsi tersedia
              </div>
            ) : (
              options.map((item, idx) =>
                item.group ? (
                  <div
                    key={item.group || idx}
                    className="border-b border-gray-200"
                  >
                    {/* Nama Group (kota) */}
                    <div className="px-4 py-2 text-lg font-bold text-[#e33320] bg-gray-50">
                      {item.group}
                    </div>
                    {item.options.map((option) => (
                      <div
                        key={option.value}
                        className={`px-4 py-2 cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${
                          selectedOption?.value === option.value
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700"
                        }`}
                        onClick={() => handleSelect(option)}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {option.label}
                          </span>
                          {option.address && (
                            <span className="text-xs text-gray-500 mt-1">
                              {option.address}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // fallback kalau datanya flat
                  <div
                    key={item.value || idx}
                    className={`px-4 py-2 cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${
                      selectedOption?.value === item.value
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
                    }`}
                    onClick={() => handleSelect(item)}
                  >
                    {item.label}
                  </div>
                )
              )
            )}
          </div>
        )}
      </div>

      {instruction && <p className="text-sm text-gray-500">{instruction}</p>}
    </fieldset>
  );
};

export default Dropdown;
