import { FormEvent, useState } from "react";
import { tablehead } from "../../../../constant/BaseUrl";
import { yearWiseReports } from "../../../../services/Stores/report/reportApis";
import { useRef } from "react";


interface FirmReportEntry {
  doc_code: string;
  date: string;
  desc: string;
  firm_name: string;
  branch_name: string;
  year: string;
  cub_code: string;
  s_code: string;
  remark: string;
  firm_code: string;
  branch_code: string;
}

const YearWiseReport = () => {
  const [data, setData] = useState<FirmReportEntry[]>([]);
  const [year, setYear] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await yearWiseReports({ year });
      if (response) {
        setData(response);
        setShowTable(true);
        setYear("");
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCSVDownload = () => {
    if (data.length === 0) return;

    const headers = [
      "Doc No.",
      "Inward Date",
      "Particular",
      "Firm Name",
      "Branch Name",
      "Year",
      "Cupboard No.",
      "Slot No.",
      "Remark"
    ];

    const rows = data.map(row => [
      row.doc_code,
      new Date(row.date).toLocaleDateString(),
      row.desc,
      row.firm_name,
      row.branch_name,
      row.year,
      row.cub_code,
      row.s_code,
      row.remark
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "firm_yearwise_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const newWindow = window.open("", "", "width=1000,height=700");
    if (!newWindow) return;

    newWindow.document.write(`
    <html>
      <head>
      <title>Year wise Report</title>
       <style>
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 6px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          body {
            font-family: sans-serif;
            padding: 20px;
          }
          h2 {
            text-align: center;
          }
        </style>
      </head>
      <body>
       
        ${printContent.innerHTML}
      </body>
    </html>
  `);

    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  const handleCancel = () => {
    setShowTable(false)
    setData([])
  }

  return (
    <div className="w-full sm:max-w-6xl mx-auto my-4 p-4 border rounded-xl dark:border-gray-700 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-semibold text-center mb-6">Year Wise Report</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-white">
              Year <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={showTable}
              placeholder="Enter Year..."
              className="rounded-lg py-3 px-4 block w-full mt-1 border-gray-200 text-sm border focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 bg-slate-100 uppercase focus:outline-none disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            disabled={showTable}
            className="inline-flex items-center px-6 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400"
          >
            {loading ? "Loading..." : "Browse Report"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center px-6 py-2 text-sm font-medium rounded-md bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Table */}
      {showTable && (
        <div className="mt-6">
          <div ref={printRef} className="overflow-x-auto border dark:border-gray-700 rounded-md">
            <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                <tr>
                  <th className={tablehead}>Doc No.</th>
                  <th className={tablehead}>Inward Date</th>
                  <th className={tablehead}>Particular</th>
                  <th className={tablehead}>Firm Name</th>
                  <th className={tablehead}>Branch Name</th>
                  <th className={tablehead}>Year</th>
                  <th className={tablehead}>C.No.</th>
                  <th className={tablehead}>Slot No.</th>
                  <th className={tablehead}>Desc</th>
                  <th className={tablehead}>Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4">Loading...</td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{row.doc_code}</td>
                      <td className="px-4 py-2">{new Date(row.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{""}</td>
                      <td className="px-4 py-2">{row.firm_name}</td>
                      <td className="px-4 py-2">{row.branch_name}</td>
                      <td className="px-4 py-2">{row.year}</td>
                      <td className="px-4 py-2">{row.cub_code}</td>
                      <td className="px-4 py-2">{row.s_code}</td>
                      <td className="px-4 py-2">{row.desc}</td>
                      <td className="px-4 py-2">{row.remark}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-4 text-gray-500">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Export Section */}
          <div className="flex justify-end mt-4 gap-4">
            <button
              type="button"
              onClick={handleCSVDownload}
              className="py-2 px-4 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Download CSV
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="py-2 px-4 text-sm font-medium rounded-lg bg-gray-600 text-white hover:bg-gray-700"
            >
              Print Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearWiseReport;
