import React from "react";
import { navigate } from "gatsby";
import qs from "query-string";

import "./index.scss";
import { ChevronLeft } from "../../../assets/icons/chevronLeft";
import { ChevronRight } from "../../../assets/icons/chevronRight";

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
            <ChevronLeft />
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
            <ChevronRight />
          </div>
        )}
      </div>
    </div>
  );
};
export default PostNavigation;
