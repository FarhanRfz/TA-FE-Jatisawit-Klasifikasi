import React, { use } from "react"; // Hanya impor React, tidak perlu Children kecuali digunakan
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GeneralLayouts = ({ children }) => {

  const location = useLocation();

  const hiddenFooterRoutes = ["/edit-profile", "/riwayat-klasifikasi"];

  const shouldHideFooter = hiddenFooterRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />
      <main className="">
        <Outlet /> {/* Outlet akan merender rute anak */}
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default GeneralLayouts;