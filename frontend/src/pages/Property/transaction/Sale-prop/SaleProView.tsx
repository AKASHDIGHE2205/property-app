/* eslint-disable @typescript-eslint/no-explicit-any */
import { TbEdit } from "react-icons/tb";
import { IoAddCircleOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllSaledProp } from "../../../../services/Property/transaction/pTranApis";
import moment from "moment";
import Paginations from "../../../../helper/Pagination";
import EditSaleProp from "./EditSaleProp";
import { FiFilter, FiSearch, FiCalendar, FiRefreshCw } from "react-icons/fi";

interface Data {
  sale_id: number;
  buyer_name: string;
  doc_id: number;
  doc_date: string;
  sale_date: string;
  file_name: string;
  sale_area: string;
  sur_no: string;
  remark: string;
  sale_value: string;
}

const SaleProView = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState<string>(() =>
    moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState<string>(() => moment().format("YYYY-MM-DD"));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProp, setSelectedProp] = useState({});
  const [showEdit, setShowEdit] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const body = {
        from_date: fromDate,
        to_date: toDate,
      }
      const response = await getAllSaledProp(body);
      if (response) {
        setData(response);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filtredData = data?.filter((item: Data) =>
    item?.buyer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.sur_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.sale_date.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  const handleEdit = (item: any) => {
    setSelectedProp(item);
    setShowEdit(true);
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header Section */}
        <div className=" p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Saled Property Details
          </h1>
        </div>
        {/* Action Buttons */}
        <div className="flex sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 gap-4">
          {/* Filter Toggle */}
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FiFilter className="text-blue-600 dark:text-blue-400" />
            {showFilter ? "Hide Filter" : "Show Filter"}
          </button>

          {/* Add Entry Button */}
          <Link
            to="/property/sale-entry"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <IoAddCircleOutline size={18} />
            Add Entry
          </Link>
        </div>

        {/* Filter Section */}
        {showFilter && (
          <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 ">
              {/* Search Input */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search properties..."
                    className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition bg-white"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  From Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    defaultValue={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  To Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    defaultValue={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition bg-white"
                  />
                </div>
              </div>

              {/* Rows Selector */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rows per page
                </label>
                <select
                  className="block w-full px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition bg-white"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  {[5, 10, 25, 50, 100].map((n) => (
                    <option key={n} value={n}>
                      Show {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end">
              <button
                onClick={fetchData}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <FiRefreshCw />
                Refresh Data
              </button>
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="p-4 md:p-6">
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Sr. No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Sale Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    File Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Buyer Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Sale Area
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Survey No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Loading sale properties...</span>
                      </div>
                    </td>
                  </tr>
                ) : filtredData.length > 0 ? (
                  filtredData.map((item: Data, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                        {item.sale_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {moment(item.sale_date).format("DD MMM YYYY")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {item.file_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                        {item.buyer_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                        {item.sale_area}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                        {item.sur_no}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                          >
                            <TbEdit className="mr-1" />
                            Edit
                          </button>
                          <button
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition hidden"
                          >
                            <IoEyeOutline className="mr-1" />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-2 text-center">
                      <div className="flex flex-col items-center justify-center py-6">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">No sale properties found</p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm">Try adjusting your filters or add a new entry</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6">
            <Paginations
              currentPage={currentPage}
              itemPerPage={itemsPerPage}
              data={data}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEdit && (<EditSaleProp show={showEdit} setShow={setShowEdit} fetchData={fetchData} data={selectedProp} />)}
    </div>
  )
}

export default SaleProView;