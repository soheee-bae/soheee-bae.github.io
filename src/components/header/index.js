import React from "react";
import { HeaderContent } from "../headerContent";
import { cloudinaryImageUrl } from "../../utils/cloudinary";
import "./index.scss";

export const Header = ({ headerImg, ...rest }) => {
  const src = cloudinaryImageUrl(headerImg);

  return (
    <div className="header">
      <img src={src || ""} alt={headerImg || ""} />
      <HeaderContent {...rest} />
    </div>
  );
};
