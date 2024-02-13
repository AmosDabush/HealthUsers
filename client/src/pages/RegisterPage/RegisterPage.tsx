// src/pages/RegisterPage/RegisterPage.tsx
import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Adjust the path as necessary
import {
  validateEmail,
  validatePhone,
  validatePassword,
} from "../../helpers/validationHelper";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./RegisterPage.css";
const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name: string;
    email: string;
    phone: string;
    password: string;
  }>({ name: "", email: "", phone: "", password: "" });

  const { register } = useAuth(); // Assuming your useAuth hook provides a register method

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);
    const isPasswordValid = validatePassword(password);

    // Reset errors
    setErrors({ name: "", email: "", phone: "", password: "" });

    // Add validation for name if required
    if (!name) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      return;
    }

    if (!isEmailValid || !isPhoneValid || !isPasswordValid) {
      setErrors({
        ...errors,
        email: isEmailValid ? "" : "Invalid email format",
        phone: isPhoneValid
          ? ""
          : "Invalid phone format. Expected format: 0xx5x-xxxxxxx",
        password: isPasswordValid
          ? ""
          : "Password must contain an uppercase, a lowercase, a number, and a special character",
      });
      return;
    }

    try {
      await register(name, email, phone, password);
      console.log(`${email} Registration successful`);
      // Redirect or show success message
    } catch (error) {
      console.error("Registration error:", error);
      // Handle registration error (e.g., show error message)
    }
  };

  const setPhoneWithHyphen = (value: string) => {
    // Automatically insert a hyphen after 3 digits if the string starts with "05"
    const formattedValue =
      value.startsWith("05") && value.length > 3
        ? value.slice(0, 3) + "-" + value.slice(3).replace(/-/g, "")
        : value.replace(/-/g, "");

    if (!value.startsWith("05"))
      setErrors((prev) => ({
        ...prev,
        phone: "Phone number must start with 05",
      }));
    else
      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    setPhone(formattedValue.slice(0, 11));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="container">
        <Typography component="h1" variant="h5">
          Register
        </Typography>
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
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPhoneWithHyphen(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
      </div>
    </Container>
  );
};

export default RegisterPage;
