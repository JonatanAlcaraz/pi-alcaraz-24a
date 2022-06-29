import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getGenres,
  getPlatforms,
  getVidegoameDetail,
  resetDetail,
  setLoading,
} from "../../redux/actions";
import Footer from "../Footer";
import defaultImage from "../images/defaultImage.png";
import Loading from "../Loading";
import NavBar from "../NavBar";
import "../styles/Detail.css";

function Detail() {
  let { id } = useParams();
  const gameDetail = useSelector((state) => state.gameDetail);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const loading = useSelector((state) => state.loading);
  const statew = useSelector((state) => state);
  const dispatch = useDispatch();

  function platformsFilter(platforms, gamePlat) {
    if (parseInt(gamePlat[0]) + "a" === "NaNa") return gamePlat;
    let obj = {};
    let arr = [];
    platforms.forEach((e) => {
      obj[`${e.id}`] = e.name;
    });
    gamePlat.forEach((e) => {
      arr.push(obj[e]);
    });
    return arr;
  }


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
  
    window.scrollTo(0, 0)
      dispatch(setLoading(true))
      dispatch(getVidegoameDetail(id));
      dispatch(getPlatforms());
      dispatch(getGenres());
    
    return () => {
      dispatch(resetDetail());
    };
  }, [dispatch, id]);
  
  return (
    <div>
      <NavBar />
       {gameDetail.name ?(
        
          <div className="videogame">
            <h2 className="videogame-title">{gameDetail && gameDetail.name}</h2>
            <div className="detail-content">
              {gameDetail && gameDetail.background_image ? (
                <img
                  src={gameDetail.background_image}
                  width="500px"
                  alt="gameDetailimg"
                />
              ) : (
                <img src={defaultImage} width="500px" alt="gameDetailimg" />
              )}
            </div>

            <div class="detail-content">
              <h3>Description:</h3>
              <p>{gameDetail && gameDetail.description}</p>
            </div>
            <div class="detail-content">
              <h3>Release date:</h3>
              <p>{gameDetail && gameDetail.released}</p>
            </div>
            <div class="detail-content">
              <h3>Rating:</h3>
              <p>{gameDetail && gameDetail.rating}</p>
            </div>
            <div class="detail-content">
              <h3>Genres:</h3>
              <p>
                {gameDetail.genres && genres.length
                  ? genreFilter(gameDetail.genres).join(", ")
                  : "Loading..."}
              </p>
            </div>
            <div class="detail-content">
              <h3>Platforms:</h3>
              <p>
                {gameDetail.platforms &&
                  platforms &&
                  platformsFilter(platforms, gameDetail.platforms).join(", ")}
              </p>
            </div>
          </div>
      )
    :
    <Loading/>
    }
      <Footer />
    </div>
  );
}

export default Detail;
