/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { editPLocation } from "../../../../services/Property/master/PmasterApis"

interface props {
  show: boolean
  setShow: (show: boolean) => void
  fetchData: () => void
  selectedLocation: any
}
const PLocationEdit: FC<props> = ({ show, setShow, fetchData, selectedLocation }) => {
  const [input, setInput] = useState({
    id: 0,
    name: "",
    status: ""
  })

  useEffect(() => {
    if (selectedLocation) {
      setInput({
        id: selectedLocation.id || 0,
        name: selectedLocation.name || "",
        status: selectedLocation.status || "",
      });
    }
  }, [selectedLocation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      id: input.id,
      name: input.name,
      status: input.status
    }
    try {
      await editPLocation(body)
      setInput({
        id: 0,
        name: "",
        status: ""
      })
    } catch (error) {
      console.error("Error updating form:", error);
    } finally {
      setShow(false);
      fetchData();
    }

  }

  return (
    <div
      id="Location-edit-modal"
      className={`fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden bg-gray-500 bg-opacity-50 ${show ? "" : "hidden"}`}
      role="dialog"
      aria-labelledby="Location-edit-modal-label"
    >
      <div className="flex justify-center items-center min-h-screen m-2">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
            <h3 id="Location-edit-modal-label" className="font-bold text-gray-800 dark:text-white">
              Edit Location
            </h3>
            <button
              type="button"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              onClick={() => setShow(false)}
            >
              <IoMdClose color="black" />
            </button>
          </div>

          <form onSubmit={handleSubmit} >
            <div className="mx-3 my-2">
              <label htmlFor="LocationName">
                Location Name: <span className="text-red-600 text-xl">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="mt-2 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 bg-slate-100 uppercase"
                placeholder="Enter Location..."
                value={input.name}
                onChange={handleChange}
              />
            </div>

            <div className="mx-3 my-2">
              <label htmlFor="status">
                Status: <span className="text-red-600 text-xl">*</span>
              </label>
              <select
                name="status"
                className="mt-2 py-3 px-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                value={input.status}
                onChange={handleChange}
              >
                <option value="">Select status</option>
                <option value="A" className="uppercase">Active</option>
                <option value="I" className="uppercase">In-active</option>
              </select>
            </div>

            <div className="flex justify-center gap-4 items-center py-3 px-4 border-t dark:border-gray-700">
              <button
                type="submit"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-hidden focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Submit
              </button>
              <button
                type="button"
                className="py-3 px-4 inline-flex text-sm bg-gray-200 font-medium text-gray-900 dark:bg-gray-700 dark:text-white rounded-lg"
                onClick={() => setShow(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PLocationEdit