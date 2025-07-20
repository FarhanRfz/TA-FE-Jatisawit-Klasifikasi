import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../api";
import logo from "../../assets/image/logo-puskesmas-32976.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/login", form);// Ganti endpoint ke /login
      const { token, role } = res.data;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      toast.success("Login berhasil!");

      // Redirect berdasarkan role
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/"); // Sesuaikan dengan rute halaman user
    } 
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal. Periksa kredensial Anda!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Logo */}
      <div className="w-full md:w-1/2  flex flex-col justify-center items-center p-4 md:p-8">
        <Link to="/" className="flex flex-col items-center">
        <img src={logo} alt="Logo Puskesmas" className="w-24 md:w-32 mb-4" />
        <h1 className="text-lg md:text-xl font-bold text-green-900 text-center">
          PUSKESMAS JATISAWIT
        </h1>
        </Link>
      </div>

      {/* Form Login */}
      <div className="w-full md:w-1/2  flex flex-col justify-center items-center p-4 md:p-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-red-400 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="w-full max-w-sm">
          {/* Username */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <span className="mr-2">👤</span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="outline-none w-full bg-transparent"
                required
              />
            </label>
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block mb-1 text-gray-700 flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <span className="mr-2">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Kata Sandi"
                value={form.password}
                onChange={handleChange}
                className="outline-none w-full bg-transparent pr-10"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </label>
            <div className="text-right text-sm mt-1">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/forgot-password");
                }}
                className="text-gray-600 hover:underline"
              >
                Lupa Kata Sandi?
              </a>
            </div>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full bg-red-400 hover:bg-red-500 text-white py-2 rounded-full text-lg font-semibold transition"
          >
            LOGIN
          </button>

          {/* Daftar */}
          <p className="text-center mt-4 text-gray-600">
            Belum punya akun?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/registrasi");
              }}
              className="text-blue-600 hover:underline"
            >
              Daftar
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
