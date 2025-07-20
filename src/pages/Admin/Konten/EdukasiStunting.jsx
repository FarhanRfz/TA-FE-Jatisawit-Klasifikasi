import React, { useState, useEffect } from "react";
import api from "../../../api"; // pastikan file ini mengatur base URL ke Laravel
import Modal from "../../../components/popup/Modal";
import { toast } from "react-toastify";

const Edukasi = () => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [informasi, setInformasi] = useState("");
    const [isSuccess, setIsSuccess] = useState(true);
    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data saat pertama load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/edukasi-stunting");
        const data = response.data.data;

        if (data) {
          setJudul(data.judul);
          setDeskripsi(data.deskripsi);
          setInformasi(data.informasi_stunting);
        }
      } catch (error) {
        console.error("Gagal mengambil data edukasi:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await api.post("/edukasi-stunting", {
        judul: judul,
        deskripsi: deskripsi,
        informasi_stunting: informasi
      });
      toast.success("Data Edukasi Berhasil Disimpan");
    } catch (error) {
      console.error("Gagal menyimpan edukasi:", error);
      toast.error("Gagal menyimpan data");
    }
  };

  const handleCloseModal = () => {
  setIsModalOpen(false);
};

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edukasi Stunting</h2>

      <label className="block mb-2">Judul</label>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        placeholder="Masukkan Judul"
      />

      <label className="block mb-2">
        Deskripsi Singkat
        <p className="text-xs text-gray-500 mt-1 text-left">
        Ini untuk ditampilkan di bagian Halaman Home
      </p>
      </label>
      <textarea
        className="w-full p-2 border rounded mb-4"
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
        placeholder="Masukkan Deskripsi Singkat"
      ></textarea>

      <label className="block mb-2">
        Informasi Stunting
        <p className="text-xs text-gray-500 mt-1 text-left">
        Ini untuk ditampilkan di bagian Halaman Edukasi Stunting
      </p>
      </label>
      <textarea
        className="w-full p-2 border rounded mb-4"
        value={informasi}
        onChange={(e) => setInformasi(e.target.value)}
        placeholder="Masukkan Informasi Stunting"
        rows="6"
      ></textarea>

      <button
        onClick={handleSubmit}
        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded"
      >
        Simpan
      </button>

      <Modal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  showHeader={false}
  backdropClassName="semi-transparent-backdrop"
>
  <div className="flex p-4 items-center gap-2">
    <div
      className={`text-white w-10 h-10 rounded-full flex items-center justify-center ${
        isSuccess ? "bg-teal-300" : "bg-red-500"
      }`}
    >
      {isSuccess ? "✓" : "!"}
    </div>
    <p>{modalMessage}</p>
  </div>
</Modal>

    </div>
  );
};

export default Edukasi;
