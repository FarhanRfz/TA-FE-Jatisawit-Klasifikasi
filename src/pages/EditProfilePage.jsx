import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from "../api";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    nama_lengkap_orangtua: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { username, email, nama_lengkap_orangtua } = response.data.data;
        setFormData((prev) => ({
          ...prev,
          username,
          email,
          nama_lengkap_orangtua: nama_lengkap_orangtua,
        }));
      } catch (err) {
        console.error("Gagal mengambil data pengguna:", err);
        alert("Gagal memuat data profil. Silakan coba lagi.");
      }
    };

    if (token) fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    api.put(
    "/user/update",
    {
      nama_lengkap_orangtua: formData.nama_lengkap_orangtua || undefined,
      password: formData.newPassword || undefined,
      password_confirmation: formData.confirmPassword || undefined,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
      .then((res) => {
        toast.success("Profil berhasil diperbarui!");
      })
      .catch((err) => {
        console.error("Gagal memperbarui profil:", err);
        toast.error(
          "Gagal memperbarui profil! " +
            (err.response?.data?.message || "Silakan coba lagi.")
        );
      });
  };

  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center px-4 py-10 pt-24 sm:pt-16">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Profil
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap Orang Tua
            </label>
            <input
              type="text"
              name="nama_lengkap_orangtua"
              value={formData.nama_lengkap_orangtua}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Baru (Opsional)
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Kosongkan jika tidak ingin mengganti"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Kosongkan jika tidak ingin mengganti"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-300"
            disabled={!formData.email || !formData.nama_lengkap_orangtua}
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;