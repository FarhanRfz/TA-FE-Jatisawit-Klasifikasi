import React from "react";
import HeroSection from "../components/Herosection";
import BermainBan from "../assets/image/anak-bermain-ban.jpg";
import { useAppContext } from "../context/AppContext";

const EdukasiStuntingPage = () => {
  const { edukasiStunting } = useAppContext();

  return (
    <div className="font-sans">
      <HeroSection heroSectionImage={BermainBan} text={edukasiStunting.judul || "Apa Itu Stunting ?"} showButton1={true} showButton2={false} buttonText1="Selengkapnya" scrollTarget1="#edukasi" />
      <div className="font-sans py-12 px-6 md:px-20 bg-white" id="edukasi">
        <h1 className="text-3xl font-bold text-center mb-8" text={edukasiStunting.judul || "Edukasi Stunting"}/>
        <div className="bg-orange-100 p-6 rounded-lg shadow-md">
          <p className="text-gray-800 text-base leading-relaxed mb-4">
            Stunting adalah kondisi gagal tumbuh pada anak balita akibat kekurangan gizi kronis dan infeksi berulang terutama dalam 1.000 Hari Pertama Kehidupan (HPK). Anak yang mengalami stunting akan lebih pendek dari anak seusianya dan memiliki risiko gangguan perkembangan otak.
            </p>
          <p className="text-gray-800 text-base leading-relaxed mb-4">Penyebab utama stunting meliputi:</p>
          <ul className="list-disc list-inside mt-2 ml-4">{(edukasiStunting.informasi_stunting || "").split("\n").map((item, index) => <li key={index}>{item}</li>)}</ul>
        </div>
      </div>
    </div>
  );
};

export default EdukasiStuntingPage;