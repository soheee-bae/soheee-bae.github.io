import { navigate } from "gatsby";
import * as React from "react";
import { LuFrown } from "react-icons/lu";
import "./404Page.scss";

export default function Components() {
  return (
    <div className="errorRoot">
      <div className="errorNavbar" />
      <div className="errorContent">
        <LuFrown />
        <div className="errorTitle">Page not found</div>
        <div className="errorText">
          Opps! The page you are looking does not exist.
        </div>
        <span onClick={() => navigate(-1)}>Go back</span>
      </div>
    </div>
  );
}
