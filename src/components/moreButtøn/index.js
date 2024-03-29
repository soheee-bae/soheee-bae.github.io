import React from "react";

import ChevronRightDouble from "../../../assets/icons/chvronRightDrouble";
import "./index.scss";

export const MoreButton = () => {
  return (
    <a className="moreButton" href="/posts/?category=All">
      더 보기
      <ChevronRightDouble
        width={16}
        height={16}
        strokeWidth={3}
        color="var(--lg-black)"
      />
    </a>
  );
};
