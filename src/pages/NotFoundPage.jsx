import React from "react";
import NotFound from "../assets/image/404-error.png";

const NotFoundPage = () => {
return (
    <div className="flex lg:flex-row flex-col justify-center items-center min-h-screen p-5">
    <img src={NotFound} alt="" className="w-60 h-60" />
    <div className="lg:text-left text-center">
        <h1 className="font-bold lg:text-4xl text-2xl text-green-600">
        Maaf Halaman Tidak Ditemukan
        </h1>
        <p className="font-medium">
        Mungkin halaman telah dihapus, atau Anda salah menulis URL
        </p>
    </div>
    </div>
);
};

export default NotFoundPage;
