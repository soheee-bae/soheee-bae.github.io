import React from "react";
import Image from "gatsby-image";
import { graphql, useStaticQuery } from "gatsby";

import "./index.scss";
import { LuMail } from "react-icons/lu";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Bio = () => {
  const bioQuery = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(relativePath: { regex: "/profile.jpeg/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
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

  return (
    <div className="bioContainer">
      <div className="bioImage">
        <Image
          fixed={bioQuery.avatar.childImageSharp.fixed}
          alt={author}
          fadeIn={true}
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
