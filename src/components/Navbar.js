import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <header className="gv-nav">
      <div className="gv-nav__inner">
        <NavLink className="gv-nav__brand" to="/chapter-verse" onClick={closeSidebar}>
          GitaVerse
        </NavLink>

        <button
          className="gv-nav__toggle"
          type="button"
          aria-expanded={isOpen}
          aria-label="Menu"
          onClick={() => setIsOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className={`gv-nav__links${isOpen ? ' is-open' : ''}`} aria-label="Primary">
          <NavLink
            className={({ isActive }) => `gv-nav__link${isActive ? ' is-active' : ''}`}
            to="/chapter-verse"
            onClick={closeSidebar}
          >
            Read
          </NavLink>
          <NavLink
            className={({ isActive }) => `gv-nav__link gv-nav__link--quiet${isActive ? ' is-active' : ''}`}
            to="/summary"
            onClick={closeSidebar}
          >
            Summary
          </NavLink>
          <NavLink
            className={({ isActive }) => `gv-nav__link gv-nav__link--quiet${isActive ? ' is-active' : ''}`}
            to="/about-us"
            onClick={closeSidebar}
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
