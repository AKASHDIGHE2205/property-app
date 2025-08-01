/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast from "react-hot-toast";
import { BaseUrl } from "../../../constant/BaseUrl";

//---------- get Api For MOdal VIew -----------//
export const getActiveLoc = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getActivePLocation`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const getActiveConsigner = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getActiveConsignor`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const getActiveConsignee = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getActiveConsignee`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const getActiveDocuments = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getActiveDocument`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

//--------------- Trancation Api -------------------//
export const getAllTRansactions = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/getTransactionData`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

// export const newTransaction = async (formData: FormData) => {
//   try {
//     const response = await axios.post(`${BaseUrl}/new-ptran`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     if (response.status === 200) {
//       toast.success(response.data.message);
//       return response.data;
//     }
//   } catch (error: any) {
//     toast.error(error?.response?.data?.message || "Network Error.");
//   }
// };

export const newTransaction = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BaseUrl}/new-ptran`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
  }
};

export const editPTransaction = async (data: any) => {
  try {
    const response = await axios.put(`${BaseUrl}/editPTransaction`, data);
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.status;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
  }
};

export const deletePTransaction = async (id: any) => {
  try {
    const response = await axios.put(`${BaseUrl}/deletePTransaction`, {
      doc_no: id,
    });

    if (response.status === 200) {
      toast.error(response.data.message);
      return response.status;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
  }
};

export const newPropertyTransaction = async (formData: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/new-property-tran`, formData);
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
  }
};
export const getAllTRansactions1 = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/getTransactionData1`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
    return null;
  }
};

export const getPtranData = async (data: any) => {
  try {
    const response = await axios.get(`${BaseUrl}/getPtranData/${data}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
  }
};

export const updatePTran = async (data: any) => {
  try {
    const response = await axios.put(`${BaseUrl}/updatePTran`, data);
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
  }
};
export const newDeletePTransaction = async (id: any) => {
  try {
    const response = await axios.put(`${BaseUrl}/newDeletePTransaction`, {
      doc_no: id,
    });

    if (response.status === 200) {
      toast.error(response.data.message);
      return response.status;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
  }
};

// -------------Sale Property Apis-------------//
export const getSaleModalData = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/getSaleModalData`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
  }
};

export const getSaleProperty = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/getSaleProperty`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
  }
};

export const newSaleProperty = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/newSaleProperty`, data);
    if (response.status === 201) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
  }
};

export const getAllSaledProp = async (data: any) => {
  try {
    const response = await axios.post(`${BaseUrl}/getAllSaledProp`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Network Error.");
  }
};
