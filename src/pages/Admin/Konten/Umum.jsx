import React, { useEffect, useState } from "react";
import api from "../../../api";
import Buttonsave from "../../../components/button/button-save";
import Buttoncancel from "../../../components/button/button-cancel";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Umum = () => {
  const [logoDinas, setLogoDinas] = useState(null);
  const [logoPuskesmas, setLogoPuskesmas] = useState(null);
  const [previewLogoDinas, setPreviewLogoDinas] = useState(null);
  const [previewLogoPuskesmas, setPreviewLogoPuskesmas] = useState(null);
  const [nama_aplikasi, setNama_Aplikasi] = useState("");

  const [jenisKontak, setJenisKontak] = useState("");
  const [linkKontak, setLinkKontak] = useState("");
  const [kontakList, setKontakList] = useState([]);

  const [selectedData, setSelectedData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editJenisKontak, setEditJenisKontak] = useState("");
  const [editLinkKontak, setEditLinkKontak] = useState("");

  const semuaJenisKontak = ["Facebook", "Instagram", "Tiktok"];

  useEffect(() => {
    fetchKontak();
  }, []);

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

        const baseUrl = "http://localhost:8000";

        if (setting) {
          setNama_Aplikasi(setting.nama_aplikasi || "");
          if (setting.logo_dinas)
            setPreviewLogoDinas(`${baseUrl}/storage/${setting.logo_dinas}`);
          if (setting.logo_puskesmas)
            setPreviewLogoPuskesmas(`${baseUrl}/storage/${setting.logo_puskesmas}`);
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
      toast.success("Kontak berhasil ditambahkan", { position: "top-right", autoClose: 3000 });
      await fetchKontak();
      setJenisKontak("");
      setLinkKontak("");
    } catch (error) {
      const errors = error.response?.data?.errors;
      console.error("Gagal menambahkan kontak:", errors || error.response?.data || error.message);

      const firstError = errors
        ? Object.values(errors)[0][0]
        : "Gagal menambahkan kontak";
      toast.error(firstError, { position: "top-right", autoClose: 3000 });
    }
  };

  const handleShow = (item) => {
    setSelectedData(item);
    toast.info(
      <div>
        <p><strong>Jenis Kontak:</strong> {item.jenis_kontak}</p>
        <p><strong>Link Kontak:</strong> {item.link_kontak}</p>
      </div>,
      { position: "top-right", autoClose: 5000 }
    );
  };

  const handleEdit = (item) => {
    setSelectedData(item);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!editJenisKontak || !editLinkKontak) return;

    try {
      await api.put(`/kontak-puskesmas/${selectedData.id}`, {
        jenis_kontak: editJenisKontak,
        link_kontak: editLinkKontak,
      });
      toast.success("Kontak berhasil diubah", { position: "top-right", autoClose: 3000 });
      setIsEditModalOpen(false);
      setSelectedData(null);
      await fetchKontak();
    } catch (error) {
      console.error("Gagal mengedit kontak:", error);
      toast.error("Gagal mengedit kontak", { position: "top-right", autoClose: 3000 });
    }
  };

  const handleDeleteClick = (item) => {
    console.log("Item received in deleteClick:", item);
    if (!item || !item.id_contacts) {
      toast.error("Data tidak valid untuk penghapusan", { position: "top-right", autoClose: 3000 });
      return;
    }
    setSelectedData(item);
    toast.warn(
      <div>
        <p>Apakah Anda yakin ingin menghapus kontak {item.jenis_kontak}?</p>
        <div className="mt-2 flex justify-end space-x-4">
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={() => { handleDelete(item.id_contacts); }}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </div>,
      { position: "top-right", autoClose: false, closeButton: true }
    );
  };

  const handleDelete = async (id) => {
    console.log("Deleting with ID:", id);
    if (!id) {
      console.error("ID tidak valid untuk penghapusan:", selectedData);
      toast.error("ID data tidak valid", { position: "top-right", autoClose: 3000 });
      return;
    }

    try {
      await api.delete(`/puskesmas-kontak/${id}`);
      toast.success("Kontak berhasil dihapus", { position: "top-right", autoClose: 3000 });
      await fetchKontak();
      setSelectedData(null);
    } catch (error) {
      console.error("Gagal menghapus kontak:", error);
      toast.error("Gagal menghapus kontak", { position: "top-right", autoClose: 3000 });
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
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
      toast.success("Pengaturan berhasil disimpan", { position: "top-right", autoClose: 3000 });
    } catch (error) {
      console.error("Gagal menyimpan pengaturan aplikasi:", error);
      toast.error("Gagal menyimpan pengaturan", { position: "top-right", autoClose: 3000 });
    }
  };

  const renderUploadBox = (label, preview, onChange, setFile) => (
    <div className="flex flex-col items-center">
      <label className="font-medium mb-2 text-center">{label}</label>
      <div className="w-28 h-36 bg-gray-200 rounded flex items-center justify-center mb-2">
        {preview ? (
          <img src={preview} className="object-contain max-w-full max-h-full" alt={label} />
        ) : (
          <span className="text-gray-500 text-sm">Preview</span>
        )}
      </div>
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setFile(file);
            onChange(URL.createObjectURL(file));
          }
        }}
      />
      <p className="text-xs text-gray-500 mt-1 text-center">
        Maks 3 MB. Format: JPG, JPEG, PNG
      </p>
    </div>
  );

  const actions = {
    show: handleShow,
    edit: handleEdit,
    delete: handleDeleteClick,
  };

  return (
    <div className="p-6 font-sans">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Logo + Nama Aplikasi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Logo Dinas dan Puskesmas */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderUploadBox(
              "Logo Dinas Daerah",
              previewLogoDinas,
              setPreviewLogoDinas,
              setLogoDinas
            )}
            {renderUploadBox(
              "Logo Puskesmas",
              previewLogoPuskesmas,
              setPreviewLogoPuskesmas,
              setLogoPuskesmas
            )}
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
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded w-full"
            >
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
              .filter((jenis) => !kontakList.some((item) => item.jenis_kontak?.toLowerCase() === jenis.toLowerCase()))
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
        <div className="bg-red-200 shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Jenis</th>
                <th className="px-30 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Link</th>
                <th className="px-8 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-32">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {kontakList.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center text-gray-600">
                    Tidak ada data kontak.
                  </td>
                </tr>
              ) : (
                kontakList.map((item) => (
                  <tr key={item.id_contacts} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.no}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.jenis_kontak}</div>
                    </td>
                    <td className="px-4 py-4 break-words">
                      <div className="text-sm text-gray-900">{item.link_kontak}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-yellow-900 transition-colors duration-200 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal untuk Edit */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h4 className="text-lg font-semibold mb-4 text-center">Edit Kontak</h4>
            <form onSubmit={handleSubmitEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Jenis Kontak</label>
                <select
                  value={editJenisKontak}
                  onChange={(e) => setEditJenisKontak(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Pilih Jenis Kontak</option>
                  {semuaJenisKontak.map((jenis, index) => (
                    <option key={index} value={jenis}>
                      {jenis}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Link Kontak</label>
                <input
                  type="text"
                  value={editLinkKontak}
                  onChange={(e) => setEditLinkKontak(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <Buttoncancel text="Batal" onClick={handleCloseEditModal} />
                <Buttonsave text="Simpan" type="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Umum;