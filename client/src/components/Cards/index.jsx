import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../images/defaultImage.png";
import "../styles/Cards.css";
function Cards({ name, image, id, genres }) {
  function genreFilter(gameGenres) {
    let arr = [];
    if (typeof gameGenres[0] !== "string") {
      gameGenres.forEach((e) => arr.push(e.name));
      return arr;
    }
    //gameGenres.forEach((e) => arr.push(genres.find(g => g.id === e).name));
    return gameGenres;
  }

  return (
    <Link to={`/detail/${id}`}>
      <div className="card">
        {image ? (
          <div className="card-image-container">
            <img className="card-image" src={image} alt={name} width="500px" />
          </div>
        ) : (
          <div className="card-image-container">
            <img
              className="card-image"
              src={defaultImage}
              alt={name}
              width="500px"
            />
          </div>
        )}
        <div className="container">
          <h4>
            <b>{name}</b>
          </h4>
          <p>{genreFilter(genres).join(", ")}</p>
        </div>
      </div>
    </Link>
  );
}

export default Cards;
