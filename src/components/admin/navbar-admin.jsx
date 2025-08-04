import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // Pastikan path ini sesuai dengan konfigurasi API Anda
import { toast } from 'react-toastify'; // Jika Anda menggunakan toast untuk notifikasi

const NavbarAdmin = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await api.post("/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }); // Panggil endpoint logout di backend
            localStorage.removeItem('token'); // Hapus token dari localStorage
            localStorage.removeItem('role'); // Hapus role dari localStorage
            navigate('/login'); // Arahkan ke halaman login
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error("logout gagal")// Tambahkan notifikasi error jika diperlukan (misalnya dengan toast)
        }
    };

    return (
        <div className="flex justify-between bg-white shadow p-2 md:px-4 md:py-4 font-poppins">
            <div className="flex items-center space-x-4">
                <div className="logo-icon rounded-full h-14 w-14 shadow-2xl">
                    <img
                        src="/src/assets/image/logo-puskesmas-32976.png"
                        alt="SerehGrow"
                        className="h-10 w-10 md:h-14 md:w-14 shadow-md rounded-full"
                    />
                </div>
                <span className="font-bold text-lg text-[#1E5454]">PUSKESMAS JATISAWIT</span>
                <button className="md:pl-10 pl-4" onClick={toggleSidebar}>
                    <img
                        src="/public/Iconts/button-sidebar.svg"
                        alt="Toggle Sidebar"
                        className="h-6 w-6"
                    />
                </button>
            </div>
            <div className="admin-button flex items-center space-x-4">
                <span className="font-bold text-teal-700 mr-4">Admin</span>
                <div className="user-admin h-10 w-10 rounded-full flex items-center space-x-2 p-3 bg-[#1E5454]">
                    <img
                        src="/public/Iconts/user-solid-white.svg"
                        alt="Icon Admin"
                        className="h-4 w-4"
                    />
                </div>
                <button
                    onClick={handleLogout}
                    className="rounded-full items-center space-x-2 p-3 bg-red-500 text-white hover:bg-red-800 font-semibold text-sm"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

NavbarAdmin.propTypes = {
    toggleSidebar: PropTypes.func.isRequired, // PropTypes untuk memastikan toggleSidebar adalah fungsi
};

export default NavbarAdmin;