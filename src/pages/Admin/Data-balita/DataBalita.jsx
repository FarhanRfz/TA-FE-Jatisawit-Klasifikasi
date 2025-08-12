import AdminLayout from '../../../layouts/AdminLayout';
import { useState, useEffect } from 'react';
import FormAddBalita from './formaddbalita';
import FormEditBalita from './formeditbalita';
import api from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
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

const DataBalita = () => {
  const [balitaData, setBalitaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const {
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    currentPage,
    totalPages,
    goToPage,
    paginatedData,
  } = useFilterSortPagination(balitaData, { defaultSort: 'tanggal_lahir_anak', itemsPerPage: 10 });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token tidak ditemukan di localStorage');
        setLoading(false);
        setError('Silakan login terlebih dahulu.');
        return;
      }

      try {
        const response = await api.get("/admin/ortu-anak", token);
        if (!response || !response.data) {
          throw new Error('Gagal mengambil data dari server.');
        }
        console.log('Data dari API:', response.data);
        const dataWithNo = response.data.map((item, index) => ({
          ...item,
          no: index + 1,
          jenis_kelamin_anak: item.jenis_kelamin_anak === 'L' ? 'L' : 'P',
          tanggal_lahir_anak: formatDate(item.tanggal_lahir_anak),
        }));
        setBalitaData(dataWithNo);
        setError(null);
      } catch (error) {
        console.error('Error mengambil data:', error.message);
        setError('Gagal memuat data dari server. Periksa koneksi atau hubungi admin.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (data) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token tidak ditemukan di localStorage');
      setError('Silakan login terlebih dahulu.');
      return;
    }

    let idToDelete;
    if (typeof data === 'number' || typeof data === 'string') {
      idToDelete = data;
    } else if (data && data.id_ota) {
      idToDelete = data.id_ota;
    } else {
      console.error('id_ota tidak ditemukan dalam data:', data);
      setError('ID data tidak valid. Periksa data yang dikirim.');
      return;
    }

    try {
      console.log('Mencoba menghapus data dengan id_ota:', idToDelete);
      const response = await api.delete(`/admin/ortu-anak/${idToDelete}`, token);
      console.log('Respons dari delete:', response);
      toast.success('Data berhasil dihapus!', {
        position: 'top-right',
        autoClose: 3000,
      });
      const fetchData = async () => {
        const response = await api.get("/admin/ortu-anak", token);
        if (!response || !response.data) {
          throw new Error('Gagal mengambil data dari server.');
        }
        console.log('Data dari API setelah delete:', response.data);
        const dataWithNo = response.data.map((item, index) => ({
          ...item,
          no: index + 1,
          jenis_kelamin_anak: item.jenis_kelamin_anak === 'L' ? 'L' : 'P',
          tanggal_lahir_anak: formatDate(item.tanggal_lahir_anak),
        }));
        setBalitaData(dataWithNo);
        setError(null);
      };
      await fetchData();
    } catch (error) {
      console.error('Gagal menghapus data. Detail error:', error.response ? error.response.data : error.message);
      toast.error('Gagal menghapus data. Coba lagi nanti.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setError('Gagal menghapus data. Periksa konsol untuk detail atau pastikan id_ota valid.');
    }
  };

  const paginatedDataWithNo = paginatedData.map((item, index) => ({
    ...item,
    no: (currentPage - 1) * 10 + index + 1,
  }));

  const confirmDelete = (data) => {
    setItemToDelete(data);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (itemToDelete) {
      await handleDelete(itemToDelete);
      setShowConfirm(false);
      setItemToDelete(null);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setItemToDelete(null);
  };

  const handleAddBalita = async (newData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token tidak ditemukan di localStorage');
      setError('Silakan login terlebih dahulu.');
      return;
    }

    try {
      const response = await api.post('/admin/ortu-anak', {
        ...newData,
        tanggal_lahir_anak: new Date(newData.tanggal_lahir_anak).toISOString().split('T')[0],
      }, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      console.log('Data ditambahkan:', response.data);
      toast.success('Data balita berhasil ditambahkan!', {
        position: 'top-right',
        autoClose: 3000,
      });

      const fetchData = async () => {
        const response = await api.get("/admin/ortu-anak", token);
        if (!response || !response.data) {
          throw new Error('Gagal mengambil data dari server.');
        }
        const dataWithNo = response.data.map((item, index) => ({
          ...item,
          no: index + 1,
          jenis_kelamin_anak: item.jenis_kelamin_anak === 'L' ? 'L' : 'P',
          tanggal_lahir_anak: formatDate(item.tanggal_lahir_anak),
        }));
        setBalitaData(dataWithNo);
      };
      await fetchData();

      setIsFormVisible(false);
    } catch (error) {
      console.error('Gagal menambahkan data:', error.message);
      toast.error('Gagal menambahkan data. Coba lagi nanti.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setError('Gagal menambahkan data. Periksa konsol untuk detail.');
    }
  };

  const handleUpdateBalita = (updatedData) => {
    setBalitaData((prevData) =>
      prevData.map((item) =>
        item.id_ota === updatedData.id_ota ? { ...item, ...updatedData } : item
      )
    );
    setIsFormVisible(false);
    setIsEditMode(false);
    setSelectedData(null);
  };

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
      <h3 className="text-lg font-semibold mb-4">Data Balita</h3>
      <ToastContainer />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!isFormVisible && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Cari nama anak / ibu"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="tanggal_lahir_anak">Tanggal Lahir</option>
              <option value="nama_anak">Nama Anak</option>
            </select>
            <button
              onClick={() => {
                setIsFormVisible(true);
                setIsTableVisible(false);
                setIsEditMode(false);
                setSelectedData(null);
              }}
              className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              Tambah Data
            </button>
          </div>
        )}

        {isFormVisible ? (
          <div>
            <button
              onClick={() => {
                setIsFormVisible(false);
                setIsTableVisible(true);
                setIsEditMode(false);
                setSelectedData(null);
              }}
              className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Kembali
            </button>
            {isEditMode && selectedData ? (
              <FormEditBalita
                onClose={() => {
                  setIsFormVisible(false);
                  setIsTableVisible(true);
                  setIsEditMode(false);
                  setSelectedData(null);
                }}
                onUpdate={handleUpdateBalita}
                initialData={selectedData}
              />
            ) : (
              <FormAddBalita
                onClose={() => {
                  setIsFormVisible(false);
                  setIsTableVisible(true);
                }}
                onAdd={handleAddBalita}
              />
            )}
          </div>
        ) : (
          <>
            {error ? (
              <div className="text-red-500">{error}</div>
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
                          Nama Ibu
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                          Nama Bapak
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                          Nama Anak
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sm:table-cell hidden md:table-cell">
                          Jenis Kelamin
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sm:table-cell hidden lg:table-cell">
                          Gol. Darah
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sm:table-cell hidden md:table-cell">
                          Tanggal Lahir
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sm:table-cell hidden lg:table-cell">
                          Pekerjaan Ibu
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider sm:table-cell hidden md:table-cell">
                          Alamat
                        </th>
                        {/* <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                          Status
                        </th> */}
                        <th className="px-8 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-32">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedDataWithNo.length === 0 ? (
                        <tr>
                          <td colSpan="11" className="px-4 py-4 text-center text-gray-600">
                            Tidak ada data balita.
                          </td>
                        </tr>
                      ) : (
                        paginatedDataWithNo.map((item) => (
                          <tr key={item.id_ota} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.no}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.nama_ibu}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.nama_bapak}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.nama_anak}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:table-cell hidden md:table-cell">
                              <div className="text-sm text-gray-900">{item.jenis_kelamin_anak}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:table-cell hidden lg:table-cell">
                              <div className="text-sm text-gray-900">{item.gol_darah_anak}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:table-cell hidden md:table-cell">
                              <div className="text-sm text-gray-900">{item.tanggal_lahir_anak}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap sm:table-cell hidden lg:table-cell">
                              <div className="text-sm text-gray-900">{item.pekerjaan_ibu}</div>
                            </td>
                            <td className="px-4 py-4 break-words sm:table-cell hidden md:table-cell">
                              <div className="text-sm text-gray-900">{item.alamat_rumah}</div>
                            </td>
                            {/* <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.status}</div>
                            </td> */}
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setIsFormVisible(true);
                                  setIsTableVisible(false);
                                  setIsEditMode(true);
                                  setSelectedData(item);
                                }}
                                className="text-blue-600 hover:text-blue-900 transition-colors duration-200 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => confirmDelete(item)}
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

                {/* Layout untuk mobile */}
                <div className="sm:hidden space-y-4">
                  {paginatedDataWithNo.length === 0 ? (
                    <div className="text-center py-10 text-gray-600">Tidak ada data balita.</div>
                  ) : (
                    paginatedDataWithNo.map((item) => (
                      <div
                        key={item.id_ota}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.nama_anak} (No. {item.no})
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Status: {item.status}</div>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                setIsFormVisible(true);
                                setIsTableVisible(false);
                                setIsEditMode(true);
                                setSelectedData(item);
                              }}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200 mr-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => confirmDelete(item)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 grid grid-cols-1 gap-1">
                          <p><span className="font-semibold">Ibu:</span> {item.nama_ibu}</p>
                          <p><span className="font-semibold">Bapak:</span> {item.nama_bapak}</p>
                          <p><span className="font-semibold">Jenis Kelamin:</span> {item.jenis_kelamin_anak}</p>
                          <p><span className="font-semibold">Gol. Darah:</span> {item.gol_darah_anak}</p>
                          <p><span className="font-semibold">Tanggal Lahir:</span> {item.tanggal_lahir_anak}</p>
                          <p><span className="font-semibold">Pekerjaan Ibu:</span> {item.pekerjaan_ibu}</p>
                          <p><span className="font-semibold">Alamat:</span> {item.alamat_rumah}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
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
          </>
        )}

        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-25">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h4>
              <p>Apakah Anda yakin ingin menghapus data ini?</p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DataBalita;