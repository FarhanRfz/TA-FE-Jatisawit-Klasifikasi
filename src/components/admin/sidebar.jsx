import { Link, useLocation } from 'react-router-dom';
import ListSidebar from '../card/listsidebar-card';

const SidebarAdmin = () => {
  const location = useLocation();

  const menuItems = [
    { icon: "/Iconts/pc-member-icon.svg", title: "Data Balita", link: "/admin/data-balita" },
    { icon: "/Iconts/cpc-gallery-icon.svg", title: "Konten", link: "/admin/konten" },
    { icon: "/Iconts/pm-penyulingan.svg", title: "Riwayat Klasifikasi", link: "/admin/manajemen-admin" },
  ];

  return (
    <div className="h-full w-full bg-pink-100 px-4 pt-6 font-poppins overflow-y-auto">
      {/* Dashboard Link */}
      <Link to="/admin" className="block mb-6">
        <div className="bg-[#244255] hover:bg-[#356989] rounded-xl px-4 py-4 flex items-center space-x-3 shadow text-white">
          <img
            src="/public/Iconts/house (1).svg"
            alt="Dashboard Icon"
            className="h-5 w-5"
          />
          <span className="font-semibold text-xl">Dashboard</span>
        </div>
      </Link>

      {/* Menu Items */}
      <ul className="space-y-3 mt-4 px-4">
        {menuItems.map((item, index) => (
          <ListSidebar
            key={index}
            icon={item.icon}
            title={item.title}
            link={item.link}
            isActive={location.pathname === item.link}
          />
        ))}
      </ul>
    </div>
  );
};

export default SidebarAdmin;