/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoAddCircleOutline } from "react-icons/io5"
import Paginations from "../../../../helper/Pagination"
import { useEffect, useState } from "react"
import { TbEdit } from "react-icons/tb"
import PLocationCreate from "./PLocationCreate"
import PLocationEdit from "./PLocationEdit"
import { getAllPLocation } from "../../../../services/Property/master/PmasterApis"
import { FiSearch, FiMapPin } from "react-icons/fi"


const PLocationView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await getAllPLocation();
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
    setSelectedLocation(item);
    setShowEditModal(true);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data?.filter((item: any) =>
    (item?.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header Section */}
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Property Location Details
          </h1>
        </div>

        {/* Action Bar */}
        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Search Input */}
          <div className="w-full sm:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition bg-white"
                placeholder="Search locations..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Rows Selector and Add Button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Show</span>
              <select
                className="py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition bg-white"
                onChange={(e: any) => setItemsPerPage(e.target.value)}
                value={itemsPerPage}
              >
                {[5, 10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className="text-sm text-gray-700 dark:text-gray-300">rows</span>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              onClick={() => setShowCreateModal(true)}
            >
              <IoAddCircleOutline size={18} />
              Add Location
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-4 md:p-6">
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Code
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Loading locations...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentItems?.length > 0 ? (
                  currentItems.map((item: any) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200 uppercase">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 uppercase">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${item.status === 'A'
                            ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                          {item.status === 'A' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                          onClick={() => handleSelect(item)}
                        >
                          <TbEdit className="mr-1" />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <FiMapPin className="text-gray-400 text-4xl mb-2" />
                        <p className="text-gray-600 dark:text-gray-400 text-lg">No locations found</p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm">Try adjusting your search or add a new location</p>
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

      {/* Modals */}
      {showCreateModal && (
        <PLocationCreate
          show={showCreateModal}
          setShow={setShowCreateModal}
          fetchData={fetchData}
        />
      )}
      {showEditModal && (
        <PLocationEdit
          show={showEditModal}
          setShow={setShowEditModal}
          fetchData={fetchData}
          selectedLocation={selectedLocation}
        />
      )}
    </div>
  )
}

export default PLocationView