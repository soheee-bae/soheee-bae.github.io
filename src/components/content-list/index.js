import React from "react";
import { ContentItem } from "../content-Item";
import "./index.scss";

const ContentList = ({ filteredPosts }) => {
  return (
    <div>
      <p className="contentListSubtitle">새로운 소식</p>
      <p className="contentListTitle">최신 포스트를 살펴보세요</p>
      {filteredPosts.map((post, index) => (
        <ContentItem key={index} post={post} />
      ))}
    </div>
  );
};
export default ContentList;
