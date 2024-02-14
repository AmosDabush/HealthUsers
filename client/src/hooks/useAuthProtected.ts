import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const useAuthProtected = (): void => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp ? decoded.exp * 1000 : 0;
    if (tokenExpiration) {
      const expirationDate = new Date(tokenExpiration);

      if (expirationDate < new Date()) {
        navigate("/login");
      }
    }
  }, [navigate]);
};

export default useAuthProtected;
