import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { DOTS } from "../../constants/page";
import "./index.scss";

export const Pagination = (props) => {
  const { paginationRange, currentPage, handlePageChange } = props;

  let lastPage =
    paginationRange && paginationRange[paginationRange?.length - 1];

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };
  const handlePrev = () => {
    handlePageChange(currentPage - 1);
  };

  return (
    <div className="pagination">
      <ul className="paginationButtons">
        <li
          className="paginationArrow"
          data-disabled={currentPage === 1}
          onClick={handlePrev}
        >
          <LuChevronLeft />
        </li>
        <ul className="paginationPages">
          {paginationRange?.map((page, index) => {
            if (page === DOTS) {
              return <li className="paginationDots">&#8230;</li>;
            }
            return (
              <li
                key={index}
                className="paginationPage"
                data-current={currentPage === page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </li>
            );
          })}
        </ul>
        <li
          className="paginationArrow"
          data-disabled={currentPage === lastPage}
          onClick={handleNext}
        >
          <LuChevronRight />
        </li>
      </ul>
    </div>
  );
};
