/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoAddCircleOutline } from "react-icons/io5";
import { tablebody, tablehead } from "../../../constant/BaseUrl";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import { getAllTRansactions1 } from "../../../services/Property/transaction/pTranApis";
import { useEffect, useState } from "react";
import Paginations from "../../../helper/Pagination";
import moment from "moment";
import EditTransaction from "./EditTransaction";
import { RiDeleteBin5Line } from "react-icons/ri";
import DeleteModal from "./DeleteModal";

interface TranData {
  doc_id: number;
  doc_date: string;
  file_name: string;
}

const TranView = () => {
  const [from, setFrom] = useState<string>(() =>
    moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD")
  );
  const [to, setTo] = useState<string>(() => moment().format("YYYY-MM-DD"));
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEdit, setshowEdit] = useState(false);
  const [selectedTran, setSelectedTran] = useState(0);
  const [showFilter, setShowFilter] = useState(true);

  const browseData = async () => {
    setLoading(true);
    try {
      const body = {
        from_date: from,
        to_date: to,
      };
      const response = await getAllTRansactions1(body);
      if (response) {
        setData(response);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    browseData();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data?.filter((item: TranData) =>
    (item?.doc_id?.toString().toLowerCase() ?? "").includes(searchTerm.toString().toLowerCase()) ||
    (item?.doc_date?.toString().toLowerCase() ?? "").includes(searchTerm.toString().toLowerCase()) ||
    item?.file_name?.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (data: number) => {
    setSelectedTran(data);
    setshowEdit(true);
  };

  const handleDelete = (item: any) => {
    setSelectedTran(item);
    setshowDelete(true);
  };

  return (
    <>
      <div className="min-h-screen w-full border dark:border-gray-500 p-2 rounded-lg">
        <h1 className="flex justify-center items-center text-2xl font-semibold">
          Transaction Details
        </h1>
        <div className="flex justify-end items-end gap-2 py-2">
          {/* Filter Button */}
          <div className="flex items-end justify-end">
            <button
              className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:outline-hidden focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none "
              onClick={() => {
                setShowFilter(!showFilter);
              }}
            >
              {!showFilter ? "Hide Filter" : "Show Filter"}
            </button>
          </div>
          {/* Add Entry Button */}
          <div className="flex items-end justify-end">
            <Link
              to="/property/transaction/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
            >
              <IoAddCircleOutline size={18} />
              Add Entry
            </Link>
          </div>
        </div>
        {showFilter && (
          <div className="sticky right-0 w-full p-4 mb-2 bg-white dark:bg-gray-900 rounded-lg shadow">
            {/* Row 1: Search, From Date, To Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
              {/* Search */}
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Type your search query here"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* From Date */}
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  From Date
                </label>
                <input
                  type="date"
                  defaultValue={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  To Date
                </label>
                <input
                  type="date"
                  defaultValue={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Row 2: Browse Button and Items Per Page Selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Browse Button */}
              <button
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-hidden focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={browseData}
              >
                Browse Data
              </button>

              {/* Select Items Per Page */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Rows per page
                </label>
                <select
                  className="w-[80px] px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  value={itemsPerPage}
                >
                  {[5, 10, 25, 50, 100].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
        <div className="flex-grow overflow-auto">
          <div className="border border-gray-300 rounded-md">
            <div className="overflow-y-auto overflow-x-auto max-h-[30rem]">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 p-2">
                <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                  <tr>
                    <th scope="col" className={tablehead}>
                      Doc. No.
                    </th>
                    <th scope="col" className={tablehead}>
                      date
                    </th>
                    <th scope="col" className={tablehead}>
                      fileName
                    </th>
                    <th scope="col" className={tablehead}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-4 text-gray-600"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    <>
                      {currentItems.length === 0 ? (
                        <>
                          <tr>
                            <td
                              colSpan={4}
                              className="text-center py-4 text-gray-600"
                            >
                              File Not Found
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          {currentItems.map((item: TranData) => (
                            <tr key={item.doc_id}>
                              <td className={tablebody}>{item.doc_id}</td>
                              <td className={tablebody}>
                                {moment(item.doc_date).format("DD/MMM/YYYY")}
                              </td>
                              <td className={tablebody}>{item.file_name}</td>
                              <td className={tablebody}>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    className="px-2 py-2 items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-100 text-green-800 hover:bg-green-200 focus:outline-none focus:bg-green-200 disabled:opacity-50 disabled:pointer-events-none dark:text-green-400 dark:bg-green-800/30 dark:hover:bg-green-800/20 dark:focus:bg-green-800/20"
                                    onClick={() => handleEdit(item.doc_id)}
                                  >
                                    <TbEdit size={20} />
                                  </button>
                                  <button
                                    type="button"
                                    className="px-2 py-2 items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:text-red-400 dark:bg-red-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800/20"
                                    onClick={() => handleDelete(item)}
                                  >
                                    <RiDeleteBin5Line size={20} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Paginations
            currentPage={currentPage}
            itemPerPage={itemsPerPage}
            data={data}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
      {showEdit && (
        <EditTransaction
          show={showEdit}
          setShow={setshowEdit}
          fetchData={browseData}
          data={selectedTran}
        />
      )}
      {showDelete && (
        <DeleteModal
          show={showDelete}
          setShow={setshowDelete}
          fetchData={browseData}
          data={selectedTran}
        />
      )}
    </>
  );
};

export default TranView;
