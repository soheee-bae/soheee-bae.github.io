const React = require("react");
const { withPrefix } = require("gatsby");

/** Same base as uploaded `blog.jpeg` → public_id `soheee-bae-site/blog` */
const ICON_BASE =
  "https://res.cloudinary.com/dh012rexm/image/upload/w_%SIZE%,h_%SIZE%,c_fill,f_auto,q_auto/soheee-bae-site/blog";

function iconUrl(size) {
  return ICON_BASE.replace(/%SIZE%/g, String(size));
}

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement("link", {
      key: "manifest",
      rel: "manifest",
      href: withPrefix("/manifest.webmanifest"),
      crossOrigin: "anonymous",
    }),
    React.createElement("link", {
      key: "favicon",
      rel: "icon",
      type: "image/jpeg",
      href: iconUrl(32),
    }),
    React.createElement("link", {
      key: "apple-touch-icon",
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: iconUrl(180),
    }),
    React.createElement("meta", {
      key: "theme-color",
      name: "theme-color",
      content: "#6b37bf",
    }),
  ]);
};
