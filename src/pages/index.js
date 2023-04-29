import * as React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import Bio from "../components/bio";
import ContentList from "../components/content-list";
import { MoreButton } from "../components/moreButtøn";

import { Layout } from "../layout";
import "../styles/_typography.scss";
import "./index.scss";

export default function Page({ data }) {
  const posts = data.allMarkdownRemark.edges;
  const filteredPosts = posts.slice(0, 5);
  const { homePageBackground } = data.site.siteMetadata;

  return (
    <Layout
      headerImg={homePageBackground}
      title="소히의 개발 블로그"
      subtitle={`"I am still learning."`}
    >
      <Helmet>
        <title>소히의 개발 블로그</title>
        <meta name="소히의 개발 블로그" />
      </Helmet>
      <div className="homeContainer">
        <Bio />
        <hr />
        <ContentList filteredPosts={filteredPosts} />
        <MoreButton />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query PageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { title: { ne: "null" }, draft: { ne: true } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 300, truncate: true)
          frontmatter {
            title
            subtitle
            draft
            date(formatString: "MMMM DD, YYYY")
            category
            background
            emoji
            tags
          }
          fields {
            slug
          }
        }
      }
    }
    site {
      siteMetadata {
        homePageBackground
      }
    }
  }
`;
