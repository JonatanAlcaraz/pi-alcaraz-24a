import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";
import image from "../images/videogame.png";

function Landing() {
  return (
    <div>
      <div className="landing">
        <div>
          <h1>Videogames PI</h1>
          <h3>Jonatan Alcaraz</h3>
        </div>
        <div>
          <img src={image} alt="Icon" />
        </div>

        <Link to="/home">
          <button>Press Start</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
