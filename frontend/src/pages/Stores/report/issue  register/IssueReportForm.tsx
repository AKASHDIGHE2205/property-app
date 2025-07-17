
const IssueReportForm = () => {
  return (
    <>
      <div className="relative items-center w-full sm:max-w-2xl my-2 mx-2 shadow-lg">
        <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-5 dark:border-gray-700 justify-center">
          <h1 className="justify-center items-center flex text-xl font-semibold">Issue Register</h1>
          <form >
            <div className="mt-6 grid gap-4 lg:gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="from_date" className="block mb-2 dark:text-white">From Date <span className="font-bold text-red-600">*</span></label>
                  <input
                    type="date"
                    name="from_date"
                    id="from_date"
                    className="rounded-lg py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100"
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
                  />
                </div>
              </div>

              <div hidden>
                <div className="grid sm:grid-cols-2 gap-2">
                  <label htmlFor="issue_date" className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400">
                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="issue_date" />
                    <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">Issue Date</span>
                  </label>

                  <label htmlFor="return_date" className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400">
                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="return_date" />
                    <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">Return Date</span>
                  </label>
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
                      className="rounded-lg py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase"
                      placeholder="Select firm name" readOnly />
                    <button type="button" className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-e-md border border-sky-400 focus:outline-none disabled:opacity-50 text-sky-500 dark:bg-gray-800"
                    >
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
                      className="rounded-lg py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase"
                      placeholder="Select location name" readOnly />
                    <button type="button" className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-e-md border border-sky-400 focus:outline-none disabled:opacity-50 text-sky-500 dark:bg-gray-800"
                    >
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
                      placeholder="(yyyy-yyyy)" />
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
                      className="rounded-lg py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase"
                      placeholder="Select section name" readOnly />
                    <button type="button" className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-e-md border border-sky-400 focus:outline-none disabled:opacity-50 text-sky-500 dark:bg-gray-800"
                    >
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
                      className="rounded-lg py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase"
                      placeholder="Select category name" readOnly />
                    <button type="button" className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-e-md border border-sky-400 focus:outline-none disabled:opacity-50 text-sky-500 dark:bg-gray-800"
                    >
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="status">Status <span className="text-red-600 font-bold">*</span></label>
                <div className="grid sm:grid-cols-3 gap-2 mt-2">
                  <label htmlFor="all" className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400">
                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="all" />
                    <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">All</span>
                  </label>

                  <label htmlFor="issue" className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400">
                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="issue" />
                    <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">issue</span>
                  </label>

                  <label htmlFor="pending" className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400">
                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="pending" />
                    <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">Pending </span>
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
    </>
  )
}

export default IssueReportForm