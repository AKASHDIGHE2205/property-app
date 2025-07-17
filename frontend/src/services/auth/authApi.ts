/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast from "react-hot-toast";
import { BaseUrl } from "../../constant/BaseUrl";

interface RegisterData {
  f_name: string;
  l_name: string;
  password: string;
  email: string;
  mobile: string;
}

export const registerApi = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${BaseUrl}/register`, data);
    if (response?.status === 201) {
      toast.success(response?.data?.message || "Registration successful!");
      return response?.data;
    }
  } catch (error: any) {
    console.error("Registration error:", error);
    const errorMessage = error?.response?.data?.message || "Network error.";
    toast.error(errorMessage);
  }
};

export const LoginApi = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/login`, data);
    if (response?.status === 200) {
      toast.success(response?.data?.message);
      return response?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network error!");
  }
};
