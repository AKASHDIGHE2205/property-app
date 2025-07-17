/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import Pagination from "react-js-pagination";

interface Page {
  currentPage: number;
  itemPerPage: number;
  data: any[];
  handlePageChange: (pageNumber: number) => void;
}

const Paginations: FC<Page> = ({ currentPage, itemPerPage, data, handlePageChange, }) => {
  return (
    <div className="flex justify-center my-3 cursor-pointer">
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemPerPage}
        totalItemsCount={data?.length}
        pageRangeDisplayed={3}
        onChange={handlePageChange}
        itemClass="sm:px-4 px-3  py-2 border border-gray-500  sm:text-md text-sm rounded-md mr-1"
        linkClass=""
        activeClass="bg-blue-600 text-white"
        activeLinkClass=""
        prevPageText="<"
        nextPageText=">"
        innerClass="flex"
      />
    </div>
  );
};

export default Paginations;