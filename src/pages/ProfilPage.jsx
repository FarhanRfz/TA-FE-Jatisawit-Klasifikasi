import React from "react";
import HeroSection from "../components/Herosection";
import bangunanPuskesmas from "../assets/image/bangunan puskesmas jtswit.jpg";
import { useAppContext } from "../context/AppContext";

const ProfilPage = () => {
  const { profilPuskesmas } = useAppContext();

  return (
    <div className="font-sans">
      <HeroSection
        heroSectionImage={bangunanPuskesmas}
        text={profilPuskesmas.judul || "Profil Puskesmas"}
        showButton1={true}
        showButton2={false}
        buttonText1="Selengkapnya"
        scrollTarget1="#profil"
      />
      <div className="px-6 md:px-16 py-16 space-y-14" id="profil">
        <div className="flex justify-center">
          <img
            src={profilPuskesmas.foto_bersama || "/default-foto-bersama.jpg"}
            alt="Foto Keluarga Puskesmas"
            className="rounded-lg shadow-lg w-full max-w-2xl object-cover"
          />
        </div>
        <div className="w-full bg-orange-100 rounded-xl p-6 md:p-10 flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <h2 className="text-xl font-bold mb-4">Visi</h2>
            <p className="text-gray-700">
              {profilPuskesmas.visi || "Visi belum diatur"}
            </p>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-xl font-bold mb-4">Misi</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {(profilPuskesmas.misi || "").split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-orange-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-3">Tujuan</h2>
            <ul className="list-decimal list-inside text-gray-700 space-y-1 text-lg">
              {(profilPuskesmas.tujuan || "").split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-orange-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-3">
              Motto & Tata Nilai
            </h2>
            <p className="font-semibold mb-2">OKE</p>
            <ul className="list-decimal list-inside text-gray-700 text-lg space-y-1">
              {(profilPuskesmas.motto_tatanilai || "")
                .split("\n")
                .map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-orange-600">
            Peta Wilayah Kerja
          </h2>
          <div className="   flex items-center justify-center text-gray-600 font-semibold rounded-lg">
            {profilPuskesmas.peta_wilayah_kerja ? (
              <img
                src={profilPuskesmas.peta_wilayah_kerja}
                alt="Peta Wilayah Kerja"
                className="w-160 h-full object-cover rounded-lg"
              />
            ) : (
              "[Peta Wilayah Kerja akan ditampilkan di sini]"
            )}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-orange-600">
            Struktur Organisasi
          </h2>
          <div className=" bg-gray-300  flex items-center justify-center text-gray-600 font-semibold rounded-lg">
            {profilPuskesmas.struktur_organisasi ? (
              <img
                src={profilPuskesmas.struktur_organisasi}
                alt="Struktur Organisasi"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              "[Struktur Organisasi akan ditampilkan di sini]"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilPage;
