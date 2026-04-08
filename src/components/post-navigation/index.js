import React from "react";
import { navigate } from "gatsby";
import qs from "query-string";

import "./index.scss";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const PostNavigation = ({ data, selectedCategory }) => {
  const { next, previous } = data;
  const preTitle = previous?.frontmatter.title || "";
  const nextTitle = next?.frontmatter.title || "";

  const handleClick = (slug) => {
    const category = selectedCategory;
    navigate(`${slug}?${qs.stringify({ category })}#blog`);
  };

  return (
    <div className="postNavigation">
      <div
        onClick={() => {
          handleClick(previous?.fields.slug);
        }}
      >
        {previous && (
          <div className="postNavButton">
            <LuChevronLeft />
            <p>{preTitle}</p>
          </div>
        )}
      </div>
      <div
        onClick={() => {
          handleClick(next?.fields.slug);
        }}
      >
        {next && (
          <div className="postNavButton">
            <p>{nextTitle}</p>
            <LuChevronRight />
          </div>
        )}
      </div>
    </div>
  );
};
export default PostNavigation;
