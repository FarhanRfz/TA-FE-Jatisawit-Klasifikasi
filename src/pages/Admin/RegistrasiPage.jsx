import React, { useState } from "react";
import api from "../../api";
import logo from "../../assets/image/logo-puskesmas-32976.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RegistrasiPage = () => {
  const [username, setUsername] = useState("");
  const [namaLengkapOrangtua, setNamaLengkapOrangtua] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [namaLengkapAnak, setNamaLengkapAnak] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== passwordConfirmation) {
      setError("Konfirmasi kata sandi tidak cocok!");
      return;
    }
    try {
      const response = await api.post("/register", {
        username,
        email,
        nama_lengkap_orangtua: namaLengkapOrangtua,
        password, // Password yang dimasukkan
        password_confirmation: passwordConfirmation, // Tambahkan ini
        nama_lengkap_anak: namaLengkapAnak,
      });
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registrasi gagal!");
      console.log(error.response); // Debug detail error dari server
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-4 md:p-8">
        <img src={logo} alt="Logo Puskesmas" className="w-24 md:w-32 mb-4" />
        <h1 className="text-lg md:text-xl font-bold text-green-900 text-center">
          PUSKESMAS JATISAWIT
        </h1>
      </div>
      <div className="w-full md:w-1/2 bg-gray-50 flex flex-col justify-center items-center p-4 md:p-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-red-400 text-center">
          Daftar
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <span className="mr-2">👤</span>
              <input
                type="text"
                placeholder="Username"
                className="outline-none w-full bg-transparent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
  <label className="block mb-1 text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
    <span className="mr-2">📧</span>
    <input
      type="email"
      placeholder="Email"
      className="outline-none w-full bg-transparent"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </label>
</div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <span className="mr-2">👪</span>
              <input
                type="text"
                placeholder="Nama Lengkap Orang Tua"
                className="outline-none w-full bg-transparent"
                value={namaLengkapOrangtua}
                onChange={(e) => setNamaLengkapOrangtua(e.target.value)}
                required // Pastikan field ini diisi
              />
            </label>
          </div>
          <div className="mb-4 relative">
            <label className="block mb-1 text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <span className="mr-2">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Kata Sandi"
                className="outline-none w-full bg-transparent pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </label>
          </div>
          <div className="mb-4 relative">
            <label className="block mb-1 text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <span className="mr-2">🔐</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi Kata Sandi"
                className="outline-none w-full bg-transparent pr-10"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-full text-lg font-semibold transition"
          >
            DAFTAR
          </button>
          <p className="text-center mt-4 text-gray-600">
            Sudah punya akun?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
              className="text-blue-600 hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrasiPage;