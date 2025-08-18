import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";


const DefaultLayout = () => {
  return (
    <div className="flex h-screen">
      {/* <!-- Sidebar --> */}
      <div className="lg:w-64 bg-gray-800 text-white flex h-screen overflow-hidden">
        <Sidebar />
      </div>
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
        {/* <!-- Header --> */}
        <div className="bg-white shadow-md z-10 sticky top-0 ">
          <Header />
        </div>

        {/* <!-- Main Content --> */}
        <main className=" bg-gray-50 dark:bg-neutral-900">
          <div className="bg-white text-black dark:bg-gray-900 dark:border-neutral-700 dark:text-white overflow-x-auto mx-auto max-w-screen flex justify-center items-center ">
            <Outlet />
          </div>
        </main>
        <div className="sticky bottom-0 ">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
