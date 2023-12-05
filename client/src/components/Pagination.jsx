import { Button } from "@radix-ui/themes";
import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {
  const { numOfPages, pageNo, pageSize, handlePageClick, totalItems } = props;

  useEffect(() => {
    console.error = () => {}; // Suppress the console.error output
  }, []);

  return (
    <div
      className={`w-full flex flex-row justify-between ${
        numOfPages === 0 ? "sr-only" : ""
      } `}
    >
      <div>
        {/* <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{pageNo}</span> to{" "}
          <span className="font-medium">
            {pageNo * pageSize > totalItems
              ? pageNo * pageSize - (pageNo * pageSize - totalItems)
              : pageNo * pageSize}
          </span>{" "}
          of
          <span className="font-medium"> {totalItems}</span> results
        </p> */}
      </div>
      <ReactPaginate
        containerClassName="flex justify-center items-center gap-1 mx-28 mb-3"
        activeClassName=" bg-primary text-white px-3 py-1 cursor-pointer"
        pageClassName="px-3 py-1  rounded-md  bg-gary cursor-pointer"
        previousClassName="px-3 py-1 cursor-pointer"
        nextClassName="px-3 py-1  cursor-pointer"
        disabledClassName="cursor-not-allowed"
        breakLabel="..."
        nextLabel={
          <Button
            className={`border-1 border-gray px-3 py-1`}
            disabled={pageNo === numOfPages}
            size="2"
          >
            <span
              className={`${pageNo === numOfPages ? " text-graydark " : null}`}
            >
              next
            </span>
          </Button>
        }
        forcePage={pageNo - 1}
        onPageChange={handlePageClick}
        pageRangeDisplayed={0}
        pageCount={numOfPages}
        previousLabel={
          <Button
            className="border-1 border-gray-400 px-3 py-1"
            size="2"
            disabled={pageNo === 1 || pageNo === 0 || !pageNo}
          >
            <span
              className={`${
                pageNo === 1 || pageNo === 0 || !pageNo
                  ? " text-graydark  "
                  : null
              }`}
            >
              previous
            </span>
          </Button>
        }
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
