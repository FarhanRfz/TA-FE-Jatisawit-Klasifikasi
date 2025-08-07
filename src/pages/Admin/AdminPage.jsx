// src/pages/Admin/Dashboard.jsx
import AdminLayout from "../../layouts/AdminLayout";
import { useEffect, useState } from "react";
import api from "../../api"; // Sesuaikan path sesuai struktur proyek Anda
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const [totalRiwayat, setTotalRiwayat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalRiwayat = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Anda harus login terlebih dahulu.");
          setLoading(false);
          return;
        }

        const response = await api.get("/admin/riwayat-klasifikasi/total", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.total !== undefined) {
          setTotalRiwayat(response.data.total);
        } else {
          throw new Error("Data total tidak ditemukan dalam respons.");
        }
      } catch (error) {
        console.error("Gagal mengambil total riwayat:", error);
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Sesi Anda telah kedaluwarsa. Silakan login ulang.");
            localStorage.removeItem("token");
          } else if (error.response.status === 403) {
            toast.error("Anda tidak memiliki izin untuk mengakses data ini.");
          } else if (error.response.status === 404) {
            toast.error("Endpoint tidak ditemukan. Periksa konfigurasi server.");
          } else {
            toast.error("Gagal mengambil total riwayat klasifikasi.");
          }
        } else {
          toast.error("Terjadi kesalaman koneksi ke server.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTotalRiwayat();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Memuat total riwayat...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="text-center text-gray-500 mt-20 text-xl">
        Selamat datang di Dashboard Admin Puskesmas Jatisawit
      </div>
      <div className="text-center mt-10 text-4xl font-bold text-orange-600">
        Total Riwayat Klasifikasi: {totalRiwayat !== null ? totalRiwayat : "Loading..."}
      </div>
    </AdminLayout>
  );
};

export default AdminPage;