import { Typography, Container } from "@mui/material";

import "./LoginPage.css";
import LoginForm from "../../partials/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <div className="container">
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm />
      </div>
    </Container>
  );
};

export default LoginPage;
