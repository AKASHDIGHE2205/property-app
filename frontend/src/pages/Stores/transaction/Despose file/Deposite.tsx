/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import FirmMidal from "../Entries/FirmModal";
import { getAllDesposedFiles } from "../../../../services/Stores/transaction/transactionApi";
import { handleDepositeData, handleFirm } from "../../../../feature/Stores/transaction/TransactionSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Despose = () => {
  const [year, setYear] = useState('');
  const [showFirm, setShowFirm] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firmID, firmName } = useSelector((state: RootState) => state.transaction);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!year || !firmID) {
      toast.error('Please Fill all required fields.!');
      return
    }
    const body = {
      year: year,
      firm_code: firmID
    }
    const response: any = await getAllDesposedFiles(body);
    if (response) {
      setYear('');
      dispatch(handleFirm({ id: 0, name: "" }));
      dispatch(handleDepositeData({ data: response }))
      navigate('/transaction/desposed-file')
    }
  }

  const handleShow = () => {
    setShowFirm(true)
  }

  const handleCancel = () => {
    dispatch(handleFirm({ id: 0, name: "" }));
    setYear('')
    navigate('/transaction/view')
  }

  return (
    <>
      <div className="relative items-center w-full sm:max-w-2xl my-2 mx-2 border rounded-xl dark:border-gray-700 h-screen">
        <div className="flex flex-col p-4 sm:p-6 lg:p-5  justify-center">
          <h1 className="mb-4 text-2xl font-semibold flex justify-center">Desposed Files</h1>
          <div className="sticky right-0 ">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="member" className="block mb-2 dark:text-white">Year <span className="text-red-600 font-bold">*</span></label>
                <div className="relative">
                  <div className="flex rounded-lg shadow-sm">
                    <input type="text"
                      value={year}
                      className="rounded-lg py-3 px-4 block w-full mt-2 border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                      placeholder="Enter Year..."
                      onChange={(e) => setYear(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="member" className="block mb-2 dark:text-white">Firm <span className="text-red-600 font-bold">*</span></label>
                <div className="relative">
                  <div className="flex rounded-lg shadow-sm">
                    <input
                      type="text"
                      id="firm"
                      name="firm"
                      value={firmName}
                      className="rounded-l-lg py-3 px-4 block w-full border-gray-200  text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
                      placeholder="Select firm" readOnly />
                    <button type="button" className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-e-md border border-sky-400 focus:outline-none disabled:opacity-50 text-sky-500 dark:bg-gray-800"
                      onClick={handleShow}>
                      ☰
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-4 flex justify-center gap-x-4">
                <div>
                  <button type="submit" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-hidden focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none">Submit</button>
                </div>
                <div>
                  <button
                    type="button"
                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:outline-hidden focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FirmMidal show={showFirm} setShow={setShowFirm} />
    </>
  )
}

export default Despose;