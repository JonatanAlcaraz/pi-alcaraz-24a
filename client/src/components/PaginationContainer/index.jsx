import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePage } from "../../redux/actions";
import Cards from "../Cards";
import Sort from "../Sort";
import "../styles/Pagination.css";

function PaginationContainer({ games, setLoading }) {
  const lastPage = useSelector((state) => state.currentPage);
  const [gamesPage, setGamesPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(lastPage);
  const dispatch = useDispatch();

  function nextPageHandler() {
    let gamesCount = games.length;
    const nextPage = lastPage + 1;
    const initialIndex = nextPage * 15;
    if (initialIndex >= gamesCount) return;
    setLoading(true)
    setGamesPage(null)
    setGamesPage([...games].splice(initialIndex, 15));
    setCurrentPage(nextPage);
    dispatch(updatePage(nextPage));
    setTimeout(()=>{
      setLoading(false)
    },1000)
  }

  function prevPageHandler() {
    const prevPage = lastPage - 1;
    if (prevPage < 0) return;

    setLoading(true)
    const initialIndex = prevPage * 15;
    setGamesPage([...games].splice(initialIndex, 15));
    dispatch(updatePage(prevPage));
    setCurrentPage(prevPage);
    setTimeout(()=>{
      setLoading(false)
    },1000)
  }

  useEffect(() => {
    //if(lastPage && lastPage > 0) setCurrentPage(lastPage)
    if (games) setGamesPage([...games].splice(lastPage * 15, 15));
    //dispatch(updatePage(currentPage))
  }, [games, currentPage, lastPage]);

  return (
    <div class="pagination-container">
      <div>
        <div class="pagination-info">
        <Sort  setLoading={setLoading}/>
          <div class="pagination-text">Page {lastPage + 1}</div>
          <div class="pagination-btn"> 
            <button onClick={prevPageHandler}>{"<< Prev Page"}</button>
            <button onClick={nextPageHandler}>{"Next Page >>"}</button>
          </div>
        </div>
      </div>
      <div className="cards">
        {gamesPage &&
          gamesPage.map((game) => {
            return (
              <Cards
                name={game.name}
                image={game.background_image}
                id={game.id}
                genres={game.genres}
              />
            );
          })}
      </div>
    </div>
  );
}

export default PaginationContainer;
