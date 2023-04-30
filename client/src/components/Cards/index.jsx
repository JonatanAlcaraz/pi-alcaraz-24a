import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../images/defaultImage.png";
import "../styles/Cards.css";

function Cards({ name, image, id, genres }) {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  function genreFilter(gameGenres) {
    let arr = [];
    if (typeof gameGenres[0] !== "string") {
      gameGenres.forEach((e) => arr.push(e.name));
      return arr;
    }
    //gameGenres.forEach((e) => arr.push(genres.find(g => g.id === e).name));
    return gameGenres;
  }

  useEffect(() => {
    setTimestamp(Date.now());
    setIsImageLoaded(false);
  }, [image]);

  return (
    <Link to={`/detail/${id}`}>
      <div className="card">
         {image ? ( 
          <div className="card-image-container">
            <img
              className={`card-image card-image-dynamic ${
                isImageLoaded ? "loaded" : ""
              }`}
              src={`${image}?t=${timestamp}`}
              onLoad={() => setIsImageLoaded(true)}
              alt={name}
              width="500px"
              />
          </div>
         ) : (
          <div className="card-image-container">
          <img
          className="card-image"
          src={defaultImage}
          onLoad={() => setIsImageLoaded(true)}
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

