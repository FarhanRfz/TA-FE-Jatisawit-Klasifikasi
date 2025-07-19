import SidebarAdmin from '../components/admin/sidebar'; // pastikan path ini benar
import NavbarAdmin from '../components/admin/navbar-admin';
import { useState } from 'react';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex overflow-hidden flex-col">
      {/* Navbar fixed full width */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <NavbarAdmin toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-1 pt-16"> {/* Padding top untuk hindari navbar overlap */}
        {/* Sidebar */}
        <div
          className={`w-64 md:w-80 bg-pink-100 transition-transform duration-300 ease-in-out fixed top-16 left-0 bottom-0 z-40 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="pt-6"> {/* Biar tombol dashboard tidak mepet */}
            <SidebarAdmin />
          </div>
        </div>

        {/* Konten utama */}
        <main
          className={`flex-1 pt-12 transition-all duration-300 bg-gray-50 p-20 
          ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
