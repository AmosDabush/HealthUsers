import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { lightTheme, darkTheme } from "./themes/themes";
import Header from "./partials/header/Header";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";
const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <Router>
          <AuthProvider>
            <Header toggleTheme={toggleTheme} />
            <ProtectedRoute />
          </AuthProvider>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
