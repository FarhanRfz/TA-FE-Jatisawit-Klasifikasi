import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/PrivateRoute";

import GeneralLayouts from "./layouts/GeneralLayout";
import HomePage from "./pages/HomePage";
import KlasifikasiPage from "./pages/KlasifikasiPage";
import HistoryPage from "./pages/RiwayatKlasifikasiPage";
import ProfilPage from "./pages/ProfilPage";
import NotFoundPage from "./pages/NotFoundPage";
import DataBalita from "./pages/Admin/Data-balita/DataBalita";
import EdukasiStuntingPage from "./pages/EdukasiStuntingPage";
import KontenPage from "./pages/Admin/Konten/KontenPage";
import RiwayatKlasifikasiPageAdmin from "./pages/Admin/RiwayatKlasifikasi/RiwayatKlasifikasiAdmin";
import AdminPage from "./pages/Admin/AdminPage";
import LoginPage from "./pages/Admin/LoginPage";
import EditProfileUser from "./pages/EditProfilePage";
import RegistrasiPage from "./pages/Admin/RegistrasiPage";
import ForgotPasswordPage from "./pages/Admin/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Admin/ResetPassword";

function App() {
useEffect(() => {
    const fetchCsrfCookie = async () => {
      try {
        await fetch('/sanctum/csrf-cookie', {
          credentials: "include", // Pastikan cookie dikirim
        });
        console.log("CSRF cookie fetched successfully");
      } catch (error) {
        console.error("Failed to fetch CSRF cookie:", error);
      }
    };

    fetchCsrfCookie();
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<GeneralLayouts />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route
            path="/klasifikasi"
            element={
              <PrivateRoute>
                <KlasifikasiPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/riwayat-klasifikasi"
            element={
              <PrivateRoute>
                <HistoryPage />
              </PrivateRoute>
            }
          />
          <Route path="/edit-profile" element={<EditProfileUser />} />
          <Route path="/Edukasi-Stunting" element={<EdukasiStuntingPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrasi" element={<RegistrasiPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/Data-Balita"
          element={
            <PrivateRoute>
              <DataBalita />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/Konten"
          element={
            <PrivateRoute>
              <KontenPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/Riwayat-Klasifikasi"
          element={
            <PrivateRoute>
              <RiwayatKlasifikasiPageAdmin />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
      />
    </Router>
  );
}

export default App;