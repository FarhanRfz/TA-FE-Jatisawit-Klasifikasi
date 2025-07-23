import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RiwayatKlasifikasiPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/plain",
        },
        responseType: "blob",
      });

      if (!response || !response.data) {
        throw new Error("Gagal mengunduh file");
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `hasil_klasifikasi_${classificationId}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      await api.post(
        `/history/${classificationId}/export`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setHistory(
        history.map((item) =>
          item.id_ch === classificationId ? { ...item, exported: true } : item
        )
      );
      toast.success("File berhasil diunduh.");
    } catch (error) {
      console.error("Gagal mengunduh:", error);
      toast.error("Terjadi kesalahan saat mengunduh hasil.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Memuat riwayat...</p>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen bg-gray-600 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Riwayat Klasifikasi
        </h1>

        {history.length === 0 ? (
          <p className="text-gray-600 text-center">Tidak ada riwayat klasifikasi.</p>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.map((item) => (
                    <tr key={item.id_ch} className="hover:bg-gray-50 transition-colors">
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
                      <td className="px-4 py-4 whitespace-nowrap sm:table-cell hidden lg:table-cell">
                        <div className="text-sm text-gray-900">{item.deskripsi_status}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:table-cell hidden md:table-cell">
                        <div className="text-sm text-gray-900">
                          {new Date(item.waktu_klasifikasi).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        {!item.exported && (
                          <button
                            onClick={() => handleDownload(item.id_ch)}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                          >
                            Ekspor
                          </button>
                        )}
                        {item.exported && (
                          <span className="text-gray-500">Terkirim</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Layout untuk mobile dengan opsi detail */}
            <div className="sm:hidden space-y-4">
              {history.map((item) => (
                <div
                  key={item.id_ch}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.nama_anak}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Status: <span className={item.status_stunting === "stunting" ? "text-red-600" : "text-green-600"}>{item.status_stunting}</span>
                      </div>
                    </div>
                    <div>
                      {!item.exported && (
                        <button
                          onClick={() => handleDownload(item.id_ch)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                        >
                          Ekspor
                        </button>
                      )}
                      {item.exported && (
                        <span className="text-gray-500">Terkirim</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Umur: {item.umur} bulan</p>
                    <p>Berat: {item.berat_badan} kg</p>
                    <p>Tinggi: {item.tinggi_badan} cm</p>
                    <p>Jenis Kelamin: {item.jenis_kelamin}</p>
                    <p>Deskripsi: {item.deskripsi_status}</p>
                    <p>Waktu: {new Date(item.waktu_klasifikasi).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiwayatKlasifikasiPage;