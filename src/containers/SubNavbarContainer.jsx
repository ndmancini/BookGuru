import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./DropdownContainer";
import "../styles/SubNavbar.css";

const SubNavbarContainer = () => {
  return (
    <div className="subNavbarDiv">
      <div className="dropdownContactAbout">
        <Dropdown className="subNavbarDropdown"/>
      </div>
      <div className="dropdownContactAbout">
        <Link to="/contact" className="subNavbarContact">Contact</Link>
      </div>
      <div  className="dropdownContactAbout">
        <Link to="/about" className="subNavbarAbout">About</Link>
      </div>
    </div>
  );
};

export default SubNavbarContainer;
