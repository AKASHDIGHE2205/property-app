import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from '../assets/malpani3.png';
import CryptoJS from "crypto-js";
import { TfiAlignRight } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const secretKey = `Malpani@2025`;

  const dcryptdata = (encryptedData: string, secretkey: string) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretkey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedData) {
        throw new Error("Decryption failed. Data is empty or corrupted.");
      }
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error("Error during decryption:", error);
      return null;
    }
  }

  const getUserData = () => {
    const encryptedData = sessionStorage.getItem("user");
    if (encryptedData) {
      return dcryptdata(encryptedData, secretKey)
    }
    return null
  }
  const user = getUserData();


  return (
    <>
      {/* <!-- ========== HEADER ========== --> */}
      <header className="sticky top-0 left-0 right-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full
                       bg-white border-b text-sm py-2.5 lg:ps-[260px] dark:bg-gray-900 dark:border-gray-700">
        <nav className="px-2 sm:px- flex basis-full items-center w-full mx-auto">
          <div className="me-5 lg:me-0 lg:hidden">
            {/* <!-- Logo --> */}
            <Link
              className="flex-none text-black rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              to="/"
            >
              <div className="flex -mt-1 items-center gap-x-1">
                <img src={Logo} alt="logo" className="w-32 h-16" />
              </div>
            </Link>
            {/* <!-- End Logo --> */}
          </div>

          <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
            <div className="hidden md:block">
              {/* <!-- Search Input --> */}
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                  <svg
                    className="shrink-0 size-4 text-gray-400 dark:text-white/60"
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
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <input
                  type="text"
                  readOnly
                  className="py-2 ps-10 pe-16 block w-full bg-slate-100 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Search"
                />
                <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400">
                  <svg
                    className="shrink-0 size-3 text-gray-400 dark:text-white/60"
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
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                  </svg>
                  <span className="mx-1">
                    <svg
                      className="shrink-0 size-3 text-gray-400 dark:text-white/60"
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
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </span>
                  <span className="text-xs">/</span>
                </div>
              </div>
              {/* <!-- End Search Input --> */}
            </div>

            <div className="flex flex-row items-center justify-end gap-1">

              <button
                type="button"
                className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                <svg
                  className="shrink-0 size-4"
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
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                <span className="sr-only">Notifications</span>
              </button>

              <button
                type="button"
                className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                <svg
                  className="shrink-0 size-4"
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
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <span className="sr-only">Activity</span>
              </button>

              <button type="button" className="hs-dark-mode-active:hidden block hs-dark-mode font-medium text-gray-800 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:bg-gray-900" data-hs-theme-click-value="dark">
                <span className="group inline-flex shrink-0 justify-center items-center size-9">
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                </span>
              </button>
              <button type="button" className="hs-dark-mode-active:block hidden hs-dark-mode font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-900" data-hs-theme-click-value="light">
                <span className="group inline-flex shrink-0 justify-center items-center size-9">
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                </span>
              </button>

              {/* <!-- Dropdown --> */}
              <div className="hs-dropdown [--placement:bottom-right] relative inline-flex rounded-full shrink-0  size-[38px]">
                <button
                  id="hs-dropdown-account"
                  type="button"
                  className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white"
                  aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <div className="shrink-0 flex justify-center items-center bg-blue-300  hover:bg-blue-200 text-blue-800 rounded-full">
                    <span className="w-[36px] h-[36px] bg-gray-100 dark:bg-gray-500 rounded-full overflow-hidden flex justify-center items-center">
                      {user ? (
                        <div className="text-lg">
                          {user?.user?.f_name?.charAt(0).toUpperCase()}{user?.user?.l_name?.charAt(0).toUpperCase()}
                        </div>
                      ) : (
                        <FaRegUser />
                      )}
                    </span>
                  </div>

                </button>


                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 dark:bg-gray-900 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="hs-dropdown-account"
                >
                  <div className="py-3 px-5 bg-gray-100 rounded-t-lg dark:bg-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Signed in as
                    </p>
                    <p className="text-lg font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
                      {user?.user?.email}
                    </p>
                  </div>
                  <div className="p-1.5 space-y-0.5">

                    {/* logout */}
                    <Link
                      to="/log-out"
                      className="flex items-center gap-x-3.5 py-2 px-3 font-semibold rounded-lg text-red-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-800 dark:hover:text-red-500 dark:focus:bg-gray-700 dark:focus:text-gray-300">
                      <FiLogOut className="text-lg" />Logout
                    </Link>
                  </div>
                </div>
              </div>
              {/* <!-- End Dropdown --> */}
            </div>
          </div>
        </nav>
      </header>
      {/* <!-- ========== END HEADER ========== --> */}

      {/* <!-- ========== MAIN CONTENT ========== --> */}
      {/* <!-- Breadcrumb --> */}
      <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-gray-900 dark:border-gray-700">
        <div className="flex items-center py-2">
          {/* <!-- Navigation Toggle --> */}
          <button
            type="button"
            className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-200 dark:hover:text-gray-500 dark:focus:text-gray-500"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-application-sidebar"
            aria-label="Toggle navigation"
            data-hs-overlay="#hs-application-sidebar"
          >
            <span className="text-lg font-extrabold dark:text-white text-black"><TfiAlignRight size={20} /></span>


          </button>
          {/* <!-- End Navigation Toggle --> */}

          {/* <!-- Breadcrumb --> */}
        </div>
      </div>
      {/* <!-- End Breadcrumb --> */}
    </>
  )
}

export default Header