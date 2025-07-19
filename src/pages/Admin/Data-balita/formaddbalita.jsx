import { useState } from "react";
import axios from "axios";
import Input from "../../../components/input/input";
import Buttonsave from "../../../components/button/button-save";
import Modal from "../../../components/popup/Modal";
import Buttonback from "../../../components/button/button-back";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const FormAddBalita = ({ onClose, onSubmit }) => {
  const [nama, setNama] = useState("");
  const [orangTua, setOrangTua] = useState("");
  const [tglLahir, setTglLahir] = useState("");
  const [jk, setJk] = useState("Laki-Laki");
  const [alamat, setAlamat] = useState("");

  const [isSuccess, setIsSuccess] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBalita = {
      nama,
      orangTua,
      tglLahir,
      jk,
      alamat,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/balita", {
        nama,
        orang_tua: orangTua,
        tgl_lahir: tglLahir,
        jk,
        alamat,
      });

      console.log("Balita added:", response.data);

      // Reset input
      setNama("");
      setOrangTua("");
      setTglLahir("");
      setJk("Laki-Laki");
      setAlamat("");

      setIsSuccess(true);
      setModalMessage("Data balita berhasil ditambahkan");
      setIsModalOpen(true);

      if (onSubmit) {
        onSubmit(newBalita); // kirim ke DataBalita.jsx
      }

      setTimeout(() => {
        setIsModalOpen(false);
        onClose(); // Tutup form setelah berhasil
      }, 2000);
    } catch (error) {
      console.error("Error menambahkan data balita:", error);
      setIsSuccess(false);
      setModalMessage("Gagal menambahkan data balita");
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white pb-0 mt-4 rounded-lg shadow-lg">
      

      <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 gap-4">
        <Input
          id="nama"
          label="Nama Anak"
          placeholder="Masukkan nama balita"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          type="text"
        />
        <Input
          id="orangTua"
          label="Nama Orang Tua"
          placeholder="Masukkan nama orang tua"
          value={orangTua}
          onChange={(e) => setOrangTua(e.target.value)}
          required
          type="text"
        />
        <Input
          id="tglLahir"
          label="Tanggal Lahir"
          placeholder=""
          value={tglLahir}
          onChange={(e) => setTglLahir(e.target.value)}
          required
          type="date"
        />
        <div>
          <label htmlFor="jk" className="block font-medium text-sm mb-1">
            Jenis Kelamin
          </label>
          <select
            id="jk"
            value={jk}
            onChange={(e) => setJk(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="Laki-Laki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <Input
          id="alamat"
          label="Alamat"
          placeholder="Masukkan alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          required
          type="text"
        />
        <div className="mt-4 mb-14">
          <Buttonsave onClick={handleSubmit} text="Simpan" />
        </div>
      </form>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} showHeader={false}>
        <div className="flex p-4 items-center gap-2">
          <div
            className={`text-white w-10 h-10 rounded-full flex items-center justify-center ${
              isSuccess ? "bg-teal-300" : "bg-red-500"
            }`}
          >
            <FontAwesomeIcon
              icon={isSuccess ? faCheck : faExclamationTriangle}
            />
          </div>
          <p>{modalMessage}</p>
        </div>
      </Modal>
    </div>
  );
};

export default FormAddBalita;
