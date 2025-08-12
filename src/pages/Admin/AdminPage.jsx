// src/pages/Admin/Dashboard.jsx
import AdminLayout from "../../layouts/AdminLayout";
import { useEffect, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const [totalRiwayat, setTotalRiwayat] = useState(null);
  const [totalBalita, setTotalBalita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Flag untuk mencegah setState setelah unmount

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Anda harus login terlebih dahulu.");
          if (isMounted) setLoading(false);
          return;
        }

        // Fetch total riwayat klasifikasi
        const riwayatResponse = await api.get("/admin/riwayat-klasifikasi/total", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (isMounted && riwayatResponse.data && riwayatResponse.data.total !== undefined) {
          setTotalRiwayat(riwayatResponse.data.total);
        } 

        // Fetch total data balita
        const balitaResponse = await api.get("/admin/orangtua-anak/total", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (isMounted && balitaResponse.data && balitaResponse.data.total !== undefined) {
          setTotalBalita(balitaResponse.data.total);
        } else {
          throw new Error("Data total balita tidak ditemukan dalam respons.");
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Sesi Anda telah kedaluwarsa. Silakan login ulang.");
            localStorage.removeItem("token");
          } else if (error.response.status === 403) {
            toast.error("Anda tidak memiliki izin untuk mengakses data ini.");
          } else if (error.response.status === 404) {
            toast.error("Endpoint tidak ditemukan. Periksa konfigurasi server.");
          } else {
            toast.error("Gagal mengambil data.");
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup saat komponen dilepas
    };
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Memuat data...</p>
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
      <div className="flex justify-between mt-10 px-4">
        {/* Kotak untuk Total Riwayat Klasifikasi (Kiri) */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl font-semibold">Total Riwayat Klasifikasi</h2>
          <p className="text-4xl font-bold mt-2">
            {totalRiwayat !== null ? totalRiwayat : "Loading..."}
          </p>
        </div>

        {/* Kotak untuk Total Data Balita (Kanan) */}
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl font-semibold">Total Data Balita</h2>
          <p className="text-4xl font-bold mt-2">
            {totalBalita !== null ? totalBalita : "Loading..."}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;