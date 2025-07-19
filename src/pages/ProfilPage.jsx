import React from "react";
import HeroSection from "../components/Herosection";
import bangunanPuskesmas from "../assets/image/bangunan puskesmas jtswit.jpg";
import FotoKeluarga from "../assets/image/contoh-fotobersama.jpg";

const ProfilPage = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <HeroSection
        heroSectionImage={bangunanPuskesmas}
        text="Profil Puskesmas"
        showButton1={true}
        showButton2={false}
        buttonText1="Selengkapnya"
        scrollTarget1="#profil"
      />

      {/* Konten */}
      <div className="px-6 md:px-16 py-16 space-y-14" id="profil">
        {/* Foto Keluarga */}
        <div className="flex justify-center">
          <img
            src={FotoKeluarga}
            alt="Foto Keluarga Puskesmas"
            className="rounded-lg shadow-lg w-full max-w-4xl object-cover"
          />
        </div>

         {/* Visi dan Misi */}
      <div className="w-full bg-orange-100 rounded-xl p-6 md:p-10 flex flex-col md:flex-row gap-10">
        {/* Visi */}
        <div className="md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Visi</h2>
          <p className="text-gray-700">
            "Terwujudnya Indramayu BERMARTABAT (Bersih, Religius, Maju, Adil,
            Makmur dan Hebat)"
          </p>
        </div>

        {/* Misi */}
        <div className="md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Misi</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Perwujudan Reformasi Birokrasi</li>
            <li>Fasilitasi Kehidupan Beragama dan Bermasyarakat</li>
            <li>Peningkatan Kesejahteraan</li>
            <li>Penanggulangan Kemiskinan</li>
            <li>Peningkatan Daya Saing SDM</li>
            <li>Peningkatan Infrastruktur</li>
            <li>Peningkatan Ekonomi dan Daya Saing Daerah</li>
          </ul>
        </div>
      </div>
      
        {/* Tujuan dan Motto */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tujuan */}
          <div className="bg-orange-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-3">Tujuan</h2>
            <ul className="list-decimal list-inside text-gray-700 space-y-1 text-lg">
              <li>Meningkatkan kualitas SDM petugas puskesmas.</li>
              <li>Memberikan pelayanan prima kepada seluruh masyarakat tanpa membedakan status sosial.</li>
              <li>Meningkatkan kemandirian masyarakat untuk berperilaku hidup bersih dan sehat.</li>
            </ul>
          </div>

          {/* Motto & Tata Nilai */}
          <div className="bg-orange-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-3">Motto & Tata Nilai</h2>
            <p className="font-semibold mb-2">KERTAS</p>
            <ul className="list-decimal list-inside text-gray-700 text-lg space-y-1">
              <li>Kerja Keras: Menjalankan tugas sesuai dengan waktu layanan yang ditentukan.</li>
              <li>Kerja Cerdas: Menjalankan tugas sesuai dengan kompetensinya.</li>
              <li>Kerja Tuntas: Menjalankan tugas sesuai dengan target yang telah ditentukan.</li>
            </ul>
          </div>
        </div>

        {/* Peta Wilayah */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-orange-600">Peta Wilayah Kerja</h2>
          <div className="w-full bg-gray-300 h-64 flex items-center justify-center text-gray-600 font-semibold rounded-lg">
            [Peta Wilayah Kerja akan ditampilkan di sini]
          </div>
        </div>

        {/* Struktur Organisasi */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-orange-600">Struktur Organisasi</h2>
          <div className="w-full bg-gray-300 h-64 flex items-center justify-center text-gray-600 font-semibold rounded-lg">
            [Struktur Organisasi akan ditampilkan di sini]
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilPage;
