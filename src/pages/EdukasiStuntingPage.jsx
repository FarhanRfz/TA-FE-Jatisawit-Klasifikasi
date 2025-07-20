    import React from "react";
    import HeroSection from "../components/Herosection";
    import BermainBan from "../assets/image/anak-bermain-ban.jpg";

    const EdukasiStuntingPage = () => {
    return (
    <div className="font-sans">
     {/* HeroSection */}
        <HeroSection
            heroSectionImage={BermainBan}
            text="Apa Itu Stunting ?"
            showButton1={true}
            showButton2={false}
            buttonText1="Selengkapnya"
            scrollTarget1="#edukasi"
        />

    <div className="font-sans py-12 px-6 md:px-20 bg-white" id="edukasi">
        <h1 className="text-3xl font-bold text-center mb-8">Edukasi Stunting</h1>
        <div className="bg-orange-100 p-6 rounded-lg shadow-md">
        <p className="text-gray-800 text-base leading-relaxed mb-4">
            Stunting adalah kondisi gagal tumbuh pada anak balita akibat
            kekurangan gizi kronis dan infeksi berulang terutama dalam 1.000 Hari
            Pertama Kehidupan (HPK). Anak yang mengalami stunting akan lebih
            pendek dari anak seusianya dan memiliki risiko gangguan perkembangan
            otak.
        </p>
        <p className="text-gray-800 text-base leading-relaxed mb-4">
            Penyebab utama stunting meliputi:</p>
            <ul className="list-disc list-inside mt-2 ml-4">
            <li>Kekurangan gizi sejak dalam kandungan</li>
            <li>ASI eksklusif yang tidak diberikan selama 6 bulan</li>
            <li>MP-ASI yang tidak tepat</li>
            <li>Infeksi yang berulang (seperti diare, ISPA)</li>
            <li>Sanitasi yang buruk dan akses air bersih terbatas</li>
            </ul>
        
        <p className="text-gray-800 text-base leading-relaxed mb-4">
            Dampak dari stunting bisa bersifat jangka panjang, seperti:</p>
            <ul className="list-disc list-inside mt-2 ml-4">
            <li>Penurunan kemampuan belajar dan prestasi akademik</li>
            <li>Kemampuan kognitif rendah</li>
            <li>Risiko tinggi terkena penyakit kronis saat dewasa</li>
            <li>Produktivitas rendah di masa depan</li>
            </ul>
        
        <p className="text-gray-800 text-base leading-relaxed mb-4">
            Pencegahan stunting dapat dilakukan dengan:</p>
            <ul className="list-disc list-inside mt-2 ml-4">
            <li>Pemenuhan gizi ibu hamil dan menyusui</li>
            <li>Imunisasi lengkap dan rutin</li>
            <li>Stimulasi perkembangan anak sejak dini</li>
            <li>Pemberian ASI eksklusif dan MP-ASI yang bergizi seimbang</li>
            <li>Peningkatan akses sanitasi dan air bersih</li>
            </ul>
        
        <p className="text-sm text-gray-600 mt-6 italic">
            Sumber: Kementerian Kesehatan Republik Indonesia –
            Ayosehat.kemkes.go.id
        </p>
        </div>
    </div>
    </div>
    );
    };

    export default EdukasiStuntingPage;
