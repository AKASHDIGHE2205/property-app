import { FaBuildingCircleArrowRight, FaCodeBranch } from "react-icons/fa6";
import { VscFileSubmodule } from "react-icons/vsc";
import { BiSolidReport } from "react-icons/bi";
import { FaFileAlt } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdLeaderboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import Logo from '../assets/malpani3.png';
import { HiOfficeBuilding, HiLocationMarker, HiClipboardList, HiTag } from "react-icons/hi";
import { RiBuilding2Fill } from "react-icons/ri";
import { TbCalculator, TbFileSymlink } from "react-icons/tb";
import { useEffect } from "react";
import { BsBuildings, BsCalendar2Week } from "react-icons/bs";
import { LuFileText, LuInbox, LuMapPinCheck, LuMapPinned, LuSend } from "react-icons/lu";
import { IoAddCircleOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

const Sidebar = () => {
  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, []);

  return (
    <>
      {/* Sidebar */}
      <div
        id="hs-application-sidebar"
        className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform
                   w-[280px] h-full hidden fixed inset-y-0 start-0 z-[60] bg-gradient-to-b from-gray-50 to-gray-100 border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          {/* Logo Section */}
          <div className="px-6 pt-6 pb-4 bg-white/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <Link
              to="/"
              className="flex-none text-black rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80 hover:opacity-90 transition-opacity"
            >
              <div className="flex items-center space-x-2">
                <img src={Logo} alt="logo" className="w-10 h-10" />
                <span className="text-xl font-bold text-[#e20f0f] dark:text-white flex flex-col">
                  Malpani<br />Group
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Content */}
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-700 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500">
            <nav className="hs-accordion-group px-4 py-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
              <ul className="flex flex-col space-y-2">
                {/* 🏠 Home */}
                <li>
                  <Link
                    className="flex items-center gap-x-3 py-2.5 px-4 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition-colors"
                    to="/"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>Home</span>
                  </Link>
                </li>

                {/* Store - Main Accordion */}
                <li className="hs-accordion" id="store-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2.5 px-4 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition-colors"
                    aria-expanded="true"
                    aria-controls="store-accordion-child"
                  >
                    <VscFileSubmodule className="w-5 h-5" />
                    <span>Store</span>
                    <svg
                      className="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 dark:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    <svg
                      className="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 dark:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div
                    id="store-accordion-child"
                    className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                    role="region"
                    aria-labelledby="store-accordion"
                  >
                    <ul className="pt-2 ps-2 space-y-1">
                      {/* 🔐 Master Accordion */}
                      <li className="hs-accordion" id="store-master-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-4 text-sm text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:focus:bg-gray-700/50 transition-colors"
                          aria-expanded="true"
                          aria-controls="store-master-accordion-child"
                        >
                          <MdLeaderboard className="w-4 h-4" />
                          <span>Master</span>
                          <svg
                            className="hs-accordion-active:block ms-auto hidden w-3 h-3 text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:hidden ms-auto block w-3 h-3 text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        <div
                          id="store-master-accordion-child"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="store-master-accordion"
                        >
                          <ul className="pt-1 ps-6 space-y-1">
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/master/campany"
                              >
                                <HiOfficeBuilding className="w-3.5 h-3.5" />
                                Company
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/master/location"
                              >
                                <HiLocationMarker className="w-3.5 h-3.5" />
                                Location
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/master/section"
                              >
                                <HiClipboardList className="w-3.5 h-3.5" />
                                Section
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/master/category"
                              >
                                <HiTag className="w-3.5 h-3.5" />
                                Category
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/master/branch"
                              >
                                <FaBuildingCircleArrowRight className="w-3.5 h-3.5" />
                                Branch
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* 🔄 Store Transaction Accordion */}
                      <li className="hs-accordion" id="store-transaction-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-4 text-sm text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:focus:bg-gray-700/50 transition-colors"
                          aria-expanded="true"
                          aria-controls="store-transaction-accordion-child"
                        >
                          <GrTransaction className="w-4 h-4" />
                          <span>Transactions</span>
                          <svg
                            className="hs-accordion-active:block ms-auto hidden w-3 h-3 text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:hidden ms-auto block w-3 h-3 text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        <div
                          id="store-transaction-accordion-child"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="store-transaction-accordion"
                        >
                          <ul className="pt-1 ps-6 space-y-1">
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/transaction/view"
                              >
                                <TbFileSymlink className="w-3.5 h-3.5" />
                                Record Entries
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/transaction/despose"
                              >
                                <FaFileAlt className="w-3.5 h-3.5" />
                                Disposed Files
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* 🔄 Store Report Accordion */}
                      <li className="hs-accordion" id="store-report-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-4 text-sm text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:focus:bg-gray-700/50 transition-colors"
                          aria-expanded="true"
                          aria-controls="store-report-accordion-child"
                        >
                          <BiSolidReport className="w-4 h-4" />
                          <span>Report</span>
                          <svg
                            className="hs-accordion-active:block ms-auto hidden w-3 h-3 text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:hidden ms-auto block w-3 h-3 text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        <div
                          id="store-report-accordion-child"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="store-report-accordion"
                        >
                          <ul className="pt-1 ps-6 space-y-1">
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/report/branch-report"
                              >
                                <FaCodeBranch className="w-3.5 h-3.5" />
                                Branch Wise Report
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/report/firm-report"
                              >
                                <RiBuilding2Fill className="w-3.5 h-3.5" />
                                Firm Wise Report
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="report/yearly-report"
                              >
                                <SlCalender className="w-3.5 h-3.5" />
                                Year Wise Report
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/report/entry-status-report"
                              >
                                <TbCalculator className="w-3.5 h-3.5" />
                                Entry Status Report
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Property - Main Accordion */}
                <li className="hs-accordion" id="property-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2.5 px-4 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition-colors"
                    aria-expanded="true"
                    aria-controls="property-accordion-child"
                  >
                    <BsBuildings className="w-5 h-5" />
                    <span>Property</span>
                    <svg
                      className="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 dark:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    <svg
                      className="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 dark:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div
                    id="property-accordion-child"
                    className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                    role="region"
                    aria-labelledby="property-accordion"
                  >
                    <ul className="pt-2 ps-2 space-y-1">
                      {/* 🔐 Property Master Accordion */}
                      <li className="hs-accordion" id="property-master-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-4 text-sm text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:focus:bg-gray-700/50 transition-colors"
                          aria-expanded="true"
                          aria-controls="property-master-accordion-child"
                        >
                          <MdLeaderboard className="w-4 h-4" />
                          <span>Master</span>
                          <svg
                            className="hs-accordion-active:block ms-auto hidden w-3 h-3 text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:hidden ms-auto block w-3 h-3 text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        <div
                          id="property-master-accordion-child"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="property-master-accordion"
                        >
                          <ul className="pt-1 ps-6 space-y-1">
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/property/master/consigner"
                              >
                                <LuSend className="w-3.5 h-3.5" />
                                Consigner
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/property/master/consignee"
                              >
                                <LuInbox className="w-3.5 h-3.5" />
                                Consignee
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/property/master/document"
                              >
                                <LuFileText className="w-3.5 h-3.5" />
                                Document
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/property/master/location"
                              >
                                <LuMapPinned className="w-3.5 h-3.5" />
                                Location
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* 🔄 Property Transaction Accordion */}
                      <li className="hs-accordion" id="property-transaction-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-4 text-sm text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:focus:bg-gray-700/50 transition-colors"
                          aria-expanded="true"
                          aria-controls="property-transaction-accordion-child"
                        >
                          <GrTransaction className="w-4 h-4" />
                          <span>Transactions</span>
                          <svg
                            className="hs-accordion-active:block ms-auto hidden w-3 h-3 text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:hidden ms-auto block w-3 h-3 text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        <div
                          id="property-transaction-accordion-child"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="property-transaction-accordion"
                        >
                          <ul className="pt-1 ps-6 space-y-1">
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/property/transaction/tran-view"
                              >
                                <IoAddCircleOutline className="w-3.5 h-3.5" />
                                Purchase Entry
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/property/sale-view"
                              >
                                <IoAddCircleOutline className="w-3.5 h-3.5" />
                                Sale Entry
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* 🔄 Property Report Accordion */}
                      <li className="hs-accordion" id="property-report-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3 py-2 px-4 text-sm text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:focus:bg-gray-700/50 transition-colors"
                          aria-expanded="true"
                          aria-controls="property-report-accordion-child"
                        >
                          <BiSolidReport className="w-4 h-4" />
                          <span>Report</span>
                          <svg
                            className="hs-accordion-active:block ms-auto hidden w-3 h-3 text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:hidden ms-auto block w-3 h-3 text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        <div
                          id="property-report-accordion-child"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="property-report-accordion"
                        >
                          <ul className="pt-1 ps-6 space-y-1">
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/property/report/property-register"
                              >
                                <FaBuildingCircleArrowRight className="w-3.5 h-3.5" />
                                Property Register
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/property/report/property-location"
                              >
                                <LuMapPinCheck className="w-3.5 h-3.5" />
                                Property Register (Locationwise)
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `flex items-center gap-x-2 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700/50"
                                  }`}
                                to="/property/report/property-location-serv"
                              >
                                <BsCalendar2Week className="w-3.5 h-3.5" />
                                Property Register (Loc./Sur. No)
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar