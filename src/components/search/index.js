import React from "react";
import "./index.scss";
import { LuSearch } from "react-icons/lu";

export const SearchField = ({ setSearch, handlePageChange }) => {
  var typewatch = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  return (
    <div className="search">
      <LuSearch color="var(--lg-darkest-gray)" />
      <input
        type="text"
        placeholder="검색어"
        onKeyUp={(e) => {
          typewatch(() => {
            handlePageChange(1);
            setSearch(e.target.value);
          }, 500);
        }}
      />
    </div>
  );
};
