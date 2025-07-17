/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { tablebody, tablehead } from "../../../../constant/BaseUrl";
import { getEntryStatus } from "../../../../services/Stores/report/reportApis";


const EntryForm = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formattedDate = `${day}/${month}/${year} @ ${hours}:${minutes}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getEntryStatus();
        if (response) {
          setData(response);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const currentItems = data?.filter((item: any) =>
    item?.firm_name?.toLowerCase?.().includes(searchTerm.toLowerCase())
  );

  const generateCSV = () => {
    const header = [
      "Sr. No.",
      "Name",
      "Count",

    ];

    // Convert table data to CSV rows
    const rows = data.map((item: any, index: number) => [
      index + 1,
      item?.firm_name,
      item?.record_count,
    ]);

    // Combine header and rows
    const csvContent = [
      header.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Trigger the download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "property_register.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen w-full m-3 border p-2 rounded-lg" >
      <div className="flex justify-between items-center my-2">
        <div>
          <p>Record Entry Status</p>
        </div>
        <div >
          <p className="text-sm">Report on: {formattedDate}</p>

        </div>
      </div>
      <div className="sticky right-0">
        <div className="max-w-sm space-y-3 my-2">
          <input
            type="text"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100"
            placeholder="Type your search query here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <div className="border border-gray-300 rounded-md">
          <div className="overflow-y-auto overflow-x-auto max-h-[30rem]">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 p-2">
              <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                <tr>
                  <th scope="col" className={tablehead}>
                    Name
                  </th>
                  <th scope="col" className={tablehead}>
                    Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-600">Loading...</td>
                  </tr>
                ) : (
                  <>
                    {currentItems.length === 0 ?
                      (<>
                        <tr>
                          <td colSpan={4} className="text-center py-4 text-gray-600">File Not Found</td>
                        </tr>
                      </>) :
                      (<>
                        {currentItems.map((item: any) => (
                          <tr key={item.firm_code} className={item.firm_name === 'Total' ? 'text-lg font-bold' : ''}>
                            <td className={tablebody}>{item.firm_name}</td>
                            <td className={tablebody}>{item.record_count}</td>
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
      </div>
      <div>
      </div>
      <div className="flex justify-end my-2 mx-2">
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 focus:outline-hidden disabled:opacity-50 sabled:pointer-events-none"
          onClick={generateCSV}
        >
          Download CSV
        </button>

      </div>
    </div>
  )
}

export default EntryForm;