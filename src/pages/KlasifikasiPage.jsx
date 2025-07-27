import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/Herosection";
import anakPuzle from "../assets/image/puzle.jpg";
import api from "../api";
import { toast } from 'react-toastify';

const KlasifikasiPage = () => {
  const [formData, setFormData] = useState({
    namaAnak: "",
    umur: "",
    beratBadan: "",
    tinggiBadan: "",
    jenisKelamin: "",
  });

  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Anda harus login terlebih dahulu!");
    setTimeout(() => 
    navigate("/login"), 2500);
    return;
  }

  setLoading(true);
  setHasil(null);

  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/predict",
      {
        nama_anak: formData.namaAnak,
        jenis_kelamin: formData.jenisKelamin.toLowerCase(),
        umur: parseFloat(formData.umur),
        tinggi_badan: parseFloat(formData.tinggiBadan),
        berat_badan: parseFloat(formData.beratBadan),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json", // tambahkan ini untuk memastikan Laravel tidak redirect
        },
      }
    );

    const result = response.data;
    setHasil({
      classification: result.status,
      deskripsi_status: result.deskripsi_status,
      classification_id: result.classification_id,
    });
    setShowResult(true);
  } catch (error) {
    console.error("Gagal memproses:", error);
    setHasil({
      classification: "Error",
      keterangan: "Terjadi kesalahan saat menghubungi server prediksi.",
    });
    setShowResult(true);
  } finally {
    setLoading(false);
  }
};

  const handleBack = () => {
    setFormData({
      namaAnak: "",
      umur: "",
      beratBadan: "",
      tinggiBadan: "",
      jenisKelamin: "",
    });
    setHasil(null);
    setShowResult(false);
  };

  const handleDownload = async () => {
    const token = localStorage.getItem("token");
    if (!token || !hasil?.classification_id) {
      toast.error("Anda harus login dan memiliki hasil untuk mengunduh.");
      return;
    }

    try {
      const response = await api.get(
        `/export/${hasil.classification_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'text/plain',
          },
          responseType: 'blob', // penting!
        }
      );

      if (!response || !response.data) {
  throw new Error("Gagal mengunduh file");
}

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `hasil_klasifikasi.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal mengunduh:", error);
      toast.error("Terjadi kesalahan saat mengunduh hasil.");
    }
  };

  return (
    <div className="font-sans">
      <HeroSection
        heroSectionImage={anakPuzle}
        text="Klasifikasi Stunting Anak"
        showButton1={true}
        buttonText1="Selengkapnya"
        scrollTarget1="#Stunting"
      />

      <div className="max-w-xl mx-auto bg-white p-8 mt-10 pb-18 rounded shadow" id="Stunting">
        {!showResult ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Klasifikasi Stunting</h2>
            <p className="mb-6 text-gray-600">
              Masukkan data anak Anda untuk memeriksa status perkembangan:
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Nama Anak</label>
                <input
                  type="text"
                  name="namaAnak"
                  value={formData.namaAnak}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  placeholder="Masukkan Nama Anak"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Umur (bulan)</label>
                <input
                  type="number"
                  name="umur"
                  value={formData.umur}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  placeholder="6 - 24 bulan"
                  min="6"
                  max="24"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Berat Badan (kg)</label>
                <input
                  type="number"
                  name="beratBadan"
                  value={formData.beratBadan}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  placeholder="Berat dalam kilogram"
                  min="4"
                  max="16"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Tinggi Badan (cm)</label>
                <input
                  type="number"
                  name="tinggiBadan"
                  value={formData.tinggiBadan}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  placeholder="Tinggi dalam cm"
                  min="60"
                  max="100"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Jenis Kelamin</label>
                <select
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  {loading ? "Memproses..." : "Tampilkan Status Anak"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              Hasil Klasifikasi Perkembangan Anak Anda
            </h2>
            <div className="space-y-2 text-gray-800">
              <p>
                <strong>Nama Anak:</strong> {formData.namaAnak}
              </p>
              <p>
                <strong>Umur:</strong> {formData.umur} bulan
              </p>
              <p>
                <strong>Berat Badan:</strong> {formData.beratBadan} kg
              </p>
              <p>
                <strong>Tinggi Badan:</strong> {formData.tinggiBadan} cm
              </p>
              <p>
                <strong>Jenis Kelamin:</strong> {formData.jenisKelamin}
              </p>
              <hr className="my-2" />
              <p>
                <strong>Status Anak:</strong> {hasil.classification}
              </p>
              <p>
                <strong>Keterangan:</strong> {hasil.deskripsi_status}
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleBack}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
              >
                Klasifikasi Ulang
              </button>

              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                Unduh Hasil
              </button>
            </div>
          </>
        )}
        
      </div>
    </div>
  );
};

export default KlasifikasiPage;
