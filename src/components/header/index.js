import React from "react";
import { HeaderContent } from "../headerContent";
import { cloudinaryImageUrl } from "../../utils/cloudinary";
import "./index.scss";

export const Header = ({ headerImg, ...rest }) => {
  const cloudinarySrc = cloudinaryImageUrl(headerImg);
  const localSrc =
    !cloudinarySrc && headerImg
      ? require(`../../../assets/images/${headerImg}`).default
      : null;
  const src = cloudinarySrc || localSrc;

  return (
    <div className="header">
      <img src={src} alt={headerImg} />
      <HeaderContent {...rest} />
    </div>
  );
};
