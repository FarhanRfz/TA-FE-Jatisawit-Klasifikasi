import AdminLayout from '../../../layouts/AdminLayout';
import { useState, useEffect } from 'react';
import FormAddBalita from './formaddbalita';
import Table from '../../../layouts/table/tabel';
import ButtonAdd from '../../../components/button/button-add';
import ButtonBack from '../../../components/button/button-back';
import SearchInput from '../../../components/input/search';
import Input from '../../../components/input/input';
import api from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TABLE_COLUMNS = [
  { label: 'No', key: 'no' },
  { label: 'Nama Ibu', key: 'nama_ibu' },
  { label: 'Nama Bapak', key: 'nama_bapak' },
  { label: 'Nama Anak', key: 'nama_anak' },
  { label: 'Jenis Kelamin', key: 'jenis_kelamin_anak' },
  { label: 'Golongan Darah', key: 'gol_darah_anak' },
  { label: 'Tanggal Lahir', key: 'tanggal_lahir_anak' },
  { label: 'Pekerjaan Ibu', key: 'pekerjaan_ibu' },
  { label: 'Alamat', key: 'alamat_rumah' },
  { label: 'Status', key: 'status' },
];

const SORT_OPTIONS = [
  { value: 'tanggal_lahir_anak', label: 'Tanggal Lahir' },
  { value: 'nama_anak', label: 'Nama Anak' },
];

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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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
          jenis_kelamin_anak: item.jenis_kelamin_anak,
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

  const handleSort = (value) => {
    setSortBy(value);
    const sortedData = [...balitaData].sort((a, b) => {
      if (value === 'tanggal_lahir_anak') {
        const dateA = new Date(a[value].split('-').reverse().join('-'));
        const dateB = new Date(b[value].split('-').reverse().join('-'));
        return dateA - dateB;
      }
      return a[value].localeCompare(b[value]);
    });
    setBalitaData(sortedData);
  };

  const handleAddBalita = async (newData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token tidak ditemukan di localStorage');
      setError('Silakan login terlebih dahulu.');
      await fetchData();
      return;
    }
  };

  const handleShow = (data) => console.log('Show data:', data);
  const handleEdit = async (data) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token tidak ditemukan di localStorage');
      setError('Silakan login terlebih dahulu.');
      return;
    }

    try {
      await api.put(`/admin/ortu-anak/${data.id_ota}`, data, token);
      setBalitaData((prevData) =>
        prevData.map((item) =>
          item.id_ota === data.id_ota ? { ...data, tanggal_lahir_anak: formatDate(data.tanggal_lahir_anak) } : item
        )
      );
      setError(null);
    } catch (error) {
      console.error('Gagal mengedit data:', error.message);
      setError('Gagal mengedit data. Periksa konsol untuk detail.');
    }
  };

  const handleDelete = async (data) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token tidak ditemukan di localStorage');
      setError('Silakan login terlebih dahulu.');
      return;
    }

    console.log('Data yang diterima di handleDelete:', data);
    console.log('Jenis data:', typeof data);

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
          jenis_kelamin_anak: item.jenis_kelamin_anak === 'L' ? 'Laki-Laki' : 'Perempuan',
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

  const handleBack = () => {
    setIsFormVisible(false);
    setIsTableVisible(true);
  };

  const TableControls = () => (
    <div className="w-full mt-4 mb-4 border border-solid flex items-center justify-between border-grey rounded-md bg-white p-2">
      <div className="flex space-x-4">
        <SearchInput placeholder="Cari di sini" />
        <Input
          id="sort"
          type="select"
          options={SORT_OPTIONS}
          onChange={(e) => handleSort(e.target.value)}
          value={sortBy}
        />
      </div>
      <ButtonAdd
        onClick={() => {
          setIsFormVisible(true);
          setIsTableVisible(false);
        }}
        className="additional-class"
        text="Tambah Data"
      />
    </div>
  );

  return (
    <AdminLayout>
      <h3 className="text-lg font-semibold mb-4">Data Balita</h3>
      <ToastContainer />
      {isFormVisible ? (
        <div className="tambah-data-balita">
          <ButtonBack onClick={handleBack} className="mb-4" text="Kembali" />
          <FormAddBalita onClose={handleBack} onSubmit={handleAddBalita} />
        </div>
      ) : isTableVisible ? (
        <div>
          <TableControls />
          {error ? (
            <div className="text-red-500 mb-4">{error}</div>
          ) : balitaData.length === 0 ? (
            <div className="text-gray-500 mb-4">Tidak ada data untuk ditampilkan.</div>
          ) : (
            <Table
              tableData={balitaData}
              columns={TABLE_COLUMNS}
              buttons={{ show: true, edit: true, delete: true }}
              onShow={handleShow}
              onEdit={handleEdit}
              onDelete={confirmDelete}
              idKey="id_ota"
            />
          )}
        </div>
      ) : null}
      {showConfirm && (
        <div className="fixed inset-0 bg-tranparent flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h4>
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleCancel}
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
    </AdminLayout>
  );
};

export default DataBalita;