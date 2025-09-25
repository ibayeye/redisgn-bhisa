import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const DropdownMenu = ({ menu, className, style }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleDropdown = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef} style={style}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-1 cursor-pointer transition-colors duration-300 ${
          menu.children.some((child) => location.pathname.includes(child.path))
            ? "text-black font-bold"
            : "text-black"
        }`}
      >
        {menu.name}
        <RiArrowDropDownLine
          className={`h-5 w-5 transform transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul className="absolute top-full left-[-16px] mt-2 w-52 bg-base-100 rounded-box shadow z-10">
          {menu.children.map((child, idx) => (
            <li key={idx}>
              <Link
                to={`/${child.path}`}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 mt-2 mr-2 hover:bg-gray-100 transition-colors ${
                  location.pathname === `/${child.path}`
                    ? "bg-gray-200 font-bold"
                    : ""
                }`}
              >
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
