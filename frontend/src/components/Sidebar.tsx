import { FaBuildingCircleArrowRight, FaSwatchbook } from "react-icons/fa6";
import { VscFileSubmodule } from "react-icons/vsc";
import { BiSolidReport } from "react-icons/bi";
import { FaIdCard, FaFileAlt } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";;
import { MdLeaderboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import Logo from '../assets/malpani3.png';
import { HiOfficeBuilding, HiLocationMarker, HiClipboardList, HiTag } from "react-icons/hi";
import { RiBook2Line } from "react-icons/ri";
import { TbCalculator, TbFileSymlink } from "react-icons/tb";
import { useEffect } from "react";
import { BsBuildings, BsCalendar2Week } from "react-icons/bs";
import { LuFileText, LuInbox, LuMapPinCheck, LuMapPinned, LuSend } from "react-icons/lu";
import { IoAddCircleOutline } from "react-icons/io5";

const Sidebar = () => {

  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, []);


  return (

    <>
      {/* <!-- Sidebar --> */}
      <div
        id="hs-application-sidebar"
        className="hs-overlay  [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform
                   w-[260px] h-full hidden fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-gray-900 dark:border-gray-700"
        role="dialog" tabIndex={-1} aria-label="Sidebar" >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4">
            {/* <!-- Logo --> */}
            <Link
              to="/"
              className="flex-none text-black rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
            >
              <div className="ml-2 -mt-2 hidden sm:block">
                <img src={Logo} alt="logo" className="w-20 h-16" />
              </div>
            </Link>
            {/* <!-- End Logo --> */}
          </div>

          {/* <!-- Content --> */}
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-700 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500">
            <nav className="hs-accordion-group px-3 py-1 w-full flex flex-col flex-wrap" data-hs-accordion-always-open >
              <ul className="flex flex-col space-y-1">
                {/* 🏠 Home */}
                <li>
                  <Link
                    className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-gray-700 dark:text-white"
                    to="/"
                  >
                    <svg className="shrink-0 size-4" />
                    Home
                  </Link>
                </li>

                {/* Store - Main Accordion */}
                <li className="hs-accordion" id="store-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-200"
                    aria-expanded="true"
                    aria-controls="store-accordion-child"
                  >
                    <VscFileSubmodule size={20} />
                    Store
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4"
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
                      className="hs-accordion-active:hidden ms-auto block size-4"
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
                    <ul className="ps-4 pt-1 space-y-1">
                      {/* 🔐 Master Accordion */}
                      <li className="hs-accordion" id="master-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-200"
                          aria-expanded="true"
                          aria-controls="account-accordion-child"
                        >
                          <MdLeaderboard />
                          Master
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4"
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
                            className="hs-accordion-active:hidden ms-auto block size-4"
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
                          id="master-accordion-child"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="account-accordion"
                        >
                          <ul className="ps-8 pt-1 space-y-1">
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                            ${isActive ? "font-semibold dark:text-blue-700  !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/master/campany"
                              >
                                <HiOfficeBuilding className="text-lg" />
                                Company
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                             ${isActive ? "font-semibold dark:text-blue-700  !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/master/location"
                              >
                                <HiLocationMarker className="text-lg" />
                                Location
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                             ${isActive ? "font-semibold dark:text-blue-700  !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/master/section"
                              >
                                <HiClipboardList className="text-lg" />
                                Section
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                            ${isActive ? "font-semibold dark:text-blue-700  !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/master/category"
                              >
                                <HiTag className="text-lg" />
                                Category
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                            ${isActive ? "font-semibold dark:text-blue-700  !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/master/branch"
                              >
                                <FaBuildingCircleArrowRight />
                                Branch
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* 🔄 Transaction Accordion */}
                      <li className="hs-accordion" id="transaction-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-200"
                          aria-expanded="true"
                          aria-controls="projects-accordion-child"
                        >
                          <GrTransaction /> Transactions
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4"
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
                            className="hs-accordion-active:hidden ms-auto block size-4"
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
                          id="transaction-accordion-child"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="projects-accordion"
                        >
                          <ul className="ps-8 pt-1 space-y-1">
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                          ${isActive ? "font-semibold dark:text-blue-700   !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/transaction/view"
                              >
                                <TbFileSymlink size={18} /> Record Entries
                              </NavLink>
                            </li>

                            <li >
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                          ${isActive ? "font-semibold dark:text-blue-700   !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/transaction/despose"
                              >
                                <FaFileAlt /> Disposed Files
                              </NavLink>
                            </li>

                          </ul>
                        </div>
                      </li>

                      <li className="hs-accordion" id="master-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-200"
                          aria-expanded="true"
                          aria-controls="account-accordion-child"
                        >
                          <BiSolidReport size={20} />Report
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4"
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
                            className="hs-accordion-active:hidden ms-auto block size-4"
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
                          id="master-accordion-child"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="account-accordion"
                        >
                          <ul className="ps-8 pt-1 space-y-1">
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                            ${isActive ? "font-semibold dark:text-blue-700   !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/report/entry-status-report" >
                                <FaIdCard /> Entry Status Report
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                            ${isActive ? "font-semibold dark:text-blue-700   !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"} `}
                                to="/report/record-entry-report">
                                <RiBook2Line /> Record Entry Report
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                             ${isActive ? "font-semibold dark:text-blue-700   !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/report/issue-report">
                                <TbCalculator size={20} /> Issue Register
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Store - Main Accordion Ends */}

                {/* Property - Main Accordion */}
                <li className="hs-accordion" id="property-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-200"
                    aria-expanded="true"
                    aria-controls="property-accordion-child"
                  >
                    <BsBuildings size={20} /> Property
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4"
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
                      className="hs-accordion-active:hidden ms-auto block size-4"
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
                    <ul className="ps-4 pt-1 space-y-1">
                      {/* 🔐 Master Accordion */}
                      <li className="hs-accordion" id="master-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-200"
                          aria-expanded="true"
                          aria-controls="account-accordion-child"
                        >
                          <MdLeaderboard />
                          Master
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4"
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
                            className="hs-accordion-active:hidden ms-auto block size-4"
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
                          id="master-accordion-child"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="account-accordion"
                        >
                          <ul className="ps-8 pt-1 space-y-1">
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                            ${isActive ? "font-semibold dark:text-blue-700  !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/property/master/consigner"
                              ><LuSend size={18} />
                                Consigner
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                             ${isActive ? "font-semibold dark:text-blue-700  !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/property/master/consignee"
                              ><LuInbox size={18} />
                                Consignee
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                             ${isActive ? "font-semibold dark:text-blue-700  !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/property/master/document"
                              ><LuFileText size={18} />
                                Document
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                            ${isActive ? "font-semibold dark:text-blue-700  !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/property/master/location"
                              ><LuMapPinned size={18} />
                                Location
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* 🔄 Transaction Accordion */}
                      <li className="hs-accordion" id="transaction-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-200"
                          aria-expanded="true"
                          aria-controls="projects-accordion-child"
                        >
                          <GrTransaction size={18} /> Transactions
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4"
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
                            className="hs-accordion-active:hidden ms-auto block size-4"
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
                          id="transaction-accordion-child"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="projects-accordion"
                        >
                          <ul className="ps-8 pt-1 space-y-1">
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                          ${isActive ? "font-semibold dark:text-blue-700   !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/property/transaction/tran-view"
                              ><IoAddCircleOutline size={18} />
                                Transaction Data Entry
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>
                      {/* 🔄 Transaction Accordion Ends */}

                      {/* 🔄 Report Accordion */}
                      <li className="hs-accordion" id="master-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-200"
                          aria-expanded="true"
                          aria-controls="account-accordion-child"
                        >
                          <BiSolidReport size={20} />Report
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4"
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
                            className="hs-accordion-active:hidden ms-auto block size-4"
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
                          id="master-accordion-child"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="account-accordion"
                        >
                          <ul className="ps-8 pt-1 space-y-1">
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                            ${isActive ? "font-semibold dark:text-blue-700   !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/property/report/property-register" ><FaBuildingCircleArrowRight size={18} />
                                Property Register
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                            ${isActive ? "font-semibold dark:text-blue-700   !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to="/property/report/property-location" ><LuMapPinCheck size={22} />
                                Property Register(Locationwise)
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                            ${isActive ? "font-semibold dark:text-blue-700   !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"} `}
                                to="/property/report/property-location-serv"><BsCalendar2Week size={20} />
                                Property Register(Loc./Sur. No)
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className={({ isActive }) => `hidden w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300
                             ${isActive ? "font-semibold dark:text-blue-700   !text-blue-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-300"}`}
                                to=""><FaSwatchbook size={18} />
                                Property Register(Loc./Sur. No)||
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>
                      {/* 🔄 Report Accordion Ends*/}

                    </ul>
                  </div>
                </li>
                {/* Property - Main Accordion Ends */}

              </ul>

            </nav>
          </div>
          {/* <!-- End Content --> */}
        </div>
      </div>
      {/* <!-- End Sidebar --> */}
    </>
  )
}

export default Sidebar