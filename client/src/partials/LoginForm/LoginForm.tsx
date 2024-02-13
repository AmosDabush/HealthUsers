import React from "react";
import { Button, TextField } from "@mui/material";
import { useLoginForm } from "../../hooks/useLoginForm";

const LoginForm: React.FC = () => {
  const {
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  } = useLoginForm();

  return (
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
        onChange={handleChangeEmail}
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
        onChange={handleChangePassword}
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
  );
};

export default LoginForm;
