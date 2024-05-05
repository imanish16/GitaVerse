import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#D4AA7D' }}>
            <div className="container-fluid">
                <span className="navbar-brand libre-baskerville-regular" to="/" onClick={closeSidebar}>GitaVerse</span>
                <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={'collapse navbar-collapse' + (isOpen ? ' show' : '')} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" onClick={closeSidebar}>
                            <NavLink className="nav-link jersey-10-regular" activeClassName="active" to="/chapter-verse">Chapter & Verses</NavLink>
                        </li>
                        <li className="nav-item" onClick={closeSidebar}>
                            <NavLink className="nav-link jersey-10-regular" activeClassName="active" exact to="/summary">Summary</NavLink>
                        </li>
                        <li className="nav-item" onClick={closeSidebar}>
                            <NavLink className="nav-link jersey-10-regular" activeClassName="active" to="/about-us">About Us</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
