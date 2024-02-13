import { useState, ChangeEvent, FormEvent } from "react";
import {
  validateEmail,
  validatePhone,
  validatePassword,
} from "../helpers/validationHelper";
import { useAuth } from "../context/AuthContext";

interface Errors {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export const useRegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { register } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);
    const isPasswordValid = validatePassword(password);

    if (!name || !isEmailValid || !isPhoneValid || !isPasswordValid) {
      setErrors({
        name: !name ? "Name is required" : "",
        email: isEmailValid ? "" : "Invalid email format",
        phone: isPhoneValid
          ? ""
          : "Invalid phone format. Expected format: 0xx5x-xxxxxxx",
        password: isPasswordValid
          ? ""
          : "Password most contain minimum 8 chars an uppercase, a lowercase, a number, and a special character",
      });
      return;
    }

    try {
      await register(name, email, phone, password);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const setPhoneWithHyphen = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const formattedValue =
      value.startsWith("05") && value.length > 3
        ? `${value.slice(0, 3)}-${value.slice(3).replace(/-/g, "")}`
        : value.replace(/-/g, "");
    setPhone(formattedValue.slice(0, 11));
    if (!value.startsWith("05")) {
      setErrors((prev) => ({
        ...prev,
        phone: "Phone number must start with 05",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  return {
    name,
    setName: handleChange(setName),
    email,
    setEmail: handleChange(setEmail),
    phone,
    setPhone: setPhoneWithHyphen,
    password,
    setPassword: handleChange(setPassword),
    showPassword,
    setShowPassword,
    errors,
    handleSubmit,
    handleClickShowPassword,
    handleMouseDownPassword,
  };
};
