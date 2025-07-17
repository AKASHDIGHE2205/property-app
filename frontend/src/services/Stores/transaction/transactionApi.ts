/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BaseUrl } from "../../../constant/BaseUrl";
import toast from "react-hot-toast";

export const getActiveFirms = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getActiveFirms`);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const getActiveBranch = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getActiveBranches`);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const getActiveCatgs = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getActivecatgs`);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const getActiveLocations = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getActiveLocations`);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const getActiveSections = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getActiveSections`);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const getAllTranEntries = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/getAllTranEntries`, data);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const getAllDesposedFiles = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/get-desposed-files`, data);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const createNewTranEntry = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/newTranEntry`, data);
    if (response.status === 201) {
      toast.success(response?.data.message || "Entry created successfully.");
      return response.status;
    } else {
      toast.error(response?.data?.message || "Something went wrong.");
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const getUpdateEntry = async (id: any) => {
  try {
    const response = await axios.get(`${BaseUrl}/getTranEntry/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error(response?.data?.message || "Something went wrong.");
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const updateEntry = async (data: any) => {
  try {
    const response = await axios.put(`${BaseUrl}/updateTranEntry`, data);
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.status;
    } else {
      toast.error(response?.data?.message || "Something went wrong.");
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
