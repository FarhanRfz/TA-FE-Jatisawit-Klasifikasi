// src/pages/EditProfile.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    newPassword: '',
    confirmPassword: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { username, email, full_name } = res.data.data;
        setFormData((prev) => ({
          ...prev,
          username,
          email,
          fullName: full_name,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        'http://localhost:8000/api/user/update',
        {
          email: formData.email,
          full_name: formData.fullName,
          password: formData.newPassword,
          password_confirmation: formData.confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        alert('Profil berhasil diperbarui!');
      })
      .catch((err) => {
        console.error(err);
        alert('Gagal memperbarui profil!');
      });
  };

  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center px-4 py-10 pt-24">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profil</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap Orang Tua</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru (Opsional)</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-300"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
