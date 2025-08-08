/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { RxCross2 } from "react-icons/rx";
import { newDeletePTransaction } from "../../../services/Property/transaction/pTranApis";
import { VscCheckAll } from "react-icons/vsc";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  fetchData: () => void;
  data: any;
}

const DeleteModal: FC<Props> = ({ show, setShow, fetchData, data }) => {

  const handleDelete = async () => {
    try {
      const status = await newDeletePTransaction(data);
      if (status === 200) {
        fetchData();
        setShow(false);
      }
    } catch (error: any) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div
      id="tran-del-modal"
      className={`fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden bg-gray-400 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      role="dialog" aria-labelledby="tran-del-modal-label">

      <div className="flex justify-center items-center min-h-screen m-2">
        <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">

          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Confirm Delete
            </h3>
            <button
              onClick={() => setShow(false)}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4">
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this file?
            </p>
          </div>

          <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShow(false)}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
              <RxCross2 size={18} />No
            </button>
            <button
              onClick={handleDelete}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              <VscCheckAll size={18} /> Yes, I'm sure
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DeleteModal;