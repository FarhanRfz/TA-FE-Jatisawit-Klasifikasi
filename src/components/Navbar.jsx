import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import api from "../api"; 
import logo1 from "../assets/image/Logo_KAB_IMY.png";
import logo2 from "../assets/image/logo-puskesmas-32976.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");
    await api.post("/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Jika logout berhasil, hapus token dan role dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  } catch (error) {
    console.error("Logout failed:", error);
    // Opsional: Tampilkan pesan error ke pengguna jika logout gagal
  }
};

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Auto-close dropdowns and scroll to top on page change
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 shadow ${isScrolled ? "bg-amber-700" : "bg-transparent"}`}>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo dan Judul */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo1} alt="Logo 1" className="w-10 h-10" />
          <img src={logo2} alt="Logo 2" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-white">
            UPTD PUSKESMAS JATISAWIT
          </h1>
        </Link>

        {/* Hamburger untuk Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center space-x-10 text-base font-medium text-white">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/profil">Profil</Link></li>

          {/* Dropdown Layanan */}
          <li className="relative" ref={dropdownRef}>
  <button onClick={toggleDropdown} className="flex items-center space-x-1">
    <span>Layanan</span>
    <ChevronDown className="w-4 h-4" />
  </button>
  {isDropdownOpen && (
    <ul className="absolute top-full left-0 mt-2 bg-white text-black shadow-md border rounded-md w-40 z-50">
      {/* Hapus {token &&} di sini */}
      <li>
        <Link to="/klasifikasi" className="block px-4 py-2 hover:bg-gray-100">
          Klasifikasi
        </Link>
      </li>
      <li>
        <Link to="/Edukasi-Stunting" className="block px-4 py-2 hover:bg-gray-100">
          Edukasi
        </Link>
      </li>
    </ul>
  )}
</li>
        </ul>

        {/* Tombol Masuk atau Profil */}
        <div className="hidden md:flex items-center space-x-4 relative" ref={profileRef}>
          {!token ? (
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-full shadow"
            >
              Masuk
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="bg-white text-black font-semibold py-2 px-5 rounded-full shadow"
              >
                Profil
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-50 w-40">
                  <Link
                    to="/edit-profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Edit Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-100 text-red-500 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
  <div className="md:hidden bg-white shadow-md p-4 space-y-2 text-black">
    <Link to="/" className="block" onClick={() => setIsMenuOpen(false)}>Beranda</Link>
    <Link to="/profil" className="block" onClick={() => setIsMenuOpen(false)}>Profil</Link>
    <div>
      <p className="font-semibold">Layanan</p>
      {token && (
        <Link to="/klasifikasi" className="block mt-1" onClick={() => setIsMenuOpen(false)}>Klasifikasi</Link>
      )}
      <Link to="/Edukasi-Stunting" className="block" onClick={() => setIsMenuOpen(false)}>Edukasi</Link>
    </div>

    {token ? (
      <>
        <Link
          to="/edit-profile"
          className="block text-left text-blue-600 font-medium hover:underline mt-2"
          onClick={() => setIsMenuOpen(false)}
        >
          Edit Profil
        </Link>
        <button
          onClick={() => {
            setIsMenuOpen(false);
            handleLogout();
          }}
          className="block w-full bg-red-500 text-white text-center py-2 px-4 rounded-full mt-3"
        >
          Logout
        </button>
      </>
    ) : (
      <Link
        to="/login"
        className="block bg-green-800 hover:bg-orange-600 text-white text-center py-2 px-4 rounded-full mt-3"
        onClick={() => setIsMenuOpen(false)}
      >
        Masuk
      </Link>
    )}
  </div>
)}

    </nav>
  );
};

export default Navbar;
