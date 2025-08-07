import React from "react";
import { useAppContext } from "../context/AppContext"; // Impor useAppContext
import bangunanPuskesmas from "../assets/image/bangunan puskesmas jtswit.jpg";
import HeroSection from "../components/Herosection";
import ServiceCard from "../components/ServiceCard";

const HomePage = () => {
  const { profilPuskesmas, edukasiStunting } = useAppContext(); // Ambil data dari context

  return (
    <div className="font-sans">
      {/* HeroSection */}
      <HeroSection
        heroSectionImage={bangunanPuskesmas}
        text={`Selamat Datang Di\n${profilPuskesmas.judul || "UPTD Puskesmas Jatisawit"}`}
        showButton1={true}
        showButton2={false}
        showButton3={false}
        buttonText1="Selengkapnya"
        buttonText2=""
        buttonText3="Cek Sekarang..."
        scrollTarget1="#konten"
        scrollTarget3="/klasifikasi"
      />

      <section className="bg-white pt-14 pb-12 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Gambar - Foto Keluarga Puskesmas dari profilPuskesmas */}
          <div className="flex justify-center">
            <img
              src={profilPuskesmas.foto_bersama || "/default-foto-bersama.jpg"} // Gunakan foto dari context atau default
              alt="Foto Keluarga Puskesmas"
              className="rounded-lg shadow-lg w-full max-w-[500px] md:max-w-[600px] object-cover"
            />
          </div>

          {/* Konten Teks - Judul dan Deskripsi dari profilPuskesmas */}
          <div className="md:order-last" id="konten">
            <h2 className="text-xl font-bold text-orange-600 mb-2">
              Tentang Kami
            </h2>
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              {profilPuskesmas.judul || "UPTD Puskesmas Jatisawit"}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed max-w-[600px] break-words">
              {profilPuskesmas.deskripsi_profil ||
                "UPTD Puskesmas Kertasemaya adalah Unit Pelaksana Teknis Dinas Kabupaten Indramayu yang bertempat di Kecamatan Kertasemaya, Jl. By Pass Tulungagung dengan wilayah kerja meliputi 13 desa, yaitu Desa Tulungagung, Desa Kertasemaya, Desa Kilwed, Desa Sukawera, Desa Jengkok, Desa Lemah Ayu, Desa Manguntara, Desa Tegalwirangrong, Desa Tenajar Kidul, Desa Tenajar, Desa Tenajar Lor, Desa Jambe, dan Desa Larangan Jambe. Puskesmas kami adalah Puskesmas Perdesaan dan juga termasuk puskesmas non rawat inap. Kami selalu berupaya memberikan pelayanan prima dengan sepenuh hati bagi para pengguna layanan kami."}
            </p>

            <div className="mt-6">
              <a
                href="/profil"
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
              >
                Baca Selengkapnya
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Puskesmas */}
      <section className="bg-orange-300 pb-8">
        {/* Full-width header bar */}
        <div className="w-full bg-orange-400 py-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
            Layanan Puskesmas
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 mt-6">
          <ServiceCard title="Pemeriksaan Umum" />
          <ServiceCard title="Kesehatan Gigi & Mulut" />
          <ServiceCard title="Kesehatan Ibu & Anak (KIA)" />
          <ServiceCard title="Kesehatan Kerja" />
          <ServiceCard title="Kesehatan Tradisional" />
          <ServiceCard title="Penyakit Tidak Menular" />
          <ServiceCard title="Kefarmasian" />
          <ServiceCard title="Laboratorium" />
          <ServiceCard title="Vaksinasi & Imunisasi" />
        </div>
      </section>

      {/* Edukasi Stunting */}
      <section className="pt-4 pb-12 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
          {edukasiStunting.judul || "Edukasi Stunting"}
        </h2>

        {/* Wrapper Flex */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Kiri - 60% */}
          <div className="bg-orange-100 p-6 rounded-lg shadow-md lg:w-3/4 w-full flex flex-col">
            <p className="text-gray-800 text-xl leading-relaxed mb-4">
              {edukasiStunting.deskripsi ||
                "Stunting adalah kondisi gagal tumbuh pada anak balita akibat kekurangan gizi kronis dan infeksi berulang terutama dalam 1.000 Hari Pertama Kehidupan (HPK). Anak yang mengalami stunting akan lebih pendek dari anak seusianya dan memiliki risiko gangguan perkembangan otak."}
            </p>
            <div className="text-center mt-6">
              <a
                href="/edukasi-stunting"
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
              >
                Baca Selengkapnya
              </a>
            </div>
          </div>

          {/* Kanan - 40% */}
          <div className="lg:w-1/4 w-full flex flex-col items-center justify-center relative">
            <div className="bg-orange-300 text-white font-semibold text-[20px] lg:text-xl px-4 py-2 rounded w-full">
              <p>
                Apakah Anak Anda Tumbuh dengan Optimal? Cegah Stunting Sejak
                Dini dengan Pemeriksaan Kesehatan Balita!
              </p>
            </div>

            {/* Tombol opsional */}
            <div className="mt-4">
              <a
                href="/klasifikasi"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-7 px-2 text-[18px] lg:h-auto lg:p-3 lg:text-xl inline-block text-center"
              >
                Cek Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;