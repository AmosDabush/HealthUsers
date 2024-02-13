import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import UsersPage from "../pages/UsersPage/UsersPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();
  console.log({ isLoggedIn });

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <HomePage userName={user?.email || ""} logout={logout} />
          ) : (
            <Navigate to="/register" replace />
          )
        }
      />
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register"
        element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/" replace />}
      />
      <Route path="/users" element={<UsersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ProtectedRoute;
