import React from "react"
import { Helmet } from "react-helmet"

const Seo = props => {
  let title = props.pagetitle

  return (
    <div>
      <Helmet>
        <html lang='ja' />
        <title>{title}</title>

        <meta http-equiv='cache-control' content='no-cache' />
        <meta http-equiv='expires' content='0' />
        <meta http-equiv='pragma' content='no-cache' />

      </Helmet>
    </div>
  )
}

export default Seo
