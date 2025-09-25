import React from "react";
import logo from "../assets/logo-bhisa-landscape.png";
import { Link, useLocation } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { FiAlignRight } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();

  const menus = {
    user: [
      { name: "Beranda", path: "/" },
      // {
      //   name: "Layanan",
      //   children: [
      //     { name: "Shuttle", path: "layanan/shuttle" },
      //     { name: "Kirim Paket", path: "layanan/kirim-paket" },
      //     { name: "Bus AKAP", path: "layanan/bus-akap" },
      //     { name: "Sewa Armada", path: "layanan/sewa-armada" },
      //   ],
      // },
      { name: "Pencarian", path: "/pencarian" },
      { name: "Reservasi", path: "reservasi/:id" },
      { name: "Pembayaran", path: "/pembayaran" },
    ],
  };

  return (
    <div className="navbar fixed top-0 z-100 bg-base-100 shadow-sm px-16">
      <div className="navbar-start">
        <Link to="/">
          <img
            src={logo}
            alt="Bhinneka Sangkuriang Transport Grup"
            className="w-32 cursor-pointer"
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-md font-semibold">
          {menus.user.map((menu, index) =>
            menu.children ? (
              <li key={index}>
                <DropdownMenu menu={menu} className="hover:text-black" />
              </li>
            ) : (
              <li key={index}>
                <Link
                  to={menu.path}
                  className={`transition-colors duration-300 ${
                    location.pathname === menu.path
                      ? "text-black font-bold"
                      : "text-black"
                  } `}
                >
                  {menu.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <button className="lg:hidden">
            <FiAlignRight className="h-6 w-6" />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content rounded-box z-100 bg-white mt-3 w-52 p-2 shadow font-bold "
          >
            {menus.user.map((menu, index) =>
              menu.children ? (
                <li key={index}>
                  <details>
                    <summary>{menu.name}</summary>{" "}
                    <ul>
                      {menu.children.map((child, idx) => (
                        <li key={idx}>
                          <Link to={child.path}>{child.name}</Link>{" "}
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={index}>
                  <Link to={menu.path}>{menu.name}</Link>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="avatar avatar-placeholder hidden lg:flex">
          <div className="bg-neutral text-neutral-content w-8 rounded-full">
            <span className="text-md">B</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
