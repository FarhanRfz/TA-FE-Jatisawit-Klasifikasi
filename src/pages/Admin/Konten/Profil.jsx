import React, { useEffect, useState } from "react";
import api from "../../../api";

const Profil = () => {
  const [foto_bersama, setfoto_bersama] = useState(null);
  const [previewfoto_bersama, setPreviewfoto_bersama] = useState(null);

  const [struktur_organisasi, setstruktur_organisasi] = useState(null);
  const [previewstruktur_organisasi, setPreviewstruktur_organisasi] = useState(null);

  const [peta_wilayah_kerja, setpeta_wilayah_kerja] = useState(null);
  const [previewpetawilayahkerja, setPreviewpetawilayahkerja] = useState(null);

  const [judul, setJudul] = useState("");
  const [deskripsi_profil, setDeskripsi_profil] = useState("");
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [motto_tatanilai, setMotto_tatanilai] = useState("");
  const [tujuan, setTujuan] = useState("");

  useEffect(() => {
  const fetchProfil = async () => {
    try {
      const response = await api.get("/profil-puskesmas");
      const data = response.data;

      if (data) {
        setJudul(data.judul || "");
        setDeskripsi_profil(data.deskripsi_profil || "");
        setVisi(data.visi || "");
        setMisi(data.misi || "");
        setMotto_tatanilai(data.motto_tatanilai || "");
        setTujuan(data.tujuan || "");

        // Cek dan set gambar jika ada
        if (data.foto_bersama) {
          setPreviewfoto_bersama(`${import.meta.env.VITE_API_BASE_URL}/storage/${data.foto_bersama}`);
        }
        if (data.struktur_organisasi) {
          setPreviewstruktur_organisasi(`${import.meta.env.VITE_API_BASE_URL}/storage/${data.struktur_organisasi}`);
        }
        if (data.peta_wilayah_kerja) {
          setPreviewpetawilayahkerja(`${import.meta.env.VITE_API_BASE_URL}/storage/${data.peta_wilayah_kerja}`);
        }
      }
    } catch (err) {
      console.error("Gagal mengambil data profil:", err);
    }
  };

  fetchProfil();
}, []);


  const handleSubmit = async () => {
    const formData = new FormData();
    if (foto_bersama) formData.append("foto_bersama", foto_bersama);
    if (struktur_organisasi) formData.append("struktur_organisasi", struktur_organisasi);
    if (peta_wilayah_kerja) formData.append("peta_wilayah_kerja", peta_wilayah_kerja);
    formData.append("judul", judul);
    formData.append("deskripsi_profil", deskripsi_profil);
    formData.append("visi", visi);
    formData.append("misi", misi);
    formData.append("motto_tatanilai", motto_tatanilai);
    formData.append("tujuan", tujuan);

    try {
      await api.post("/profil-puskesmas", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Data berhasil disimpan!");
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      alert("Gagal menyimpan data!");
    }
  };

  const renderUploadBox = (label, preview, onChange) => (
    <div className="flex flex-col items-center">
      <label className="font-medium mb-2 text-center">{label}</label>
      <div className="w-28 h-36 bg-gray-200 rounded flex items-center justify-center mb-2">
        {preview ? (
          <img src={preview} className="object-contain max-w-full max-h-full" />
        ) : (
          <span className="text-gray-500 text-sm">Preview</span>
        )}
      </div>
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={onChange}
      />
      <p className="text-xs text-gray-500 mt-1 text-center">
        Maks 3 MB. Format: JPG, JPEG, PNG
      </p>
    </div>
  );

  return (
    <div className="p-6 font-sans">
      {/* Upload 3 Foto (berjejer) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {renderUploadBox("Foto Bersama Keluarga Puskesmas", previewfoto_bersama, (e) => {
          const file = e.target.files[0];
          setfoto_bersama(file);
          setPreviewfoto_bersama(URL.createObjectURL(file));
        })}
        {renderUploadBox("Foto Struktur Organisasi", previewstruktur_organisasi, (e) => {
          const file = e.target.files[0];
          setstruktur_organisasi(file);
          setPreviewstruktur_organisasi(URL.createObjectURL(file));
        })}
        {renderUploadBox("Peta Wilayah Kerja", previewpetawilayahkerja, (e) => {
          const file = e.target.files[0];
          setpeta_wilayah_kerja(file);
          setPreviewpetawilayahkerja(URL.createObjectURL(file));
        })}
      </div>

      {/* Form Text Input */}
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">
            Judul
            <p className="text-xs text-gray-500 mt-1 text-left">
        Ini untuk ditampilkan di bagian Halaman Home
      </p>
            </label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Deskripsi Singkat
            <p className="text-xs text-gray-500 mt-1 text-left">
        Ini untuk ditampilkan di bagian Halaman Home
      </p>
            </label>
          <textarea
            rows="2"
            value={deskripsi_profil}
            onChange={(e) => setDeskripsi_profil(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Masukkan Deskripsi Singkat"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Visi
            <p className="text-xs text-gray-500 mt-1 text-left">
        Ini untuk ditampilkan di bagian Halaman Profil Puskesmas
      </p>
            </label>
          <textarea
            rows="2"
            value={visi}
            onChange={(e) => setVisi(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Masukkan Visi"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Misi
            <p className="text-xs text-gray-500 mt-1 text-left">
        Ini untuk ditampilkan di bagian Halaman Profil Puskesmas
      </p>
          </label>
          <textarea
            rows="2"
            value={misi}
            onChange={(e) => setMisi(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Masukkan Misi"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            MOTTO & TATANILAI
            <p className="text-xs text-gray-500 mt-1 text-left">
        Ini untuk ditampilkan di bagian Halaman Profil Puskesmas
      </p>
            </label>
          <textarea
            rows="2"
            value={motto_tatanilai}
            onChange={(e) => setMotto_tatanilai(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Masukkan Motto & Tatanilai"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Tujuan
            <p className="text-xs text-gray-500 mt-1 text-left">
        Ini untuk ditampilkan di bagian Halaman Profil Puskesmas
      </p>
            </label>
          <textarea
            rows="2"
            value={tujuan}
            onChange={(e) => setTujuan(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Masukkan Tujuan"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded w-full mt-4"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default Profil;
