import React from "react"

import Header from "../components/header"

// import "../styles/main.scss"

const Layout = ({ children }) => (
  <div>
    <Header />

    <div className="u-effect-fadein">{children}</div>

  </div>
)

export default Layout
