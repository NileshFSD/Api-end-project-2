import React from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav
      id="nav"
      className="navbar navbar-expand-lg navbar-light bg-primary py-1"
    >
      <Link className="link navbar-brand" to="/">
        B-tag
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <FiMenu className="menubar" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="link nav-link" to="/">
              Home
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link className="nav-link link" to="#">
              Users
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
