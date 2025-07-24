/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { getActiveLoc } from "../../../services/Property/transaction/pTranApis";
import { useDispatch } from "react-redux";
import { handlePLocation } from "../../../feature/Preperties/ptransaction/PTransactionSlice";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

const LocModal: FC<Props> = ({ show, setShow }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const fetchLoc = async () => {
      try {
        const response = await getActiveLoc();
        if (response) {
          setData(response);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoc();
  }, [show]);

  const filtereData = data.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (item: any) => {
    dispatch(handlePLocation(({ id: item.id, name: item.name })));
    setShow(false);
  }

  return (
    <div
      id="Location-modal"
      className={`fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden bg-gray-500 bg-opacity-50 transition-opacity duration-300 ease-in-out ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      role="dialog"
      aria-labelledby="Location-modal-label"
    >
      <div className="flex justify-center items-center min-h-screen m-2">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
            <h3 id="Location-modal-label" className="font-bold text-gray-800 dark:text-white">
              Select Location
            </h3>
            <button
              type="button"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              onClick={() => setShow(false)}>
              <IoMdClose color="black" />
            </button>
          </div>
          <div className="mx-3 my-1">
            <input
              type="text"
              className="rounded-lg py-3 px-4 block w-full mt-2 border-gray-200 text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase focus:outline-none focus:ring-0 dark:focus:border-blue-500"
              placeholder="Type to search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="px-4 max-h-[70vh] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase">Code</th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-2 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ?
                  (<tr>
                    <td colSpan={13} className="text-center py-4">Loading...</td>
                  </tr>)
                  : (<>
                    {filtereData?.map((item: any) => (
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
                      <td colSpan={13} className="text-center py-4">{filtereData?.length === 0 ? "No location found" : null}</td>
                    </tr>
                  </>)}
              </tbody>
            </table>
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

export default LocModal;