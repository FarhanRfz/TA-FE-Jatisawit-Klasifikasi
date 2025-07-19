import React, { useEffect, useState } from "react";
import Table from "../../../layouts/table/tabel";
import api from "../../../api";
import Modal from "../../../components/popup/Modal";
import Buttonsave from "../../../components/button/button-save";
import Buttoncancel from "../../../components/button/button-cancel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Umum = () => {
  const [logoDinas, setLogoDinas] = useState(null);
  const [logoPuskesmas, setLogoPuskesmas] = useState(null);
  const [previewLogoDinas, setPreviewLogoDinas] = useState(null);
  const [previewLogoPuskesmas, setPreviewLogoPuskesmas] = useState(null);
  const [nama_aplikasi, setNama_Aplikasi] = useState("");


  const [jenisKontak, setJenisKontak] = useState("");
  const [linkKontak, setLinkKontak] = useState("");
  const [kontakList, setKontakList] = useState([]);

  const [isModalShowOpen, setIsModalShowOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [selectedData, setSelectedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editJenisKontak, setEditJenisKontak] = useState("");
  const [editLinkKontak, setEditLinkKontak] = useState("");

  const [isSuccess, setIsSuccess] = useState(true);
  const [modalMessage, setModalMessage] = useState("");

  const semuaJenisKontak = ["Facebook", "Instagram", "Tiktok"];

  useEffect(() => {
    fetchKontak();
  }, [isModalDeleteOpen, isModalEditOpen]);

  useEffect(() => {
    if (selectedData) {
      setEditJenisKontak(selectedData.jenis_kontak || "");
      setEditLinkKontak(selectedData.link_kontak || "");
    }
  }, [selectedData]);

  useEffect(() => {
  const fetchAboutApp = async () => {
    try {
      const response = await api.get("/about-app");
      const setting = response.data.data;

      if (setting) {
        setNama_Aplikasi(setting.nama_aplikasi || "");
        if (setting.logo_dinas)
          setPreviewLogoDinas(`${import.meta.env.VITE_BASE_URL}/${setting.logo_dinas}`);
        if (setting.logo_puskesmas)
          setPreviewLogoPuskesmas(`${import.meta.env.VITE_BASE_URL}/${setting.logo_puskesmas}`);
      }
    } catch (err) {
      console.error("Gagal memuat pengaturan aplikasi:", err);
    }
  };

  fetchAboutApp();
}, []);


  const fetchKontak = async () => {
    try {
      const response = await api.get("/puskesmas-kontak");
      const data = Array.isArray(response.data) ? response.data : response.data.data;
      const formattedData = data.map((contact, index) => ({
        ...contact,
        no: index + 1,
      }));
      setKontakList(formattedData || []);
    } catch (error) {
      console.error("Gagal mengambil data kontak:", error);
      setKontakList([]);
    }
  };

  const handleAddKontak = async () => {
    if (!jenisKontak || !linkKontak) return;

    try {
      await api.post("/puskesmas-kontak", {
        jenis_kontak: jenisKontak,
        link_kontak: linkKontak,
      });
      setIsModalOpen(true);
      setIsSuccess(true);
      setModalMessage("Kontak berhasil ditambahkan");
      setTimeout(() => setIsModalOpen(false), 2000);
      await fetchKontak();
      setJenisKontak("");
      setLinkKontak("");
    } catch (error) {
  const errors = error.response?.data?.errors;
  console.error("Gagal menambahkan kontak:", errors || error.response?.data || error.message);

  const firstError = errors
    ? Object.values(errors)[0][0]
    : "Gagal menambahkan kontak";

  setIsModalOpen(true);
  setIsSuccess(false);
  setModalMessage(firstError);
  setTimeout(() => setIsModalOpen(false), 3000);
}
  };

  const handleShow = (item) => {
    setSelectedData(item);
    setIsModalShowOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedData(item);
    setIsEditing(true);
    setIsModalEditOpen(true);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!editJenisKontak || !editLinkKontak) return;

    try {
      await api.put(`/kontak-puskesmas/${selectedData.id}`, {
        jenis_kontak: editJenisKontak,
        link_kontak: editLinkKontak,
      });
      setIsModalOpen(true);
      setIsSuccess(true);
      setModalMessage("Kontak berhasil diubah");
      setTimeout(() => {
        setIsModalOpen(false);
        handleCloseEditModal();
      }, 2000);
    } catch (error) {
      console.error("Gagal mengedit kontak:", error);
      setIsModalOpen(true);
      setIsSuccess(false);
      setModalMessage("Gagal mengedit kontak");
      setTimeout(() => setIsModalOpen(false), 2000);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedData({ id });
    setIsModalDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/puskesmas-kontak/${selectedData.id}`);
      setIsModalOpen(true);
      setIsSuccess(true);
      setModalMessage("Kontak berhasil dihapus");
      setTimeout(() => {
        setIsModalOpen(false);
        setIsModalDeleteOpen(false);
        setSelectedData(null);
      }, 2000);
    } catch (error) {
      console.error("Gagal menghapus kontak:", error);
      setIsModalOpen(true);
      setIsSuccess(false);
      setModalMessage("Gagal menghapus kontak");
      setTimeout(() => setIsModalOpen(false), 2000);
    }
  };

  const handleCloseModal = () => {
    setIsModalShowOpen(false);
    setSelectedData(null);
    setIsModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsModalEditOpen(false);
    setSelectedData(null);
    setIsEditing(false);
    fetchKontak();
  };

  const handleCloseDeleteModal = () => {
    setIsModalDeleteOpen(false);
    setSelectedData(null);
  };

  const handleSaveAboutApp = async () => {
  const formData = new FormData();
  if (logoDinas) formData.append("logo_dinas", logoDinas);
  if (logoPuskesmas) formData.append("logo_puskesmas", logoPuskesmas);
  formData.append("nama_aplikasi", nama_aplikasi);

  try {
    await api.post("/about-app", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setIsModalOpen(true);
    setIsSuccess(true);
    setModalMessage("Pengaturan berhasil disimpan");
    setTimeout(() => setIsModalOpen(false), 2000);
  } catch (error) {
    console.error("Gagal menyimpan pengaturan aplikasi:", error);
    setIsModalOpen(true);
    setIsSuccess(false);
    setModalMessage("Gagal menyimpan pengaturan");
    setTimeout(() => setIsModalOpen(false), 2000);
  }
};


  const actions = {
    show: handleShow,
    edit: handleEdit,
    delete: handleDeleteClick,
  };

  return (
    <div className="p-6 font-sans">
      {/* Logo + Nama Aplikasi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Logo Dinas dan Puskesmas */}
        <div className="space-y-6">
          <div className="flex flex-wrap md:flex-nowrap gap-6 justify-between">
            {/* Logo Dinas */}
            <div className="flex flex-col items-center w-full md:w-1/2">
              <label className="block font-medium mb-2">Logo Dinas Daerah</label>
              <div className="bg-gray-200 rounded-lg w-28 h-36 flex items-center justify-center mb-2">
                {previewLogoDinas ? (
                  <img
                    src={previewLogoDinas}
                    alt="Logo Dinas"
                    className="object-contain max-w-full max-h-full"
                  />
                ) : (
                  <span className="text-gray-500 text-sm text-center">Preview</span>
                )}
              </div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setLogoDinas(file);
                    setPreviewLogoDinas(URL.createObjectURL(file));
                  }
                }}
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                Maks 3 MB. Format: JPG, JPEG, PNG
              </p>
            </div>

            {/* Logo Puskesmas */}
            <div className="flex flex-col items-center w-full md:w-1/2">
              <label className="block font-medium mb-2">Logo Puskesmas</label>
              <div className="bg-gray-200 rounded-lg w-28 h-36 flex items-center justify-center mb-2">
                {previewLogoPuskesmas ? (
                  <img
                    src={previewLogoPuskesmas}
                    alt="Logo Puskesmas"
                    className="object-contain max-w-full max-h-full"
                  />
                ) : (
                  <span className="text-gray-500 text-sm text-center">Preview</span>
                )}
              </div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setLogoPuskesmas(file);
                    setPreviewLogoPuskesmas(URL.createObjectURL(file));
                  }
                }}
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                Maks 3 MB. Format: JPG, JPEG, PNG
              </p>
            </div>
          </div>
        </div>

        {/* Nama Aplikasi */}
        <div className="space-y-6">
          <div className="w-full">
            <label className="block font-medium mb-2 text-left">Nama Aplikasi</label>
            <input
              type="text"
              value={nama_aplikasi}
              onChange={(e) => setNama_Aplikasi(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Nama Aplikasi"
            />
          </div>

          {/* Tombol Simpan */}
          <div>
            <button 
              onClick={handleSaveAboutApp}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded w-full">
              Simpan
            </button>
          </div>
        </div>
      </div>

      {/* Tambah Kontak */}
      <div className="bg-gray-100 p-4 rounded-md shadow-md mt-8 w-full">
        <h3 className="font-semibold mb-2">Tambah Kontak</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={jenisKontak}
            onChange={(e) => setJenisKontak(e.target.value)}
            className="mb-2 w-full border p-2 rounded"
          >
            <option value="">Pilih Jenis Kontak</option>
            {semuaJenisKontak
              .filter((jenis) => {
                if (!Array.isArray(kontakList)) return true;
                return !kontakList.some(
                  (item) => item.jenis_kontak?.toLowerCase() === jenis.toLowerCase()
                );
              })
              .map((jenis, index) => (
                <option key={index} value={jenis}>
                  {jenis}
                </option>
              ))}
          </select>

          <input
            placeholder="Link Kontak"
            value={linkKontak}
            onChange={(e) => setLinkKontak(e.target.value)}
            className="mb-2 w-full border p-2 rounded"
          />
        </div>

        <button
          onClick={handleAddKontak}
          disabled={!jenisKontak || !linkKontak}
          className={`${
            !jenisKontak || !linkKontak
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded w-full`}
        >
          Tambah
        </button>
      </div>

      {/* Tabel Kontak */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Daftar Kontak</h3>
        <Table
          tableData={kontakList}
          columns={[
            { label: "No", key: "no" },
            { label: "Jenis", key: "jenis_kontak" },
            { label: "Link", key: "link_kontak" },
          ]}
          units={["", ""]}
          onShow={handleShow}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          buttons={{ show: true, edit: true, delete: true }}
          idKey="id_contacts"
          actions={actions}
        />
      </div>

      {/* Modal untuk Show */}
      <Modal
        showHeader={true}
        isOpen={isModalShowOpen}
        onClose={handleCloseModal}
        title="Detail Data Kontak"
        className="w-full"
        backdropClassName="semi-transparent-backdrop" // Added for semi-transparent backdrop
      >
        {selectedData ? (
          <div className="text-sm text-gray-800">
            <div className="grid gap-2 mt-2">
              <div className="flex items-center mb-4">
                <p className="basis-[40%]">Jenis Kontak</p>
                <span className="flex flex-col text-start basis-[3%]">:</span>
                <p className="basis-[57%]">{selectedData.jenis_kontak}</p>
              </div>
              <div className="flex items-center mb-4">
                <p className="basis-[40%]">Link Kontak</p>
                <span className="flex flex-col text-start basis-[3%]">:</span>
                <p className="basis-[57%]">{selectedData.link_kontak}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Tidak ada data untuk ditampilkan.
          </p>
        )}
      </Modal>

      {/* Modal untuk Edit */}
      {isEditing && (
        <Modal
          isOpen={isModalEditOpen}
          onClose={handleCloseEditModal}
          title="Ubah Data Kontak"
          showHeader={true}
          className="font-sans w-[42rem]"
          backdropClassName="semi-transparent-backdrop" // Added for semi-transparent backdrop
        >
          <span className="text-gray-800 text-sm">
            Perubahan data Kontak
            <br />
            Pastikan data yang Anda masukkan sudah benar!
          </span>
          <hr className="border-2 border-teal-500 mt-2" />
          <form onSubmit={handleSubmitEdit} className="p-6">
            <div className="flex items-center mt-2">
              <label className="basis-[30%] block text-sm font-medium text-gray-700">
                Jenis Kontak
              </label>
              <div className="flex basis-[70%]">
                <select
                  value={editJenisKontak}
                  onChange={(e) => setEditJenisKontak(e.target.value)}
                  className="border border-gray-300 rounded-l-lg px-2 py-1 w-full"
                >
                  <option value="">Pilih Jenis Kontak</option>
                  {semuaJenisKontak.map((jenis, index) => (
                    <option key={index} value={jenis}>
                      {jenis}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <label className="basis-[30%] block text-sm font-medium text-gray-700">
                Link Kontak
              </label>
              <div className="flex basis-[70%]">
                <input
                  type="text"
                  value={editLinkKontak}
                  onChange={(e) => setEditLinkKontak(e.target.value)}
                  className="border border-gray-300 rounded-l-lg px-2 py-1 w-full"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-start gap-4">
              <Buttonsave text="Simpan Perubahan" type="submit" />
              <Buttoncancel text="Batal" onClick={handleCloseEditModal} />
            </div>
          </form>
        </Modal>
      )}

      {/* Modal untuk Feedback */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        showHeader={false}
        backdropClassName="semi-transparent-backdrop" // Added for semi-transparent backdrop
      >
        <div className="flex p-4 items-center gap-2">
          <div
            className={`text-white w-10 h-10 rounded-full flex items-center justify-center ${
              isSuccess ? "bg-teal-300" : "bg-red-500"
            }`}
          >
            <FontAwesomeIcon icon={isSuccess ? faCheck : faExclamationTriangle} />
          </div>
          <p>{modalMessage}</p>
        </div>
      </Modal>

      {/* Modal untuk Delete Confirmation */}
      <Modal
        isOpen={isModalDeleteOpen}
        onClose={handleCloseDeleteModal}
        className="w-80 font-sans"
        backdropClassName="semi-transparent-backdrop" // Added for semi-transparent backdrop
      >
        <div className="flex flex-col justify-center">
          <span className="flex justify-center items-center mb-4">
            Lanjutkan hapus data?
          </span>
          <div className="grid grid-cols-2 space-x-4">
            <button
              onClick={handleCloseDeleteModal}
              className="bg-[#4DF1C3] border border-solid border-[#00C59C] h-10 text-white px-4 rounded-xl hover:bg-teal-500 font-sans"
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              className="bg-[#FE3D00] border border-solid border-[#C00000] h-10 text-white px-4 rounded-xl hover:bg-red-600 font-sans"
            >
              Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Umum;