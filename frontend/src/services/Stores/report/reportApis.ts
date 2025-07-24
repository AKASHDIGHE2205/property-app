/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BaseUrl } from "../../../constant/BaseUrl";
import toast from "react-hot-toast";

export const getEntryStatus = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getEntryStatus`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const brachWiseReports = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/branch-wise-report`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const firmWiseReports = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/firm-wise-report`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const yearWiseReports = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/year-wise-report`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};
