import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401) {
          setIsAuthenticated(false);
          localStorage.removeItem("token"); // Hapus token kedaluwarsa
          toast.error("Sesi Anda telah kedaluwarsa. Silakan login ulang.");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    };

    checkAuth();

    // Pengecekan periodik setiap 5 menit
    const interval = setInterval(checkAuth, 300000); // 5 menit
    return () => clearInterval(interval);
  }, [token]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;