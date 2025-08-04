import AdminLayout from '../../../layouts/AdminLayout';
import { useState, useEffect } from 'react';
import api from '../../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFilterSortPagination from '../../../hooks/useFilterSortPagination';

const formatDate = (dateString) => {
  if (!dateString || dateString === '-') return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const RiwayatKlasifikasiAdmin = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    currentPage,
    totalPages,
    goToPage,
    paginatedData,
  } = useFilterSortPagination(history, { defaultSort: 'latest', itemsPerPage: 10 });

  useEffect(() => {
    const fetchAdminHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Anda harus login terlebih dahulu.');
          return;
        }

        const response = await api.get('/admin/history', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        if (!response || !response.data) {
          throw new Error('Gagal mengambil data riwayat klasifikasi.');
        }

        const dataWithNo = response.data.map((item, index) => ({
          ...item,
          no: index + 1,
          user_nama: item.user?.username || 'Tidak diketahui',
          nama_lengkap_orangtua: item.user?.nama_lengkap_orangtua || 'Tidak diketahui',
          waktu_klasifikasi: formatDate(item.waktu_klasifikasi), // Tetap format untuk tampilan
          original_waktu_klasifikasi: item.waktu_klasifikasi, // Simpan tanggal asli untuk pengurutan
        }));
        setHistory(dataWithNo);
      } catch (error) {
        console.error('Gagal mengambil riwayat:', error);
        if (error.response && error.response.status === 404) {
          toast.error('Endpoint tidak ditemukan. Periksa konfigurasi server.');
        } else if (error.response && error.response.status === 403) {
          toast.error('Anda tidak memiliki izin untuk mengakses halaman ini.');
        } else {
          toast.error('Gagal mengambil riwayat klasifikasi.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminHistory();
  }, []);

  const handleDownload = async (classificationId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Anda harus login untuk mengunduh.');
        return;
      }

      const response = await api.get(`/export/${classificationId}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'text/plain' },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `hasil_klasifikasi_${classificationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('File berhasil diunduh dari server.');
    } catch (error) {
      console.error('Gagal mengunduh:', error);
      if (error.response && error.response.status === 404) {
        toast.error('File tidak ditemukan di server.');
      } else {
        toast.error('Terjadi kesalahan saat mengunduh hasil.');
      }
    }
  };

  const paginatedDataWithNo = paginatedData.map((item, index) => ({
    ...item,
    no: (currentPage - 1) * 10 + index + 1,
  }));

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Memuat riwayat...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Riwayat Klasifikasi (Admin)</h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Cari nama anak / pengguna / orang tua"
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
            <option value="name-asc">Nama Anak (A-Z)</option>
            <option value="name-desc">Nama Anak (Z-A)</option>
          </select>
        </div>

        {paginatedDataWithNo.length === 0 ? (
          <p className="text-gray-600 text-center py-10">Tidak ada riwayat klasifikasi.</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Tabel untuk layar besar */}
            <div className="hidden sm:block">
              <table className="min-w-full divide-y divide-red-200">
                <thead className="bg-red-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Nama Pengguna
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Nama Orangtua
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Nama Anak
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sm:table-cell hidden md:table-cell">
                      Umur (bulan)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sm:table-cell hidden lg:table-cell">
                      Berat Badan (kg)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sm:table-cell hidden lg:table-cell">
                      Tinggi Badan (cm)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sm:table-cell hidden md:table-cell">
                      Jenis Kelamin
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Status Stunting
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sm:table-cell hidden lg:table-cell">
                      Deskripsi Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sm:table-cell hidden md:table-cell">
                      Waktu Klasifikasi
                    </th>
                    {/* <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-32">
                      Aksi
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedDataWithNo.map((item) => (
                    <tr key={item.id_ch} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.no}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.user_nama}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.nama_lengkap_orangtua}</div>
                      </td>
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
                            item.status_stunting === 'stunting'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {item.status_stunting}
                        </span>
                      </td>
                      <td className="px-4 py-4 break-words">
                        <div className="text-sm text-gray-900">{item.deskripsi_status}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:table-cell hidden md:table-cell">
                        <div className="text-sm text-gray-900">{item.waktu_klasifikasi}</div>
                      </td>
                      {/* <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDownload(item.id_ch)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                        >
                          {item.exported ? 'Unduh' : 'Ekspor'}
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Layout untuk mobile */}
            <div className="sm:hidden space-y-4">
              {paginatedDataWithNo.map((item) => (
                <div
                  key={item.id_ch}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.nama_anak} (No. {item.no})
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Status: <span className={item.status_stunting === 'stunting' ? 'text-red-600' : 'text-green-600'}>{item.status_stunting}</span>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDownload(item.id_ch)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                      >
                        {item.exported ? 'Unduh' : 'Ekspor'}
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 grid grid-cols-1 gap-1">
                    <p><span className="font-semibold">Pengguna:</span> {item.user_nama}</p>
                    <p><span className="font-semibold">Orang Tua:</span> {item.nama_lengkap_orangtua}</p>
                    <p><span className="font-semibold">Umur:</span> {item.umur} bulan</p>
                    <p><span className="font-semibold">Berat:</span> {item.berat_badan} kg</p>
                    <p><span className="font-semibold">Tinggi:</span> {item.tinggi_badan} cm</p>
                    <p><span className="font-semibold">Jenis Kelamin:</span> {item.jenis_kelamin}</p>
                    <p><span className="font-semibold">Deskripsi:</span> {item.deskripsi_status}</p>
                    <p><span className="font-semibold">Waktu:</span> {item.waktu_klasifikasi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default RiwayatKlasifikasiAdmin;