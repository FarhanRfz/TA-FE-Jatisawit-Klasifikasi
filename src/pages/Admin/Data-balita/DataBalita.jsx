import AdminLayout from '../../../layouts/AdminLayout';
import { useState } from 'react';
import FormAddBalita from './formaddbalita'; // Pastikan path sesuai
import Table from '../../../layouts/table/tabel';
import Buttonadd from '../../../components/button/button-add';
import SearchInput from '../../../components/input/search';
import Input from '../../../components/input/input';
import Buttonback from '../../../components/button/button-back';

const sampleData = [
  { id: 1, nama: 'Ziqi Rahman', orangTua: 'Wahyudin', tglLahir: '13-09-2024', jk: 'Laki-Laki', alamat: 'Jatibarang' },
  { id: 2, nama: 'April Alfathu', orangTua: 'Kumiah', tglLahir: '25-12-2025', jk: 'Perempuan', alamat: 'Krasak' },
  { id: 3, nama: 'Adham Robin', orangTua: 'Ronaldo', tglLahir: '30-01-2025', jk: 'Perempuan', alamat: 'Kalimati' },
];

const DataBalita = () => {
  const [dataBalita, setDataBalita] = useState(
    sampleData.map((item, index) => ({ ...item, no: index + 1 }))
  );
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(true);

  const handleAddBalita = (newData) => {
    const newEntry = {
      ...newData,
      id: dataBalita.length + 1,
      no: dataBalita.length + 1,
    };
    setDataBalita([...dataBalita, newEntry]);
    setIsFormVisible(false);
    setIsTableVisible(true);
  };

  const handleShow = (data) => {
    console.log('Show data:', data);
  };

  const handleEdit = (data) => {
    console.log('Edit data:', data);
  };

  const handleDelete = (data) => {
    const filtered = dataBalita.filter((item) => item.id !== data.id);
    const reindexed = filtered.map((item, index) => ({
      ...item,
      no: index + 1,
    }));
    setDataBalita(reindexed);
  };

  const handleBack = () => {
    setIsFormVisible(false);
    setIsTableVisible(true);
  };

  const columns = [
    { label: 'No', key: 'no' },
    { label: 'Nama Anak', key: 'nama' },
    { label: 'Nama Orang Tua', key: 'orangTua' },
    { label: 'Tanggal Lahir', key: 'tglLahir' },
    { label: 'Jenis Kelamin', key: 'jk' },
    { label: 'Alamat', key: 'alamat' },
  ];

  return (
    <AdminLayout>
      <h3 className="text-lg font-semibold mb-4">Data Balita</h3>

      {isFormVisible ? (
        <div className="tambah-data-balita">
          <Buttonback
            onClick={handleBack}
            className="mb-4"
            text="Kembali"
          />
          <FormAddBalita
            onClose={handleBack}
            onSubmit={handleAddBalita}
          />
        </div>
      ) : isTableVisible ? (
        <div>
          <div className="w-full mt-4 mb-4 border border-solid flex items-center justify-between border-grey rounded-md bg-white p-2">
            <div className="flex space-x-4">
              <SearchInput placeholder="Cari di sini" />
              <Input
                id="sort"
                type="select"
                options={[
                  { value: 'Tanggal', label: 'Tanggal' },
                  { value: 'Nama', label: 'Nama' },
                ]}
              />
            </div>
            <Buttonadd
              onClick={() => {
                setIsFormVisible(true);
                setIsTableVisible(false);
              }}
              className="additional-class"
              text="Tambah Data"
            />
          </div>

          <Table
            tableData={dataBalita}
            columns={columns}
            buttons={{ show: true, edit: true, delete: true }}
            onShow={handleShow}
            onEdit={handleEdit}
            onDelete={handleDelete}
            idKey="id"
          />
        </div>
      ) : null}
    </AdminLayout>
  );
};

export default DataBalita;
