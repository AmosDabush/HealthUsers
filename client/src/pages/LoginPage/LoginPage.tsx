import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Adjust the import path as necessary

import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Destructure the login function from useAuth

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(email, password); // Use the login function with email and password
      // Redirect the user to the home page or show a success message
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (show error message to the user)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="container">
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
