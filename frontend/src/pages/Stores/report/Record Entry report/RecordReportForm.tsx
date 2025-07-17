/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import FirmMidal from "../../transaction/Entries/FirmModal";
import LocationModal from "../../transaction/Entries/LocationModal";
import SectionModal from "../../transaction/Entries/SectionModal";
import CategoryModal from "../../transaction/Entries/CategoryModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const RecordReportForm = () => {
  const [inputs, setInputs] = useState({
    from_date: "",
    to_date: "",
    year: ""
  });
  const [showFirm, setShowFirm] = useState(false);
  const [showLoc, setShowLoc] = useState(false);
  const [showSec, setShowSec] = useState(false);
  const [showCatg, setShowCatg] = useState(false);
  const { firmID, firmName, locationID, locationName, secID, secName, catgID, catgName } = useSelector((state: RootState) => state.transaction);

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = {
      from_date: inputs.from_date,
      to_date: inputs.to_date,
      firm_code: firmID,
      loc_code: locationID,
      year: inputs.year,
      sec_code: secID,
      catg_code: catgID
    }
    console.log(body);
  };

  return (
    <>
      <div className="relative items-center w-full sm:max-w-2xl my-2 mx-2 shadow-lg">
        <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-5 dark:border-gray-700 justify-center">
          <h1 className="justify-center items-center flex text-xl font-semibold">Record Printing</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-6 grid gap-4 lg:gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="from_date" className="block mb-2 dark:text-white">From Date <span className="font-bold text-red-600">*</span></label>
                  <input
                    type="date"
                    name="from_date"
                    id="from_date"
                    className="rounded-lg py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100"
                    value={inputs.from_date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="to_date" className="block mb-2 dark:text-white">
                    To Date <span className="font-bold text-red-600">*</span></label>
                  <input
                    type="date"
                    name="to_date"
                    id="to_date"
                    className="rounded-lg py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100  "
                    value={inputs.to_date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="member" className="block mb-2 dark:text-white">Firm Name <span className="text-red-600 font-bold">*</span></label>
                <div className="relative">
                  <div className="flex rounded-lg shadow-sm">
                    <input
                      type="text"
                      id="firm"
                      name="firm"
                      value={firmName}
                      className="rounded-lg py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase"
                      placeholder="Select firm name" readOnly />
                    <button type="button" className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-e-md border border-sky-400 focus:outline-none disabled:opacity-50 text-sky-500 dark:bg-gray-800"
                      onClick={() => setShowFirm(true)}>
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block mb-2 dark:text-white">Location Name <span className="text-red-600 font-bold">*</span></label>
                <div className="relative">
                  <div className="flex rounded-lg shadow-sm">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={locationName}
                      className="rounded-lg py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase"
                      placeholder="Select location name" readOnly />
                    <button type="button" className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-e-md border border-sky-400 focus:outline-none disabled:opacity-50 text-sky-500 dark:bg-gray-800"
                      onClick={() => setShowLoc(true)}>
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="year" className="block mb-2 dark:text-white">Year <span className="text-red-600 font-bold">*</span></label>
                <div className="relative">
                  <div className="flex rounded-lg shadow-sm">
                    <input
                      type="text"
                      id="year"
                      name="year"
                      className="rounded-lg py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase"
                      placeholder="(yyyy-yyyy)"
                      value={inputs.year}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="section" className="block mb-2 dark:text-white">Section Name <span className="text-red-600 font-bold">*</span></label>
                <div className="relative">
                  <div className="flex rounded-lg shadow-sm">
                    <input
                      type="text"
                      id="section"
                      name="section"
                      value={secName}
                      className="rounded-lg py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase"
                      placeholder="Select section name" readOnly />
                    <button type="button" className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-e-md border border-sky-400 focus:outline-none disabled:opacity-50 text-sky-500 dark:bg-gray-800"
                      onClick={() => setShowSec(true)}>
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block mb-2 dark:text-white">Category Name <span className="text-red-600 font-bold">*</span></label>
                <div className="relative">
                  <div className="flex rounded-lg shadow-sm">
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={catgName}
                      className="rounded-lg py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase"
                      placeholder="Select category name" readOnly />
                    <button type="button" className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-e-md border border-sky-400 focus:outline-none disabled:opacity-50 text-sky-500 dark:bg-gray-800"
                      onClick={() => setShowCatg(true)}>
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="grid sm:grid-cols-2 gap-2">
                  <label htmlFor="record_entry_register" className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400">
                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="record_entry_register" />
                    <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">Record Entry Register</span>
                  </label>

                  <label htmlFor="record_register_report" className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400">
                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="record_register_report" />
                    <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">Record Register Report</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <div>
                  <button type="submit" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-hidden focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
                  >Submit</button>
                </div>
                <div>
                  <button
                    type="button"
                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:outline-hidden focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div >
      </div >
      <FirmMidal show={showFirm} setShow={setShowFirm} />
      <LocationModal show={showLoc} setShow={setShowLoc} />
      <SectionModal show={showSec} setShow={setShowSec} />
      <CategoryModal show={showCatg} setShow={setShowCatg} />
    </>
  )
}

export default RecordReportForm