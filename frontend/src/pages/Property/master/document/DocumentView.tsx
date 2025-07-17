/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoAddCircleOutline } from "react-icons/io5"
import { tablebody, tablehead } from "../../../../constant/BaseUrl"
import Paginations from "../../../../helper/Pagination"
import { useEffect, useState } from "react"
import { TbEdit } from "react-icons/tb"
import { getAllDocument } from "../../../../services/Property/master/PmasterApis"
import DocumentCreate from "./DocumentCreate"
import DocumentEdit from "./DocumentEdit"


const DocumentView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await getAllDocument();
      setData(response);
    } catch (error) {
      console.log("Error while fetching data", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleSearch = (e: string) => {
    setSearchTerm(e);
    setCurrentPage(1)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSelect = (item: any) => {
    setSelectedDocument(item);
    setShowEditModal(true);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data?.filter((item: any) =>
    (item?.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="h-screen w-full m-3 border p-2 rounded-lg" >
      <h1 className="flex justify-center items-center text-2xl font-semibold">Document Details</h1>
      <div className="sticky right-0">
        <div className="max-w-sm space-y-3">
          <input
            type="text"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100"
            placeholder="Type your search query here"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="m-2 flex justify-between">
          <div className="flex flex-row items-center">
            <div>Select</div>
            <div className="m-1">
              <select
                className="py-3 pe-4 block bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" onChange={(e: any) => setItemsPerPage(e.target.value)}>
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
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => setShowCreateModal(true)}
            >
              <IoAddCircleOutline size={18} />
              Add Document
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <div className="border border-gray-300 rounded-md">
          <div className="overflow-y-auto overflow-x-auto max-h-[30rem]">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                <tr>
                  <th scope="col" className={tablehead}>
                    Code
                  </th>
                  <th scope="col" className={tablehead}>
                    Name
                  </th>
                  <th scope="col" className={tablehead}>
                    Status
                  </th>
                  <th scope="col" className={tablehead}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (<>
                  <tr>
                    <td colSpan={13} className="text-center py-4">Loading...</td>
                  </tr>
                </>) : (<>
                  {currentItems?.map((item: any) => (
                    <tr key={item.id} className="uppercase">
                      <td className={tablebody}>
                        {item.id}
                      </td>
                      <td className={tablebody}>
                        {item.name}
                      </td>
                      <td className={tablebody}>
                        <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium 
                                              ${item.status === 'A'
                            ? 'bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500'
                            : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500'} `}>
                          {item.status}
                        </span>
                      </td>
                      <td className={tablebody}>
                        <button
                          type="button"
                          className="py-3 px-3 items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20"
                          onClick={() => handleSelect(item)}
                        >
                          <TbEdit size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {currentItems?.length === 0 && (
                    <tr>
                      <td colSpan={13} className="text-center py-4">No Item Found</td>
                    </tr>
                  )}
                </>)}
              </tbody>
            </table>
          </div>
        </div>
        <Paginations currentPage={currentPage} itemPerPage={itemsPerPage} data={data} handlePageChange={handlePageChange} />
      </div>
      <div>
      </div>
      {showCreateModal && <DocumentCreate show={showCreateModal} setShow={setShowCreateModal} fetchData={fetchData} />}
      {showEditModal && <DocumentEdit show={showEditModal} setShow={setShowEditModal} fetchData={fetchData} selectedDocument={selectedDocument} />}
    </div>
  )
}

export default DocumentView