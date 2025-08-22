import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { firmWiseReports } from "../../../../services/Stores/report/reportApis";
import { handleFirm } from "../../../../feature/Stores/transaction/TransactionSlice";
import toast from "react-hot-toast";
import FirmModal from "../../transaction/Entries/FirmModal";
import { FiCalendar, FiSearch, FiLoader, FiFileText, FiX } from "react-icons/fi";

interface firmData {
  doc_code: number;
  date: string;
  desc: string;
  firm_name: string;
  branch_name: string;
  year: string;
  cub_code: string;
  s_code: string;
  remark: string;
  firm_code: number;
  branch_code: number;
}

const FirmWiseReport = () => {
  const [data, setData] = useState([]);
  const [showFirm, setShowFirm] = useState(false);
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const dispatch = useDispatch();
  const { firmID, firmName } = useSelector((state: RootState) => state.transaction)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!year) {
      toast.error("Please fill all the required fields!");
      setLoading(false);
      return;
    }
    const body = {
      year: year,
      firm_code: firmID ? firmID : "All",
    }

    try {
      const response = await firmWiseReports(body);
      if (response) {
        setData(response);
        setShowTable(true);
        setYear("")
        dispatch(handleFirm({ id: 0, name: "" }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const handleCancel = () => {
    setData([]);
    setShowTable(false);
    setYear("")
    dispatch(handleFirm({ id: 0, name: "" }));
  }
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
        {/* Header Section */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 bg-white dark:bg-slate-800">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-800 dark:text-slate-200">
            Firm Wise Report
          </h1>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Year Input */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Year <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="year"
                    className="rounded-lg pl-10 block w-full px-3 py-2 rounded-l-lg focus:border-blue-500 disabled:bg-slate-100 dark:disabled:bg-slate-700 disabled:cursor-not-allowed border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-0 focus:ring-blue-500 transition bg-white"
                    placeholder="Enter Year (YYYY-YY)..."
                    disabled={showTable}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
              </div>

              {/* Firm Input */}
              <div>
                <label htmlFor="firm" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Firm
                </label>
                <div className="flex rounded-lg shadow-sm">
                  <input
                    type="text"
                    id="firm"
                    name="firm"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-lg  disabled:bg-slate-100 dark:disabled:bg-slate-700 disabled:cursor-not-allowed border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-0 focus:ring-blue-500 transition bg-white"
                    placeholder="Select firm"
                    value={firmName}
                    readOnly
                  />
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-r-md hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={showTable}
                    onClick={() => setShowFirm(true)}
                  >
                    <FiSearch className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg disabled:from-green-400 disabled:to-green-500 disabled:cursor-not-allowed"
                disabled={showTable || loading}
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <FiFileText className="hidden sm:block" />
                    Browse Report
                  </>
                )}
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm"
                onClick={handleCancel}
              >
                <FiX className="hidden sm:block" />
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Table Section */}
        {showTable && (
          <div className="p-6">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Doc No.
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Inward Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Particular
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Firm Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Branch Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Year
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider w-16">
                      CUB.No.
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Slot No.
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Remark
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center space-x-2">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                          <span className="text-slate-600 dark:text-slate-400">Loading report data...</span>
                        </div>
                      </td>
                    </tr>
                  ) : data && data.length > 0 ? (
                    data.map((row: firmData, index) => (
                      <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-200">
                          {row.doc_code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-200">
                          {new Date(row.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-200">
                          {row.desc}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">
                          {row.firm_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">
                          {row.branch_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-200">
                          {row.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-200">
                          {row.cub_code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-200">
                          {row.s_code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-200">
                          {row.remark}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center justify-center py-8">
                          <p className="text-slate-600 dark:text-slate-400 text-lg">No records found</p>
                          <p className="text-slate-500 dark:text-slate-500 text-sm">Try adjusting your search criteria</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Firm Modal */}
      {showFirm && <FirmModal show={showFirm} setShow={setShowFirm} />}
    </div>
  )
}

export default FirmWiseReport