/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast from "react-hot-toast";
import { BaseUrl } from "../../../constant/BaseUrl";

// ------------ Consignor Api Functions ------------ //
export const getAllConsigners = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getAllConsignor`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};
export const newConsigner = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/newConsigner`, data);
    if (response.status === 201) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "An error occurred while creating the firm."
    );
  }
};
export const editConsigner = async (data: any) => {
  try {
    const response = await axios.put(`${BaseUrl}/editConsigner`, data);
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
};

// ------------ Consignee Api Functions ------------ //
export const getAllConsignees = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getAllConsignee`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};
export const newConsignee = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/newConsignee`, data);
    if (response.status === 201) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "An error occurred while creating the firm."
    );
  }
};
export const editConsignee = async (data: any) => {
  try {
    const response = await axios.put(`${BaseUrl}/editConsignee`, data);
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
};

// ------------ Document Api Functions ------------ //
export const getAllDocument = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getAllDocument`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};
export const newDocument = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/newDocument`, data);
    if (response.status === 201) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "An error occurred while creating the firm."
    );
  }
};
export const editDocument = async (data: any) => {
  try {
    const response = await axios.put(`${BaseUrl}/editDocument`, data);
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
};

// ------------ Location Api Functions ------------ //
export const getAllPLocation = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getAllPLocation`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};
export const newPLocation = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/newPLocation`, data);
    if (response.status === 201) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "An error occurred while creating the firm."
    );
  }
};
export const editPLocation = async (data: any) => {
  try {
    const response = await axios.put(`${BaseUrl}/editPLocation`, data);
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
};
