import { FormEvent, useState } from "react";
import { tablehead } from "../../../../constant/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { firmWiseReports } from "../../../../services/Stores/report/reportApis";
import { handleFirm } from "../../../../feature/Stores/transaction/TransactionSlice";
import toast from "react-hot-toast";
import FirmModal from "../../transaction/Entries/FirmModal";

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

    if (!year || !firmID) {
      toast.error("Please fill all the required fields!");
      return;
    }
    const body = {
      year: year,
      firm_code: firmID
    }

    try {
      const response = await firmWiseReports(body);
      if (response) {
        setData(response);
        setShowTable(true);
        setLoading(false)
        setYear("")
        dispatch(handleFirm({ id: 0, name: "" }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="relative items-center w-full sm:max-w-6xl my-2 mx-2 border rounded-xl dark:border-gray-700">
        <div className="flex flex-col p-4 sm:p-6 lg:p-5 justify-center">
          <h1 className="mb-4 text-2xl font-semibold flex justify-center">Firm Wise Report</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="year" className="block mb-2 dark:text-white">Year <span className="text-red-600 font-bold">*</span></label>
                <input
                  type="text"
                  id="year"
                  className="rounded-lg py-3 px-4 block w-full mt-1 border-gray-200 text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 bg-slate-100 uppercase focus:outline-none disabled:cursor-not-allowed"
                  placeholder="Enter Year..."
                  disabled={showTable}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="firm" className="block mb-2 dark:text-white">Firm <span className="text-red-600 font-bold">*</span></label>
                <div className="flex rounded-lg shadow-sm">
                  <input
                    type="text"
                    id="firm"
                    name="firm"
                    value={firmName}
                    className="rounded-l-lg py-3 px-4 block w-full border-gray-200 text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 bg-slate-100 uppercase focus:outline-none disabled:cursor-not-allowed"
                    placeholder="Select firm"
                    readOnly
                  />
                  <button
                    type="button"
                    className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-e-md border border-sky-400 text-sky-500 dark:bg-gray-800 disabled:cursor-not-allowed"
                    disabled={showTable}
                    onClick={() => setShowFirm(true)}
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4 flex justify-center gap-x-4">
              <button
                type="submit"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:bg-green-700 disabled:bg-green-500 disabled:cursor-not-allowed"
                disabled={showTable}
              >
                Browse Report
              </button>
              <button
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:bg-gray-600 "
                onClick={() => { setShowTable(false) }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Table view */}
        {showTable &&

          <div className="h-screen w-full p-2 rounded-lg">
            <div className="flex-grow overflow-auto">
              <div className="border dark:border-gray-700 rounded-md p-2">
                <div className="overflow-y-auto overflow-x-auto max-h-[30rem]">
                  <table className="w-full border-collapse text-sm text-left text-gray-700 dark:text-gray-300">
                    <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                      <tr>
                        <th scope="col" className={tablehead}>Doc No.</th>
                        <th scope="col" className={tablehead}>Inward Date</th>
                        <th scope="col" className={tablehead}>Particular</th>
                        <th scope="col" className={tablehead}>Firm Name</th>
                        <th scope="col" className={tablehead}>Firm Name</th>
                        <th scope="col" className={tablehead}>Year</th>
                        <th scope="col" className={tablehead}>Cupboard No.</th>
                        <th scope="col" className={tablehead}>Slot No.</th>
                        <th scope="col" className={tablehead}>Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {loading ? (
                        <tr>
                          <td colSpan={8} className="text-center py-4">
                            Loading...
                          </td>
                        </tr>
                      ) : data && data.length > 0 ? (
                        data.map((row: firmData, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">{row.doc_code}</td>
                            <td className="px-4 py-2">{new Date(row.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2">{row.desc}</td>
                            <td className="px-4 py-2">{row.firm_name}</td>
                            <td className="px-4 py-2">{row.firm_name}</td>
                            <td className="px-4 py-2">{row.year}</td>
                            <td className="px-4 py-2">{row.cub_code}</td>
                            <td className="px-4 py-2">{row.s_code}</td>
                            <td className="px-4 py-2">{row.remark}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="text-center py-4 text-gray-500">
                            No records found.
                          </td>
                        </tr>
                      )}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>
        }

      </div>
      {showFirm && <FirmModal show={showFirm} setShow={setShowFirm} />}
    </>
  )
}

export default FirmWiseReport