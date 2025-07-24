/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiMenuAddFill } from "react-icons/ri";
import { tablehead } from "../../../constant/BaseUrl";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import { getActiveConsignee, getActiveConsigner, getActiveDocuments, getActiveLoc } from "../../../services/Property/transaction/pTranApis";

interface Survey {
  consignee: string;
  surveyNo: string;
  area: string;
  sqmtr: string;
}
interface Document {
  docName: string;
  docDes: string;
  docAttach: string;
}
interface LocData {
  id: number
  name: string
  status: string
}
interface DocData {
  id: number
  name: string
}
interface ConsginorData {
  id: number
  name: string
  status: string
}
interface ConsigneeData {
  id: number
  name: string
  status: string
}

const TranNewEntry = () => {
  const [inputs, setInputs] = useState({
    docDate: "",
    fileName: "",
    location: "",
    consignor: "",
    category: "",
    type: "",
    cstNo: 0,
    purDate: "",
    purVal: 0,
    regFees: 0,
    fraFees: 0,
    remark: "",
  });
  const [docData, setDocData] = useState([]);
  const [locData, setLocData] = useState([]);
  const [consigneeData, setConsigneeData] = useState([]);
  const [consginorData, setConsginorData] = useState([]);

  const [surRows, setSurRows] = useState([{
    consignee: "",
    surveyNo: "",
    area: "",
    sqmtr: "",
  }]);
  const [rows, setRows] = useState([{
    docName: "",
    docDes: "",
    docAttach: "",
  }]);

  //Location Api 
  useEffect(() => {
    const fetchLoc = async () => {
      try {
        const response = await getActiveLoc();
        if (response) {
          setLocData(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoc();
  }, []);

  //Consignor Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getActiveConsigner();
        if (response) {
          setConsginorData(response);
        }
      } catch (error) {
        console.log(error);

      }
    }
    fetchData();
  }, []);

  //Consignee Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getActiveConsignee();
        if (response) {
          setConsigneeData(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getActiveDocuments();
        if (response) {
          setDocData(response);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const addSurRows = () => {
    setSurRows([...surRows, { consignee: "", surveyNo: "", area: "", sqmtr: "", }]);
  };

  const RemoveSurRows = () => {
    if (surRows.length > 1) {
      setSurRows(surRows.slice(0, -1));
    }
  };

  const addDocRows = () => {
    setRows([...rows, { docName: "", docDes: "", docAttach: "" }]);
  };

  const RemoveDocRows = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  const handleInputChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const handleSurInputChange = (e: any, index: number) => {
    const { name, value } = e.target;
    setSurRows(surRows.map((row, i) => {
      if (i === index) {
        return { ...row, [name]: value }
      }
      return row;
    }));
  }

  const handleDocInputChange = (e: any, index: number) => {
    const { name, value } = e.target;
    setRows(rows.map((row, i) => {
      if (i === index) {
        return { ...row, [name]: value }
      }
      return row;
    }));
  }

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('inputs', JSON.stringify(inputs));
    formData.append('surRows', JSON.stringify(surRows));
    formData.append('rows', JSON.stringify(rows));

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  }

  const handleCancel = () => {
    setInputs({
      docDate: "",
      fileName: "",
      location: "",
      consignor: "",
      category: "",
      type: "",
      cstNo: 0,
      purDate: "",
      purVal: 0,
      regFees: 0,
      fraFees: 0,
      remark: "",
    });
    setSurRows([{
      consignee: "",
      surveyNo: "",
      area: "",
      sqmtr: "",
    }]);
    setRows([{
      docName: "",
      docDes: "",
      docAttach: "",
    }]);
  }

  return (
    <>
      <div className="relative items-center w-full sm:max-w-5xl my-2 mx-2 shadow-lg">
        <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-5 dark:border-gray-700 justify-center">
          <h1 className="justify-center items-center flex text-xl font-semibold">Transaction Entry</h1>
          <form>
            <div className="mt-6 grid gap-4 lg:gap-6">

              {/* 3-Column Input Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="date" className="block mb-2 dark:text-white">
                    Doc. No:
                  </label>
                  <input
                    type="text"
                    name="docno"
                    id="docno"
                    className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="docDate"
                    className="block mb-2 dark:text-white"
                  >
                    Doc Date: <span className="font-bold text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="docDate"
                    id="docDate"
                    value={inputs?.docDate}
                    onChange={handleInputChange}
                    className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                    placeholder="Enter File No"
                  />
                </div>
                <div>
                  <label
                    htmlFor="fileName"
                    className="block mb-2 dark:text-white"
                  >
                    File Name <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="fileName"
                    name="fileName"
                    value={inputs?.fileName}
                    onChange={handleInputChange}
                    className="rounded-lg sm:py-3 py-2 px-4 block w-full border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                    placeholder="Select file name"
                  />
                </div>
              </div>

              {/* 2-Column Input + Button Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="location" className="block mb-2 dark:text-white">
                    Location <span className="text-red-600 font-bold">*</span>
                  </label>
                  <select
                    className="rounded-lg py-3 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                    id="location"
                    name="location"
                    value={inputs?.location}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Location</option>

                    {locData?.map((item: LocData) => (
                      <option key={item?.id} value={item?.id}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="consignor" className="block mb-2 dark:text-white">
                    Consignor <span className="text-red-600 font-bold">*</span>
                  </label>
                  <select
                    className="rounded-lg py-3 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                    id="consignor"
                    name="consignor"
                    value={inputs?.consignor}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Consignor</option>
                    {consginorData?.map((item: ConsginorData) => (
                      <option key={item?.id} value={item?.id}>{item?.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden">
                  <label
                    htmlFor="consignor"
                    className="block mb-2 dark:text-white"
                  >
                    Consignor <span className="text-red-600 font-bold">*</span>
                  </label>
                  <select
                    hidden
                    id="consignee"
                    name="consignee"
                    className="hs-select rounded-lg py-3 px-4  w-[15rem] sm:w-full mt-2 bg-slate-100 border-gray-200 text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none "
                    data-hs-select={`{
        "placeholder": "Select Consignee...",
        "toggleTag": "<button type='button' aria-expanded='false'></button>",
        "toggleClasses": "relative py-3 ps-4 pe-9 w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm",
        "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-y-auto",
        "optionClasses": "py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
      }`}
                  >
                    <option value="">Choose</option>
                    {consigneeData.map((item: ConsigneeData) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  <textarea
                    id="consignee"
                    name="consignee"
                    className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                    rows={1} />
                  <div>
                  </div>
                </div>
              </div>

              {/**survey no table here */}
              <div className="border rounded-md w-full max-w-5xl mx-auto overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                    <tr>
                      <th className={tablehead}>Sr No.</th>
                      <th className={tablehead}>Consignee</th>
                      <th className={tablehead}>Survey No.</th>
                      <th className={tablehead}>Area</th>
                      <th className={tablehead}>Sq. Mtr.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {surRows?.map((item: Survey, index: number) => (
                      <tr key={index}>
                        <td className="sm:py-3 py-2 px-2 ">{index + 1}</td>
                        <td className="py-2 px-2">
                          <select
                            className="rounded-lg py-3 px-4 block w-[15rem]  mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                            name="consignee"
                            value={item?.consignee}
                            onChange={(e) => handleSurInputChange(e, index)}
                          >
                            <option value="">Select Consignee</option>
                            {consigneeData?.map((item: ConsigneeData) => (
                              <option key={item?.id} value={item?.id}>{item?.name}</option>
                            ))}
                          </select>
                        </td>
                        {/* File Type Dropdown */}
                        <td className="py-2 px-2 ">
                          <div>
                            <input
                              type="text"
                              id="surveyNo"
                              name="surveyNo"
                              value={item?.surveyNo}
                              onChange={(e) => handleSurInputChange(e, index)}
                              className="rounded-lg sm:py-3 py-2 px-4 block w-[15rem] mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                              placeholder="Enter Survey No"
                            />
                          </div>
                        </td>

                        {/* Description Input */}
                        <td className="sm:py-3 py-2 px-2 ">
                          <div>
                            <input
                              type="text"
                              id="area"
                              name="area"
                              value={item?.area}
                              onChange={(e) => handleSurInputChange(e, index)}
                              className="rounded-lg sm:py-3 py-2 px-4 block w-[10rem] mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500 text-right"
                              placeholder="Enter Area"
                            />
                          </div>
                        </td>

                        {/* File Input */}
                        <td className="sm:py-3 py-2 px-2 ">
                          <div>
                            <input
                              type="number"
                              id="sqmtr"
                              name="sqmtr"
                              value={item?.sqmtr}
                              onChange={(e) => handleSurInputChange(e, index)}
                              className="rounded-lg sm:py-3 py-2 px-4 block w-[10rem] mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500 text-right"
                              placeholder="Enter type"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/**Button to add Row and Selete Row */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                  onClick={addSurRows}
                >
                  <RiMenuAddFill />
                </button>
                <button
                  type="button"
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                  onClick={RemoveSurRows}
                >
                  <MdDeleteForever />
                </button>
              </div>

              {/* Another 4-Column Group */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 lg:gap-6">
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 dark:text-white"
                  >
                    Category <span className="text-red-600 font-bold">*</span>
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={inputs?.category}
                    onChange={handleInputChange}
                    className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="jr">Junior</option>
                    <option value="sr">Senior</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="type" className="block mb-2 dark:text-white">
                    Type: <span className="font-bold text-red-600">*</span>
                  </label>
                  <select
                    name="type"
                    id="type"
                    value={inputs?.type}
                    onChange={handleInputChange}
                    className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="AG">Agri</option>
                    <option value="NA">Non-Agri</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="cstNo" className="block mb-2 dark:text-white">
                    C.S.T. No. <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="number"
                    id="cstNo"
                    name="cstNo"
                    value={inputs?.cstNo}
                    onChange={handleInputChange}
                    className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500 text-right"
                    placeholder="Enter CST No."
                  />
                </div>
                <div>
                  <label
                    htmlFor="purDate"
                    className="block mb-2 dark:text-white"
                  >
                    Purchase Date
                    <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="date"
                    id="purDate"
                    name="purDate"
                    value={inputs?.purDate}
                    onChange={handleInputChange}
                    className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Final 3-Column Row */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 lg:gap-6">
                <div>
                  <label
                    htmlFor="purVal"
                    className="block mb-2 dark:text-white"
                  >
                    Pur. Value <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="number"
                    id="purVal"
                    name="purVal"
                    value={inputs?.purVal}
                    onChange={handleInputChange}
                    className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500 text-right"
                  />
                </div>
                <div>
                  <label
                    htmlFor="regFees"
                    className="block mb-2 dark:text-white"
                  >
                    Reg. Fees <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="number"
                    id="regFees"
                    name="regFees"
                    value={inputs?.regFees}
                    onChange={handleInputChange} className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 
                    dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500 text-right"
                  />
                </div>
                <div>
                  <label htmlFor="fraFees" className="block mb-2 dark:text-white">
                    Stamp/Franking Fees <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="number"
                    id="fraFees"
                    name="fraFees"
                    value={inputs?.fraFees}
                    onChange={handleInputChange}
                    className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500 text-right"
                  />
                </div>
                <div>
                  <label htmlFor="remark" className="block mb-2 dark:text-white">
                    Remark <span className="text-red-600 font-bold">*</span>
                  </label>
                  <textarea
                    id="remark"
                    name="remark"
                    value={inputs?.remark}
                    onChange={handleInputChange}
                    className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                    rows={1}
                  />
                </div>
              </div>

              {/* Document Table */}
              <div className="border rounded-md w-full max-w-5xl mx-auto overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                    <tr>
                      <th className={tablehead}>Sr No.</th>
                      <th className={tablehead}>Doc Name</th>
                      <th className={tablehead}>Doc Description</th>
                      <th className={tablehead}>Attachment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {rows?.map((item: Document, index: number) => (
                      <tr key={index}>
                        <td className="sm:py-3 py-2 px-2 ">{index + 1}</td>

                        {/* File Type Dropdown */}
                        <td className="py-2 px-2 ">
                          <select
                            id="docName"
                            name="docName"
                            value={item?.docName}
                            onChange={(e) => handleDocInputChange(e, index)}
                            className="rounded-lg py-3 px-4 block w-[15rem] sm:w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                          >
                            <option value="">Select Document</option>
                            {docData?.map((item: DocData) => {
                              return (
                                <option key={item?.id} value={item?.name}>{item?.name}</option>
                              )
                            })}
                          </select>
                        </td>

                        {/* Description Input */}
                        <td className="sm:py-3 py-2 px-2 ">
                          <input
                            type="text"
                            name="docDes"
                            defaultValue={item?.docDes}
                            onChange={(e) => handleDocInputChange(e, index)}
                            className="rounded-lg py-3 px-4 block w-[15rem] sm:w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                          />
                        </td>

                        {/* File Input */}
                        <td className="sm:py-3 py-2 px-2 ">
                          <input
                            type="file"
                            name="docAttach"
                            value={item?.docAttach}
                            onChange={(e) => handleDocInputChange(e, index)}
                            className="rounded-lg py-3 px-4 block w-[15rem] sm:w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                          />
                        </td>
                      </tr>
                    ))}

                  </tbody>

                </table>
              </div>

              {/* Buttons  */}
              <div className="flex justify-end gap-2 mt-4 ">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                  onClick={addDocRows}
                >
                  <RiMenuAddFill />
                </button>
                <button
                  type="button"
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                  onClick={RemoveDocRows}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Submit Cancel Buttons Row */}
        <div className="flex justify-center items-center gap-2 my-2">
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 border border-green-700 rounded-lg text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div>
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 border border-gray-700 rounded-lg text-white"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default TranNewEntry;