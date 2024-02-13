import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { loginUser, registerUser } from "../helpers/httpHelper";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user_interface";

interface AuthContextType {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    phone: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  error: string | null;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!Cookies.get("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    console.log({ token });

    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    if (token) {
      setIsLoggedIn(true);
    }

    const decoded = jwtDecode(token);
    console.log({ decoded: decoded, token: token });
    const tokenExpiration = decoded.exp ? decoded.exp * 1000 : 0;
    console.log("tokenExpiration", tokenExpiration);
    if (tokenExpiration) {
      const expirationDate = new Date(tokenExpiration);

      if (expirationDate < new Date()) {
        navigate("/login");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      const { access_token, user } = response.data;
      Cookies.set("token", access_token, { expires: 7 });
      setIsLoggedIn(true);
      setUser(user);
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.error("Login error:", error);
      setError((error as Error).message);
      throw new Error("Login failed");
    }
  };

  const register = async (
    fullName: string,
    email: string,
    phone: string,
    password: string,
  ) => {
    try {
      await registerUser(fullName, email, phone, password);
      await login(email, password);
    } catch (error) {
      console.error("Registration error:", error);
      setError((error as Error).message);
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, error, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
