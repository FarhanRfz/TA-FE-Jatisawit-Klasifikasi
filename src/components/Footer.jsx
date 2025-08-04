import { Instagram, Facebook, Twitter } from "lucide-react";
import { RiTiktokFill } from "react-icons/ri"; // Ikon TikTok dari react-icons
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { kontakList } = useAppContext();

  const getSocialLink = (jenis) => kontakList.find((item) => item.jenis_kontak.toLowerCase() === jenis.toLowerCase())?.link_kontak || "#";

  return (
    <footer className="bg-amber-700 text-white px-6 pt-10 pb-10 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div>
          <Link to="/" className="flex flex-col items-center space-x-3 mb-3">
            <h1 className="font-bold text-lg">UPTD PUSKESMAS JATISAWIT</h1>
          </Link>
          <p className="text-sm leading-relaxed">
            Jln. Raya Jatisawit Lor<br />
            Kecamatan Jatibarang - Indramayu<br />
            Kode Pos 45273
          </p>
        </div>
        <div><a href="/" className="font-bold mb-2 hover:underline">Beranda</a></div>
        <div><a href="/Profil" className="font-bold mb-2 hover:underline">Profil</a></div>
        <div>
          <h4 className="font-bold mb-2">Layanan</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/Klasifikasi" className="hover:underline">Klasifikasi</a></li>
            <li><a href="/Edukasi-Stunting" className="hover:underline">Edukasi</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Ikuti Kami</h4>
          <div className="flex space-x-4 mt-2">
            <a href={getSocialLink("Instagram")} target="_blank" rel="noopener noreferrer">
              <Instagram className="hover:text-gray-200 cursor-pointer w-6 h-6" />
            </a>
            <a href={getSocialLink("Facebook")} target="_blank" rel="noopener noreferrer">
              <Facebook className="hover:text-gray-200 cursor-pointer w-6 h-6" />
            </a>
            {/* <a href={getSocialLink("Twitter")} target="_blank" rel="noopener noreferrer">
              <Twitter className="hover:text-gray-200 cursor-pointer w-6 h-6" />
            </a> */}
            <a href={getSocialLink("Tiktok")} target="_blank" rel="noopener noreferrer">
              <RiTiktokFill className="hover:text-gray-200 cursor-pointer w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;