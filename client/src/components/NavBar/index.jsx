import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import "../styles/NavBar.css";
import SearchBar from "../SearchBar";

function NavBar({ endPoint }) {
  return (
    <div className="navigation-bar">
      {/*<div className="logo">
    <div className="header">
        <img id="logoHenry" src={Logo} width="100" height="100" alt="" />
      </div>
      <div className="navbar">
    </div>*/}

      <div className="nav-container">
        <img clasname="logo" src={Logo} />

        <ul>
          <Link to="/home">
            <li>HOME</li>
          </Link>

          <Link to="/create">
            <li>CREATE GAME</li>
          </Link>
          {endPoint === "home" && (
            <a>
              <li>
                <SearchBar />
              </li>
            </a>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
