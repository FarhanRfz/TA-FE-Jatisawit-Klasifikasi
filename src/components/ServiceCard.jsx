    import React from "react";
    import { Stethoscope, HeartPulse, Baby, ActivitySquare, AlertCircle, Biohazard, Pill, FlaskConical, Syringe } from "lucide-react";

    const icons = {
    "Pemeriksaan Umum": <Stethoscope className="text-orange-500 w-24 h-24 mb-2" />,
    "Kesehatan Gigi & Mulut": <HeartPulse className="text-orange-500 w-24 h-24 mb-2" />,
    "Kesehatan Ibu & Anak (KIA)": <Baby className="text-orange-500 w-24 h-24 mb-2" />,
    "Kesehatan Kerja": <ActivitySquare className="text-orange-500 w-24 h-24 mb-2" />,
    "Kesehatan Tradisional": <AlertCircle className="text-orange-500 w-24 h-24 mb-2" />,
    "Penyakit Tidak Menular": <Biohazard className="text-orange-500 w-24 h-24 mb-2" />,
    "Kefarmasian": <Pill className="text-orange-500 w-24 h-24 mb-2" />,
    "Laboratorium": <FlaskConical className="text-orange-500 w-24 h-24 mb-2" />,
    "Vaksinasi & Imunisasi": <Syringe className="text-orange-500 w-24 h-24 mb-2" />,
    };

    const ServiceCard = ({ title }) => {
    return (
        <div className="bg-white rounded-md shadow-md p-6 h-48 w-64 max-w-xs mx-auto flex flex-col items-center justify-center transition hover:scale-105 duration-200">
        {icons[title]}
        <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
    );
    };

    export default ServiceCard;
