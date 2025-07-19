import React, { useState } from "react";
import AdminLayout from '../../../layouts/AdminLayout';
import UmumKonten from './Umum';
import Profil from './Profil';
import Edukasi from "./EdukasiStunting";

const KontenPage = () => {
  const [activeTab, setActiveTab] = useState("umum");

  return (
    <AdminLayout>
      <div className="p-6 bg-white min-h-screen font-sans">
        <h1 className="text-2xl font-bold mb-2 text-green-800">
          DASHBOARD KONTEN PUSKESMAS JATISAWIT
        </h1>

        {/* Tabs */}
        <div className="flex mb-6">
          {["umum", "profil", "edukasi"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full px-20 py-2 border border-gray-300 font-semibold text-sm capitalize ${
                activeTab === tab
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-50 p-6 rounded shadow-md">
          {activeTab === "umum" && <UmumKonten />}
          {activeTab === "profil" && <Profil />}
          {activeTab === "edukasi" && <Edukasi />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default KontenPage;
