/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

//環境変数を使うために必要
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `VIT Works`,
    description: `ITを活用した様々なソリューションを提供するVIT Worksのサイト`,
    lang: `ja`,
    siteUrl: `https://vitworks.net/`,
    local: `ja_JP`,
    fbappid: `2139031849601255`,
    // flaskAppIp: process.env.FLASK_APP_IP.replace(/\"/g, ""),
  },
  plugins: [`axios`],
}
