// src/helpers/httpHelper.ts

import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const loginUser = async (email: string, password: string) => {
  const config: AxiosRequestConfig = {
    url: "auth/login",
    method: "post",
    data: {
      email,
      password,
    },
  };
  return axiosInstance(config);
};

export const registerUser = async (
  fullName: string,
  email: string,
  phone: string,
  password: string
) => {
  const config: AxiosRequestConfig = {
    url: "/auth/register",
    method: "post",
    data: {
      fullName,
      email,
      phone,
      password,
    },
  };
  return axiosInstance(config);
};
