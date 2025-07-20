import React, { useState } from "react";
import api from "../../api";
import logo from "../../assets/image/logo-puskesmas-32976.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // setError("");
    // setMessage("");
    try {
      const response = await api.post("/forgot-password", { email });
      toast.success("Link reset telah dikirim. Silakan cek email Anda.");
      setEmail("");
      setTimeout(() => {
        window.location.reload(); // Refresh halaman
      }, 3500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Email tidak ditemukan!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8">
        <Link to="/" className="flex flex-col items-center">
          <img src={logo} alt="Logo Puskesmas" className="w-24 md:w-32 mb-4" />
          <h1 className="text-lg md:text-xl font-bold text-green-900 text-center">
            PUSKESMAS JATISAWIT
          </h1>
        </Link>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-red-400 text-center">
          Lupa Kata Sandi
        </h2>
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleForgotPassword} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <span className="mr-2">📧</span>
              <input
                type="email"
                placeholder="Masukkan Email"
                className="outline-none w-full bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full text-lg font-semibold transition"
          >
            KIRIM LINK RESET
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Kembali ke{" "}
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

export default ForgotPasswordPage;