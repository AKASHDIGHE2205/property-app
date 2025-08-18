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
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header Section */}
        <div className="p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Disposed Files
          </h1>
        </div>
        <hr />
        {/* Form Section */}
        <div className="p-4 sm:p-6 lg:p-5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Year Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Year <span className="text-red-600 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={year}
                  className="block w-full px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition bg-white"
                  placeholder="Enter Year (YYYY-YY)..."
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Firm Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Firm <span className="text-red-600 font-bold">*</span>
              </label>
              <div className="flex rounded-lg shadow-sm">
                <input
                  type="text"
                  id="firm"
                  name="firm"
                  value={firmName}
                  className="block w-full px-3 py-3 rounded-l-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition bg-white"
                  placeholder="Select firm..."
                  readOnly
                />
                <button
                  type="button"
                  className="px-4 inline-flex items-center justify-center rounded-r-lg border border-sky-400  dark:bg-gray-800 text-sky-600 dark:text-sky-400  dark:hover:bg-gray-700 transition-colors font-bold"
                  onClick={handleShow}
                >
                  ☰
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-3 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                Submit
              </button>
              <button
                type="button"
                className="px-6 py-3 inline-flex items-center justify-center rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors shadow-sm hover:shadow-md font-medium"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <FirmMidal show={showFirm} setShow={setShowFirm} />
    </div>
  )
}

export default Despose;