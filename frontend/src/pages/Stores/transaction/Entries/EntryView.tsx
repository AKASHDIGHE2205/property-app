/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { getAllTranEntries } from "../../../../services/Stores/transaction/transactionApi";
import { Link } from "react-router-dom";
import moment from "moment";
import Paginations from "../../../../helper/Pagination";
import EditEntry from "./EditEntry";
import { tablebody, tablehead } from "../../../../constant/BaseUrl";

interface Entry {
  doc_code: string;
  entry_code: string;
  date: string;
  type_name: string;
  year: number;
  firm_name: string;
  loc_name: string;
  sec_name: string;
  desc: string;
  remark: string;
  cub_code: string;
  s_code: string;
  su_code: string;
  type_code: number;
  firm_code: number;
  loc_code: number;
  sec_code: number;
  branch_name: string,
  branch_code: number
}

const EntryView = () => {
  const [from, setFrom] = useState<string>(() => moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"));
  const [to, setTo] = useState<string>(() => moment().format("YYYY-MM-DD"));
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editShow, setEditShow] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState([]);
  const [showFilter, setShowFilter] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const body = {
        from_Date: from,
        to_Date: to
      }
      const response = await getAllTranEntries(body);
      if (response) {
        setData(response);
      }
    } catch (error) {
      console.log("Error to Fetching Data", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const browseData = async () => {
    setLoading(true);
    try {
      const body = {
        from_Date: from,
        to_Date: to
      }
      const response = await getAllTranEntries(body);
      if (response) {
        setData(response);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data?.filter((item: Entry) =>
    (item?.entry_code?.toString().toLowerCase() ?? "").includes(searchTerm.toString().toLowerCase()) ||
    (item?.firm_name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (item?.branch_name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (item?.type_name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (item?.loc_name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (item?.sec_name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (item?.remark?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (item?.desc?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (item?.date?.toString().toLowerCase() ?? "").includes(searchTerm.toString().toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (item: any) => {
    setSelectedEntry(item);
    setEditShow(true);
  }

  const handleItemsPerPage = (item: any) => {
    setItemsPerPage(item);
    setCurrentPage(1);
  }

  return (
    <div className="min-h-screen w-full border dark:border-gray-500 p-2 rounded-lg">
      <h1 className="flex justify-center items-center text-2xl font-semibold ">Entry Details</h1>
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
            to={"/transaction/entries"}
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
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Select
              </span>
              <select
                className="w-[69px] px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                value={itemsPerPage}
              >
                {[5, 10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700 dark:text-gray-300">Rows</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow overflow-auto">
        <div className="border dark:border-gray-700  rounded-md p-2">
          <div className="overflow-y-auto overflow-x-auto max-h-[30rem]">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
              <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                <tr>
                  <th scope="col" className={tablehead}>Doc No.</th>
                  <th scope="col" className={tablehead}>Doc Date</th>
                  <th scope="col" className={tablehead}>File Type</th>
                  <th scope="col" className={tablehead}>Year</th>
                  <th scope="col" className={tablehead}>Firm Name</th>
                  <th scope="col" className={tablehead}>Branch Name</th>
                  <th scope="col" className={tablehead}>Location Name</th>
                  <th scope="col" className={tablehead}>Section Name</th>
                  <th scope="col" className={tablehead} >Description</th>
                  <th scope="col" className={tablehead} hidden>Remark</th>
                  <th scope="col" className={tablehead}>Rack No.</th>
                  <th scope="col" className={tablehead}>Slot No.</th>
                  <th scope="col" className={tablehead}>Sub Slot No.</th>
                  <th scope="col" className={tablehead}>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700  ">
                {loading ?
                  (<tr>
                    <td colSpan={13} className="text-center py-4">Loading...</td>
                  </tr>)
                  : (<>
                    {currentItems?.map((item: Entry) => (
                      <tr key={item.doc_code} className="hover:bg-gray-100 dark:hover:bg-gray-800 text-sm uppercase">
                        <td className={tablebody} hidden>{item.entry_code}</td>
                        <td className={tablebody} >{item.doc_code}</td>
                        <td className={tablebody}>{moment(item.date).format("DD/MM/YYYY")}</td>
                        <td className={tablebody}>{item.type_name}</td>
                        <td className={tablebody}>{item.year}</td>
                        <td className={`${tablebody} overflow-x-auto max-w-[180px] whitespace-nowrap custom-scrollbar`}>{item.firm_name}</td>
                        <td className={`${tablebody} overflow-x-auto max-w-[180px] whitespace-nowrap custom-scrollbar`}>{item.branch_name}</td>
                        <td className={`${tablebody} overflow-x-auto max-w-[180px] whitespace-nowrap custom-scrollbar`}>{item.loc_name}</td>
                        <td className={`${tablebody} overflow-x-auto max-w-[180px] whitespace-nowrap custom-scrollbar`}>{item.sec_name}</td>
                        <td className={`${tablebody} overflow-x-auto max-w-[180px] whitespace-nowrap custom-scrollbar`} >{item.desc}</td>
                        <td className={`${tablebody} overflow-x-auto max-w-[180px] whitespace-nowrap custom-scrollbar hidden`} >{item.remark}</td>
                        <td className={tablebody}>{item.cub_code}</td>
                        <td className={tablebody}>{item.s_code}</td>
                        <td className={tablebody}>{item.su_code}</td>
                        <td className={tablebody}>
                          <button type="button" className="py-3 px-3 items-center gap-x-2 font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20"
                            onClick={() => handleEdit(item)}>
                            <TbEdit size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {currentItems?.length === 0 && (
                      <tr>
                        <td colSpan={13} className="text-center py-4">{currentItems?.length === 0 ? "No items found" : null}</td>
                      </tr>
                    )}
                  </>)}
              </tbody>
            </table>
          </div>
        </div>
        <Paginations currentPage={currentPage} itemPerPage={itemsPerPage} data={data} handlePageChange={handlePageChange} />
        {editShow && (<EditEntry show={editShow} setShow={setEditShow} data={selectedEntry} fetchData={fetchData} />)}
      </div>
      <div>
      </div>
    </div>
  )
}

export default EntryView;

{/**
        <div className="sticky right-0 hidden">
        <div className="max-w-sm space-y-3">
          <input
            type="text"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100"
            placeholder="Type your search query here"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="m-2 flex justify-between">
          <div className="flex flex-row items-center">
            <div>Select</div>
            <div className="m-1">
              <select
                className="py-3 pe-4 block bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                onChange={(e: any) => handleItemsPerPage(e.target.value)} >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div>rows</div>
          </div>
          <div>
            <Link
              to={"/transaction/entries"}
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
              <IoAddCircleOutline size={18} />
              Add Entry
            </Link>
          </div>
        </div>
      </div>
*/}