import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking auth with token:", token);
      if (!token) {
        console.log("No token, redirecting to login");
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
        console.log("API response status:", response.status, response.statusText);
        if (response.ok) {
          setIsAuthenticated(true);
        } else if (response.status === 401) {
          console.log("Unauthorized, attempting to refresh token");
          const refreshResponse = await fetch("/api/refresh-token", { credentials: "include" });
          if (refreshResponse.ok) {
            const newToken = refreshResponse.headers.get("Authorization").replace("Bearer ", "");
            localStorage.setItem("token", newToken);
            setIsAuthenticated(true);
          } else {
            console.log("Refresh failed, logging out");
            setIsAuthenticated(false);
            localStorage.removeItem("token");
            toast.error("Sesi kedaluwarsa. Silakan login ulang.");
          }
        } else {
          console.log("Unexpected response:", response.status);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Network or API error:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 300000);
    return () => clearInterval(interval);
  }, [token]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;