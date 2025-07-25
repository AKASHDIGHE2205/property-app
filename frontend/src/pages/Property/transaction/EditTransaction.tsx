/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { tablehead } from "../../../constant/BaseUrl";

import { MdDeleteForever } from "react-icons/md";
import { RiMenuAddFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  fetchData: () => void;
  data: any
}

const EditTransaction: FC<Props> = ({ show, setShow, fetchData, data }) => {
  console.log(data);

  return (
    <div
      id="edit-tran-modal"
      className={`fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden bg-gray-500 bg-opacity-50 transition-opacity duration-300 ease-in-out ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      role="dialog"
      aria-labelledby="edit-tran-modal-label"
    >
      <div className="flex justify-center items-center min-h-screen m-2">
        <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
            <h3 id="edit-tran-modal-label" className="font-bold text-gray-800 dark:text-white">
              Select Consignee
            </h3>
            <button
              type="button"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              onClick={() => setShow(false)}
            >
              <IoMdClose color="black" />
            </button>
          </div>
          <div className="px-4 max-h-[70vh] overflow-y-auto">
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
                    >
                      <option value="">Select Location</option>

                    </select>
                  </div>
                  <div>
                    <label htmlFor="consignor" className="block mb-2 dark:text-white">
                      Consignor <span className="text-red-600 font-bold">*</span>
                    </label>
                    <textarea
                      id="consignor"
                      name="consignor"
                      className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                      rows={1}
                    />
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
                    >
                      <option value="">Choose</option>
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

                      <tr >
                        <td className="sm:py-3 py-2 px-2 ">1</td>
                        <td className="py-2 px-2">
                          <select
                            className="rounded-lg py-3 px-4 block w-[15rem]  mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                            name="consignee"
                          >
                            <option value="">Select Consignee</option>

                          </select>
                        </td>
                        {/* File Type Dropdown */}
                        <td className="py-2 px-2 ">
                          <div>
                            <input
                              type="text"
                              id="surveyNo"
                              name="surveyNo"
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
                              className="rounded-lg sm:py-3 py-2 px-4 block w-[10rem] mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500 text-right"
                              placeholder="Enter type"
                            />
                          </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

                {/**Button to add Row and Selete Row */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                  >
                    <RiMenuAddFill />
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
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
                      className="rounded-lg sm:py-3 py-2 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 
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

                      <tr >
                        <td className="sm:py-3 py-2 px-2 ">1</td>

                        {/* File Type Dropdown */}
                        <td className="py-2 px-2 ">
                          <select
                            id="docName"
                            name="docName"
                            className="rounded-lg py-3 px-4 block w-[15rem] sm:w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                          >
                            <option value="">Select Document</option>
                          </select>
                        </td>

                        {/* Description Input */}
                        <td className="sm:py-3 py-2 px-2 ">
                          <input
                            type="text"
                            name="docDes"
                            className="rounded-lg py-3 px-4 block w-[15rem] sm:w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                          />
                        </td>

                        {/* File Input */}
                        <td className="sm:py-3 py-2 px-2 ">
                          <input
                            type="file"
                            name="docAttach"
                            className="rounded-lg py-3 px-4 block w-[15rem] sm:w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                          />
                        </td>
                      </tr>
                    </tbody>

                  </table>
                </div>

                {/* Buttons  */}
                <div className="flex justify-end gap-2 mt-4 ">
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"

                  >
                    <RiMenuAddFill />
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"

                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            </form>
          </div>


          <div className="flex justify-end gap-4 items-center py-3 px-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:outline-hidden focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTransaction;