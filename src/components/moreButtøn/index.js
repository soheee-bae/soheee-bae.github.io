import React from "react";

import { LuChevronsRight } from "react-icons/lu";
import "./index.scss";

export const MoreButton = () => {
  return (
    <a className="moreButton" href="/posts/?category=All">
      더 보기
      <LuChevronsRight size={16} color="var(--lg-black)" />
    </a>
  );
};
