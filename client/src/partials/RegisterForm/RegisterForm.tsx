import React from "react";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRegisterForm } from "../../hooks/useRegisterForm";

const RegisterForm: React.FC = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    showPassword,
    errors,
    handleSubmit,
    handleClickShowPassword,
    handleMouseDownPassword,
  } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Full Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={setName}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={setEmail}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="phone"
        label="Phone Number"
        name="phone"
        autoComplete="phone"
        value={phone}
        onChange={setPhone}
        error={!!errors.phone}
        helperText={errors.phone}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={setPassword}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
