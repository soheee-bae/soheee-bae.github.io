import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import "./index.scss";
import { LuMail } from "react-icons/lu";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { cloudinaryImageUrl } from "../../utils/cloudinary";

const Bio = () => {
  const bioQuery = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
          bio
          githubUrl
          blogUrl
          emailUrl
          linkedInUrl
        }
      }
    }
  `);
  const { author, bio, githubUrl, linkedInUrl, emailUrl } =
    bioQuery.site.siteMetadata;
  const avatarSrc = cloudinaryImageUrl("profile.jpeg");

  return (
    <div className="bioContainer">
      <div className="bioImage">
        <img
          src={avatarSrc || ""}
          width={100}
          height={100}
          alt={author}
          loading="lazy"
        />
      </div>
      <div className="bioContent">
        <div>
          <span className="bioLink">{author}</span>
        </div>
        <p className="bioText">{bio}</p>
        <div className="bioIcons">
          <a href={emailUrl} target="_blank">
            <LuMail color="var(--lg-light-black)" />
          </a>
          <a href={githubUrl} target="_blank">
            <FaGithub color="var(--lg-light-black)" />
          </a>
          <a href={linkedInUrl} target="_blank">
            <FaLinkedin color="var(--lg-light-black)" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Bio;
