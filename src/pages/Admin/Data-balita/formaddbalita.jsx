import { useState } from "react";
import api from "../../../api";
import Input from "../../../components/input/input";
import Buttonsave from "../../../components/button/button-save";
import Modal from "../../../components/popup/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const FormAddBalita = ({ onClose, onSubmit }) => {
  const [namaAnak, setNamaAnak] = useState("");
  const [namaIbu, setNamaIbu] = useState("");
  const [namaBapak, setNamaBapak] = useState("");
  const [jenisKelaminAnak, setJenisKelaminAnak] = useState("Laki-Laki");
  const [golDarahAnak, setGolDarahAnak] = useState("");
  const [tanggalLahirAnak, setTanggalLahirAnak] = useState("");
  const [pekerjaanIbu, setPekerjaanIbu] = useState("");
  const [alamatRumah, setAlamatRumah] = useState("");
  const [status, setStatus] = useState("aktif");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSuccess, setIsSuccess] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const newBalita = {
      nama_anak: namaAnak,
      nama_ibu: namaIbu,
      nama_bapak: namaBapak,
      jenis_kelamin_anak: jenisKelaminAnak === "Laki-Laki" ? "L" : "P",
      gol_darah_anak: golDarahAnak,
      tanggal_lahir_anak: tanggalLahirAnak,
      pekerjaan_ibu: pekerjaanIbu,
      alamat_rumah: alamatRumah,
      status: status,
    };

    try {
      const response = await api.post("/admin/ortu-anak", newBalita, token);
      console.log("Balita added:", response);

      setNamaAnak("");
      setNamaIbu("");
      setNamaBapak("");
      setJenisKelaminAnak("Laki-Laki");
      setGolDarahAnak("");
      setTanggalLahirAnak("");
      setPekerjaanIbu("");
      setAlamatRumah("");
      setStatus("aktif");

      toast.success("Data balita berhasil ditambahkan");

      if (onSubmit) {
        const newEntry = { ...newBalita, id_ota: response.data.data.id_ota };
        onSubmit(newEntry);
      }

      setTimeout(() => {
        setIsModalOpen(false);
        onClose();
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error("Error menambahkan data balita:", error.message);
      setIsSuccess(false);
      toast.error(`Gagal menambahkan data balita: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white pb-0 mt-4 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
        <Input
          id="namaAnak"
          label="Nama Anak"
          placeholder="Masukkan nama anak"
          value={namaAnak}
          onChange={(e) => setNamaAnak(e.target.value)}
          required
          type="text"
        />
        <Input
          id="namaIbu"
          label="Nama Ibu"
          placeholder="Masukkan nama ibu"
          value={namaIbu}
          onChange={(e) => setNamaIbu(e.target.value)}
          required
          type="text"
        />
        <Input
          id="namaBapak"
          label="Nama Bapak"
          placeholder="Masukkan nama bapak"
          value={namaBapak}
          onChange={(e) => setNamaBapak(e.target.value)}
          required
          type="text"
        />
        <Input
          id="tanggalLahirAnak"
          label="Tanggal Lahir Anak"
          placeholder=""
          value={tanggalLahirAnak}
          onChange={(e) => setTanggalLahirAnak(e.target.value)}
          required
          type="date"
        />
        <Input
          id="pekerjaanIbu"
          label="Pekerjaan Ibu"
          placeholder="Masukkan pekerjaan ibu"
          value={pekerjaanIbu}
          onChange={(e) => setPekerjaanIbu(e.target.value)}
          required
          type="text"
        />
        <Input
          id="alamatRumah"
          label="Alamat Rumah"
          placeholder="Masukkan alamat"
          value={alamatRumah}
          onChange={(e) => setAlamatRumah(e.target.value)}
          required
          type="text"
        />
        <div>
          <label htmlFor="jenisKelaminAnak" className="block font-medium text-sm mb-1">
            Jenis Kelamin Anak
          </label>
          <select
            id="jenisKelaminAnak"
            value={jenisKelaminAnak}
            onChange={(e) => setJenisKelaminAnak(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="Laki-Laki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div>
          <label htmlFor="golDarahAnak" className="block font-medium text-sm mb-1">
            Golongan Darah Anak
          </label>
          <select
            id="golDarahAnak"
            value={golDarahAnak}
            onChange={(e) => setGolDarahAnak(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Pilih Golongan Darah</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block font-medium text-sm mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
        </div>
        <div className="col-span-2 mt-4 mb-14 flex justify-end">
          <Buttonsave type="submit" text="Simpan" disabled={isSubmitting} />
        </div>
      </form>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} showHeader={false}>
        <div className="flex p-4 items-center gap-2">
          <div
            className={`text-white w-10 h-10 rounded-full flex items-center justify-center ${
              isSuccess ? "bg-teal-300" : "bg-red-500"
            }`}
          >
            <FontAwesomeIcon icon={isSuccess ? faCheck : faExclamationTriangle} />
          </div>
          <p>{modalMessage}</p>
        </div>
      </Modal>
    </div>
  );
};

export default FormAddBalita;