import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";
import image from "../images/videogame.png";

function Landing() {
  return (
    <div className="landing-container">
      <div className="landing">
        <div className="landing-data">
          <h1>Videogames PI</h1>
          <h3>Jonatan Alcaraz</h3>
        </div>
        <div className="landing-img">
          <img src={image} alt="Icon" />
        </div>
        <div className="btn-container">
        <Link to="/home">
          <button className="start-btn">Press Start</button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
