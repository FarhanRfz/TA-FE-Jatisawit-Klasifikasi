import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFilterSortPagination from "../hooks/useFilterSortPagination";

const RiwayatKlasifikasiPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    currentPage,
    totalPages,
    goToPage,
    paginatedData,
  } = useFilterSortPagination(history, { defaultSort: "latest", itemsPerPage: 5 });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Anda harus login terlebih dahulu.");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        const response = await api.get("/history", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response || !response.data) {
          throw new Error("Gagal mengambil data riwayat klasifikasi.");
        }

        setHistory(response.data);
      } catch (error) {
        console.error("Gagal mengambil riwayat:", error);
        toast.error("Gagal mengambil riwayat klasifikasi.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  const handleDownload = async (classificationId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Anda harus login untuk mengunduh.");
        return;
      }

      const response = await api.get(`/export/${classificationId}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "text/plain" },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `hasil_klasifikasi_${classificationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("File berhasil diunduh dari server.");
    } catch (error) {
      console.error("Gagal mengunduh:", error);
      if (error.response && error.response.status === 404) {
        toast.error("File tidak ditemukan di server. Silakan coba lagi atau hubungi admin.");
      } else {
        toast.error("Terjadi kesalahan saat mengunduh hasil.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Memuat riwayat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen bg-gray-600 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Riwayat Klasifikasi</h1>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Cari nama anak..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="latest">Tanggal Terbaru</option>
            <option value="oldest">Tanggal Terlama</option>
            <option value="name-asc">Nama (A-Z)</option>
            <option value="name-desc">Nama (Z-A)</option>
          </select>
        </div>

        {paginatedData.length === 0 ? (
          <p className="text-gray-600 text-center py-10">Tidak ada riwayat klasifikasi.</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Tabel untuk layar besar */}
            <div className="hidden sm:block">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Anak
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:table-cell hidden md:table-cell">
                      Umur (bulan)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:table-cell hidden lg:table-cell">
                      Berat Badan (kg)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:table-cell hidden lg:table-cell">
                      Tinggi Badan (cm)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:table-cell hidden md:table-cell">
                      Jenis Kelamin
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status Stunting
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:table-cell hidden lg:table-cell">
                      Deskripsi Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:table-cell hidden md:table-cell">
                      Waktu Klasifikasi
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedData.map((item) => (
                    <tr key={item.id_ch} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.nama_anak}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:table-cell hidden md:table-cell">
                        <div className="text-sm text-gray-900">{item.umur}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:table-cell hidden lg:table-cell">
                        <div className="text-sm text-gray-900">{item.berat_badan}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:table-cell hidden lg:table-cell">
                        <div className="text-sm text-gray-900">{item.tinggi_badan}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:table-cell hidden md:table-cell">
                        <div className="text-sm text-gray-900">{item.jenis_kelamin}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.status_stunting === "stunting"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.status_stunting}
                        </span>
                      </td>
                      <td className="px-4 py-4 break-words">
                        <div className="text-sm text-gray-900">{item.deskripsi_status}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:table-cell hidden md:table-cell">
                        <div className="text-sm text-gray-900">
                          {new Date(item.waktu_klasifikasi).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDownload(item.id_ch)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                        >
                          {item.exported ? "Unduh" : "Ekspor"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Layout untuk mobile dengan opsi detail */}
            <div className="sm:hidden space-y-4">
              {paginatedData.map((item) => (
                <div
                  key={item.id_ch}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.nama_anak}</div>
                      <div className="text-sm text-gray-600">
                        Status: <span className={item.status_stunting === "stunting" ? "text-red-600" : "text-green-600"}>{item.status_stunting}</span>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDownload(item.id_ch)}
                        className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
                      >
                        {item.exported ? "Unduh" : "Ekspor"}
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 grid grid-cols-1 gap-1">
                    <p><span className="font-semibold">Umur:</span> {item.umur} bulan</p>
                    <p><span className="font-semibold">Berat:</span> {item.berat_badan} kg</p>
                    <p><span className="font-semibold">Tinggi:</span> {item.tinggi_badan} cm</p>
                    <p><span className="font-semibold">Jenis Kelamin:</span> {item.jenis_kelamin}</p>
                    <p><span className="font-semibold">Deskripsi:</span> {item.deskripsi_status}</p>
                    <p><span className="font-semibold">Waktu:</span> {new Date(item.waktu_klasifikasi).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            >
              Prev
            </button>
            <span className="text-white">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiwayatKlasifikasiPage;