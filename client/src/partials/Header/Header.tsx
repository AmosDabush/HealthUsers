import React from "react";
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import { useAuth } from "../../context/AuthContext";
import MainTitle from "../../assets/MainTitle.png";

import "./Header.css";

const Header: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <div>
      <AppBar
        className="Header"
        position="static"
        color="secondary"
        elevation={0}
      >
        <Toolbar>
          <Typography variant="subtitle1" style={{ flexGrow: 1 }}>
            <DarkModeSwitch
              onChange={toggleTheme}
              darkMode={theme.palette.mode === "dark"}
            />
          </Typography>
          <img
            alt="TitleLogo"
            style={{
              position: "absolute",
              top: 10,
              zIndex: 10,
              width: "400px",
              maxHeight: "100px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            width={"50%"}
            src={MainTitle}
            className="TitleLogo"
          />
          {isLoggedIn ? (
            <>
              <Button onClick={() => navigate("/")}>Home</Button>
              <Button onClick={() => navigate("/users")}>Users</Button>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/register")}>Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
