import React, { useEffect, useState } from "react";
import { getGenres, getPlatforms, getVidegoames } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import PaginationContainer from "../PaginationContainer/index";
import Sort from "../Sort";
import SearchBar from "../SearchBar";
import { GET_VIDEOGAMES, SEARCH } from "../../redux/actions/actionsTypes";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Loading from "../Loading";
function Home() {
  const games = useSelector((state) => state.games);
  const sortedGames = useSelector((state) => state.sortedGames);
  const searchedGames = useSelector((state) => state.searchedGames);
  const currentSort = useSelector((state) => state.currentSort);
  const platforms = useSelector((state) => state.platforms);
  //const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  function gameChoice(games, searchedGames, sortedGames) {
    // ("render games",(sortedGames.length === 0 && searchedGames.length === 0),"render search",searchedGames.length,"render sorted",sortedGames.length);
    if (
      sortedGames.length === 0 &&
      searchedGames.length === 0 &&
      currentSort === GET_VIDEOGAMES
    )
      return games;
    if (searchedGames.length && currentSort === SEARCH) return searchedGames;
    if (
      sortedGames.length &&
      currentSort !== SEARCH &&
      currentSort !== GET_VIDEOGAMES
    )
      return sortedGames;
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    if (games.length === 0) {
      dispatch(getVidegoames());
    }
    //if (platforms.length === 0) dispatch(getPlatforms());
    dispatch(getGenres());
  }, [dispatch]);
  return (
    <div class="primary-container">
      <div>
        <NavBar endPoint={"home"} />
      </div>
      { games.length && !loading ? (
        <div>
          <PaginationContainer
            games={gameChoice(games, searchedGames, sortedGames)}
            setLoading={setLoading}
          />
        </div>
      ) : (
        <Loading/>
      )}
      <Footer />
    </div>
  );
}

export default Home;

// {(sortedGames.length === 0 && searchedGames.length === 0) &&
//     <div>
//         <PaginationContainer games={games} />
//     </div>
//   }

//   {searchedGames.length &&
//   <div>
//       <PaginationContainer games={searchedGames} />
//   </div>
// }

//   {sortedGames.length &&
//     <div>
//         <PaginationContainer games={sortedGames} />
//     </div>
//         }
