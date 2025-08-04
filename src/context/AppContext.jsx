import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appSettings, setAppSettings] = useState({
    logoDinas: null,
    logoPuskesmas: null,
    namaAplikasi: "",
  });
  const [kontakList, setKontakList] = useState([]);
  const [profilPuskesmas, setProfilPuskesmas] = useState({
    judul: "",
    deskripsi_profil: "",
    visi: "",
    misi: "",
    motto_tatanilai: "",
    tujuan: "",
    foto_bersama: null,
    struktur_organisasi: null,
    peta_wilayah_kerja: null,
  });
  const [edukasiStunting, setEdukasiStunting] = useState({
    judul: "",
    deskripsi: "",
    informasi_stunting: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch about app (logo, nama aplikasi)
        const aboutResponse = await api.get("/about-app");
        const aboutData = aboutResponse.data.data;
        const baseUrl = "http://localhost:8000";
        if (aboutData) {
          setAppSettings({
            logoDinas: aboutData.logo_dinas ? `${baseUrl}/storage/${aboutData.logo_dinas}` : null,
            logoPuskesmas: aboutData.logo_puskesmas ? `${baseUrl}/storage/${aboutData.logo_puskesmas}` : null,
            namaAplikasi: aboutData.nama_aplikasi || "",
          });
        }

        // Fetch kontak
        const kontakResponse = await api.get("/puskesmas-kontak");
        const kontakData = Array.isArray(kontakResponse.data) ? kontakResponse.data : kontakResponse.data.data;
        setKontakList(kontakData || []);

        // Fetch profil puskesmas
        const profilResponse = await api.get("/profil-puskesmas");
        const profilData = profilResponse.data;
        if (profilData) {
          setProfilPuskesmas({
            judul: profilData.judul || "",
            deskripsi_profil: profilData.deskripsi_profil || "",
            visi: profilData.visi || "",
            misi: profilData.misi || "",
            motto_tatanilai: profilData.motto_tatanilai || "",
            tujuan: profilData.tujuan || "",
            foto_bersama: profilData.foto_bersama ? `${baseUrl}/storage/${profilData.foto_bersama}` : null,
            struktur_organisasi: profilData.struktur_organisasi ? `${baseUrl}/storage/${profilData.struktur_organisasi}` : null,
            peta_wilayah_kerja: profilData.peta_wilayah_kerja ? `${baseUrl}/storage/${profilData.peta_wilayah_kerja}` : null,
          });
        }

        // Fetch edukasi stunting
        const edukasiResponse = await api.get("/edukasi-stunting");
        const edukasiData = edukasiResponse.data.data;
        if (edukasiData) {
          setEdukasiStunting({
            judul: edukasiData.judul || "",
            deskripsi: edukasiData.deskripsi || "",
            informasi_stunting: edukasiData.informasi_stunting || "",
          });
        }
      } catch (err) {
        console.error("Gagal memuat data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ appSettings, setAppSettings, kontakList, setKontakList, profilPuskesmas, setProfilPuskesmas, edukasiStunting, setEdukasiStunting }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);