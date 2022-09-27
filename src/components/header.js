import React from "react"
import { Link } from "gatsby"

const Header = () => {
  return (
    <header className="l-header">
      <div className="l-header__inner">
        <div className="p-header-logo">
          <Link to={`/`} className="p-header-logo__link">
            HOME
          </Link>
        </div>
        <nav className="p-header-nav">
          <ul className="p-header-nav__list">
            <li className="p-header-nav__item">
              <Link to={`/registration/`} className="p-header-nav__link">
                Registration
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
