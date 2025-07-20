import React, { useState, useEffect } from "react";
import api from "../../api";
import logo from "../../assets/image/logo-puskesmas-32976.png";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Ambil token dari URL saat pertama render
  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email wajib diisi!");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Konfirmasi kata sandi tidak cocok!");
      return;
    }

    try {
      await api.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      setMessage("Kata sandi berhasil diatur ulang. Mengarahkan ke login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Gagal mengatur ulang kata sandi!");
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
      <div className="w-full md:w-1/2 bg-gray-50 flex flex-col justify-center items-center p-4 md:p-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-red-400 text-center">
          Atur Ulang Kata Sandi
        </h2>
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleResetPassword} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">
              Email
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">
              Kata Sandi Baru
              <input
                type="password"
                placeholder="Kata sandi baru"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">
              Konfirmasi Kata Sandi Baru
              <input
                type="password"
                placeholder="Ulangi kata sandi"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full text-lg font-semibold transition"
          >
            ATUR ULANG
          </button>
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
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
