/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { getActiveBranch } from "../../../../services/Stores/transaction/transactionApi";
import { handleBranch } from "../../../../feature/Stores/transaction/TransactionSlice";

interface Props {
  show: boolean,
  setShow: (show: boolean) => void
}

const BranchModal: FC<Props> = ({ show, setShow }) => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getActiveBranch();
      setData(response);
    } catch (error) {
      console.log("Error Fetching Data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchData();
    }
  }, [show]);

  const currentItems = data?.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item: any) => {
    dispatch(handleBranch({ id: item.id, name: item.name }));
    setShow(false);
  };

  return (
    <div
      id="branch-modal"
      className={`fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden bg-gray-500 bg-opacity-50 ${show ? "" : "hidden"}`}
      role="dialog"
      aria-labelledby="branch-modal-label"
    >
      <div className="flex justify-center items-center min-h-screen m-2">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
            <h3 id="branch-modal-label" className="font-bold text-gray-800 dark:text-white">
              Select Branch
            </h3>
            <button
              type="button"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              onClick={() => setShow(false)}
            >
              <IoMdClose color="black" />
            </button>
          </div>
          <div className="mx-3 my-1">
            <input
              type="text"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100"
              placeholder="Type to search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="px-4 max-h-[70vh] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase">firm Code</th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase">firm Name</th>
                  <th className="px-2 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ?
                  (<tr>
                    <td colSpan={13} className="text-center py-4">Loading...</td>
                  </tr>)
                  : (<>
                    {currentItems?.map((item: any) => (
                      <tr key={item.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-2 py-3">{item.id}</td>
                        <td className="px-2 py-3 uppercase">{item.name}</td>
                        <td className="px-2 py-3 text-end">
                          <button
                            type="button"
                            className="py-2 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-blue-700 bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20"
                            onClick={() => handleSelect(item)}
                          >
                            <IoCheckmarkDoneOutline size={20} />
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={13} className="text-center py-4">{currentItems?.length === 0 ? "No items found" : null}</td>
                    </tr>
                  </>)}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-center py-3 px-4 border-t dark:border-gray-700">
            <button
              type="button"
              className="py-3 px-4 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-lg"
              onClick={() => setShow(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BranchModal;