import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GeneralLayouts from "./layouts/GeneralLayout";
import HomePage from "./pages/HomePage";
import KlasifikasiPage from "./pages/KlasifikasiPage";
import ProfilPage from "./pages/ProfilPage";
import NotFoundPage from "./pages/NotFoundPage";

import DataBalita from "./pages/Admin/Data-balita/DataBalita";
import EdukasiStuntingPage from "./pages/EdukasiStuntingPage";
import KontenPage from "./pages/Admin/Konten/KontenPage";

import AdminPage from "./pages/Admin/AdminPage";
import LoginPage from "./pages/Admin/LoginPage";
import EditProfileUser from "./pages/EditProfilePage";
import RegistrasiPage from "./pages/Admin/RegistrasiPage";
import ForgotPasswordPage from "./pages/Admin/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Admin/ResetPassword";

// Komponen PrivateRoute untuk proteksi route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<GeneralLayouts />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/klasifikasi" element={<KlasifikasiPage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/edit-profile" element={<EditProfileUser />} />
          <Route path="/Edukasi-Stunting" element={<EdukasiStuntingPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrasi" element={<RegistrasiPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/Data-Balita" element={<DataBalita/>} />
        <Route path="/admin/Konten" element={<KontenPage/>} />
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