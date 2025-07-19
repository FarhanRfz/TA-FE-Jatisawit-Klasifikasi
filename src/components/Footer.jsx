import { Instagram, Facebook, Twitter, Music } from "lucide-react";
import logo1 from "../assets/image/Logo_KAB_IMY.png";
import logo2 from "../assets/image/logo-puskesmas-32976.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-amber-700 text-white px-6 pt-10 pb-10 relative">

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo dan Alamat */}
        <div>
          <Link to="/" className="flex flex-col items-center space-x-3 mb-3">
            
            <h1 className="font-bold text-lg">UPTD PUSKESMAS JATISAWIT</h1>
          </Link>
          <p className="text-sm leading-relaxed">
            Jln. Raya Jatisawit Lor
            <br />
            Kecamatan Jatibarang - Indramayu
            <br />
            Kode Pos 45273
          </p>
        </div>

        {/* Menu 1 */}
        <div>
          <a href="/" className="font-bold mb-2 hover:underline">Beranda</a>
        </div>

        {/* Menu 2 */}
        <div>
          <a href="/Profil" className="font-bold mb-2 hover:underline">Profil</a>
        </div>

        {/* Menu 3 */}
        <div>
          <h4 className="font-bold mb-2">Layanan</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/Klasifikasi" className="hover:underline">
                Klasifikasi
              </a>
            </li>
            <li>
              <a href="/Edukasi-Stunting" className="hover:underline">
              Edukasi
              </a>
            </li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h4 className="font-bold mb-2">Ikuti Kami</h4>
          <div className="flex space-x-4 mt-2">
            <Instagram className="hover:text-gray-200 cursor-pointer" />
            <Twitter className="hover:text-gray-200 cursor-pointer" />
            <Facebook className="hover:text-gray-200 cursor-pointer" />
            <Music className="hover:text-gray-200 cursor-pointer" />{" "}
            {/* TikTok icon substitute */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
