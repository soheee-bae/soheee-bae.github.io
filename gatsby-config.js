/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
  siteMetadata: {
    blogName: "TIL",

    author: "배소희",
    bio: "새로운 것을 도전하기 좋아하고 발전을 위해 꾸준히 노력하는 것을 중요하게 생각하는 개발자 입니다.",

    githubUrl: "https://github.com/soheee-bae",
    blogUrl: "https://soheee-bae.github.io/",
    emailUrl: "mailto: baesohee28@gmail.com",
    linkedInUrl: "https://www.linkedin.com/in/bae-sohee-b37a9a166/",

    homePageBackground: "workspace_white.jpeg",
    aboutPageBackground: "aboutme.jpeg",
    postsPageBackground: "blog.jpeg",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `templates`,
        path: `${__dirname}/src/templates`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `components`,
        path: `${__dirname}/src/components`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `styles`,
        path: `${__dirname}/src/styles`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `layout`,
        path: `${__dirname}/src/layout`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/assets/videos`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              quality: 85,
              withWebp: true,
              tracedSVG: false,
              loading: "lazy",
            },
          },
          {
            resolve: "gatsby-remark-emoji",
            options: {
              emojiConversion: "shortnameToUnicode",
              ascii: false,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },

          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "xxx",
        short_name: "xxxx",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "standalone",
        icon: `${__dirname}/assets/images/blog.jpeg`,
        // "src/images/favicon-32x32.png", /
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
  ],
};
