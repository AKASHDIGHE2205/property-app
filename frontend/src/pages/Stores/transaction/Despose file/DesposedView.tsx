/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { tablebody, tablehead } from "../../../../constant/BaseUrl";
import { useEffect, useState } from "react";
import moment from "moment";
import Paginations from "../../../../helper/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

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
  branch_code: number;
  branch_name: string;
}

const DesposedView = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { depositedata } = useSelector((state: RootState) => state.transaction);

  useEffect(() => {
    setData(depositedata)
  }, [depositedata]);

  const handleSearch = (e: any) => {
    setSearchTerm(e);
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
    (item?.type_name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (item?.loc_name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (item?.sec_name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (item?.remark?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (item?.desc?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (item?.date?.toString().toLowerCase() ?? "").includes(searchTerm.toString().toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPage = (item: any) => {
    setItemsPerPage(item);
    setCurrentPage(1);
  }

  const generateCSV = () => {
    const header = [
      "Sr. No.",
      "Doc No",
      "Doc Date",
      "File Type",
      "Year",
      "Firm Name",
      "Branch Name",
      "Location Name",
      "Section Name",
      "Description",
      "Remark",
      "Rack No.",
      "Slot No.",
      "Sub Slot No."
    ];

    // Escape CSV values safely
    const escapeCSVValue = (value: string | number | null | undefined): string => {
      if (value === null || value === undefined) return '""';
      const str = value.toString();
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = data?.map((item: Entry, index: number) => [
      escapeCSVValue(index + 1),
      escapeCSVValue(item?.entry_code),
      escapeCSVValue(moment(item?.date).format("DD/MM/YYYY")),
      escapeCSVValue(item?.type_name),
      escapeCSVValue(item?.year),
      escapeCSVValue(item?.firm_name),
      escapeCSVValue(item?.branch_name),
      escapeCSVValue(item?.loc_name),
      escapeCSVValue(item?.sec_name),
      escapeCSVValue(item?.desc),
      escapeCSVValue(item?.remark),
      escapeCSVValue(item?.cub_code),
      escapeCSVValue(item?.s_code),
      escapeCSVValue(item?.su_code)
    ]);

    const csvContent = [
      header.map(escapeCSVValue).join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "file_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen w-full border dark:border-gray-500 p-2 rounded-lg">
      <h1 className="flex justify-center items-center text-2xl font-semibold ">Desposed Files</h1>
      <div className="sticky right-0">
        <div className="max-w-sm space-y-3">
          <input
            type="text"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100"
            placeholder="Type your search query here"
            defaultValue={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="m-2 flex justify-between">
          <div className="flex flex-row items-center">
            <div>Select</div>
            <div className="m-1">
              <select
                className="py-3 pe-4 block bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                onChange={(e: any) => handleItemsPerPage(e.target.value)}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div>rows</div>
          </div>
          <div className="flex flex-row items-center">
            <Link
              to={"/transaction/despose"}
              className="py-3 px-4 items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 focus:outline-hidden focus:bg-gray-700 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none ">
              Go Back
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <div className="border dark:border-gray-700  rounded-md p-2">
          <div className="overflow-y-auto overflow-x-auto max-h-[30rem]">
            <table className="min justify-between">
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
                  <th scope="col" className={tablehead} >Remark</th>
                  <th scope="col" className={tablehead}>Rack No.</th>
                  <th scope="col" className={tablehead}>Slot No.</th>
                  <th scope="col" className={tablehead}>Sub Slot No.</th>
                  <th scope="col" className={tablehead} hidden>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700  ">
                {(<>
                  {currentItems?.map((item: Entry) => (
                    <tr key={item?.doc_code} className="hover:bg-gray-100 dark:hover:bg-gray-800 text-sm uppercase">
                      <td className={`${tablebody} py-4`} hidden>{item?.doc_code}</td>
                      <td className={`${tablebody} py-4`}>{item?.entry_code}</td>
                      <td className={`${tablebody} py-4`}>{moment(item?.date).format("DD/MM/YYYY")}</td>
                      <td className={`${tablebody} py-4`}>{item?.type_name}</td>
                      <td className={`${tablebody} py-4`}>{item?.year}</td>
                      <td className={`${tablebody} py-4`}>{item?.firm_name}</td>
                      <td className={`${tablebody} py-4`}>{item?.branch_name}</td>
                      <td className={`${tablebody} py-4`}>{item?.loc_name}</td>
                      <td className={`${tablebody} py-4`}>{item?.sec_name}</td>
                      <td className={`${tablebody} overflow-x-auto max-w-[180px] whitespace-nowrap custom-scrollbar text-xs`} >{item?.desc}</td>
                      <td className={`${tablebody} overflow-x-auto max-w-[180px] whitespace-nowrap custom-scrollbar text-xs`} >{item?.remark}</td>
                      <td className={`${tablebody} py-4`}>{item?.cub_code}</td>
                      <td className={`${tablebody} py-4`}>{item?.s_code}</td>
                      <td className={`${tablebody} py-4`}>{item?.su_code}</td>
                      <td className={`${tablebody} py-4`}>
                        <button type="button" className="hidden py-3 px-3 items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20"
                        >edit
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
          <div className="flex justify-end my-2 mx-2">
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
              onClick={generateCSV}
            >
              Dowload CSV
            </button>
          </div>
        </div>
        <Paginations currentPage={currentPage} itemPerPage={itemsPerPage} data={data} handlePageChange={handlePageChange} />
      </div>
      <div>
      </div>
    </div>
  )
}

export default DesposedView