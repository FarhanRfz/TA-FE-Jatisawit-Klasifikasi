import React, { useState } from "react";;
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import logo from "../../assets/image/logo-puskesmas-32976.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";


const RegistrasiPage = () => {
  const [username, setUsername] = useState("");
  const [namaLengkapOrangtua, setNamaLengkapOrangtua] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const navigate = useNavigate();

  // Kirim OTP ke email (Register tahap 1)
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Konfirmasi kata sandi tidak cocok!");
      return;
    }

    try {
      await api.post("/register", {
        username,
        email,
        nama_lengkap_orangtua: namaLengkapOrangtua,
        password,
        password_confirmation: passwordConfirmation,
      });
      setOtpSent(true);
      toast.success("Kode OTP sudah dikirim ke email Anda!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengirim OTP.");
    }
  };

  // Verifikasi OTP (Register tahap 2)
  const handleVerifyOtp = async () => {
    try {
      const res = await api.post("/verify-otp", { email, otp_code: otpCode });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      toast.success("Verifikasi berhasil! Anda login otomatis.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "OTP salah atau kadaluarsa.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-4 md:p-8">
      <Link to="/" className="flex flex-col items-center">
        <img src={logo} alt="Logo Puskesmas" className="w-24 md:w-32 mb-4" />
        <h1 className="text-lg md:text-xl font-bold text-green-900 text-center">
          PUSKESMAS JATISAWIT
        </h1>
      </Link>
        
      </div>

      <div className="w-full md:w-1/2  flex flex-col justify-center items-center p-4 md:p-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-red-400 text-center">
          Daftar
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="w-full max-w-sm">
            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <span className="mr-2">👤</span>
                <input
                  type="text"
                  placeholder="Username"
                  className="outline-none w-full bg-transparent"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            </div>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
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
            {/* Nama Orang Tua */}
            <div className="mb-4">
              <label className="block text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <span className="mr-2">👪</span>
                <input
                  type="text"
                  placeholder="Nama Lengkap Orang Tua"
                  className="outline-none w-full bg-transparent"
                  value={namaLengkapOrangtua}
                  onChange={(e) => setNamaLengkapOrangtua(e.target.value)}
                  required
                />
              </label>
            </div>
            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
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
            {/* Konfirmasi Password */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
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
            {/* Tombol Kirim OTP */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-full text-lg font-semibold transition"
            >
              Kirim Token ke Email
            </button>
          </form>
        ) : (
          <div className="w-full max-w-sm">
            <p className="mb-4 text-center text-gray-700">
              Masukkan kode OTP (6 digit) yang telah dikirim ke email Anda.
            </p>
            <input
              type="text"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="w-full text-center text-2xl tracking-widest border border-gray-400 rounded-lg p-3 mb-4"
              placeholder="••••••"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full text-lg font-semibold transition"
            >
              Verifikasi & Login
            </button>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default RegistrasiPage;
