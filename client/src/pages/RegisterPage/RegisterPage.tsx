import React from "react";
import { Typography, Container } from "@mui/material";

import "./RegisterPage.css";
import RegisterForm from "../../partials/RegisterForm/RegisterForm";
const RegisterPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <div className="container">
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <RegisterForm />
      </div>
    </Container>
  );
};

export default RegisterPage;
