import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    filterByGenre,
  getVidegoames,
  getVidegoamesApi,
  resetGames,
  setLastSort,
  sortBy,
  sortByCreate,
  updatePage,
} from "../../redux/actions";
import {
  SORT_AZ,
  SORT_API,
  SORT_GENRE,
  SORT_RATING,
  SORT_CREATED,
  SORT_ZA,
  GET_VIDEOGAMES,
  RESET_SORT_SEARCH,
  SEARCH,
} from "../../redux/actions/actionsTypes";
import "../styles/Sort.css"
function Sort({setLoading}) {
  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres)
  const currentSort = useSelector(state => state.currentSort)
  function selectHandler(e) {
    setLoading(true)
  if (e.target.value === GET_VIDEOGAMES){
       dispatch(getVidegoames());
       dispatch(resetGames(RESET_SORT_SEARCH))
        
    }
    else if (e.target.value === SORT_API) {
        dispatch(getVidegoamesApi());
         
    }
    else if (e.target.value === SORT_CREATED) {
        dispatch(sortByCreate());
         
    }
    else if (e.target.value === SORT_AZ || e.target.value === SORT_ZA || e.target.value === SORT_RATING){
        dispatch(sortBy(e.target.value));
         
    } 
    else{
         
        dispatch(filterByGenre(e.target.value));
    }
    
    dispatch(updatePage(0));
    dispatch(setLastSort(e.target.value))
    // setTimeout(()=>{
    //   setLoading(false)
    // },2000)
  }

  return (
    <div class="sort-container">
      <div class="sort" id="sorts">
        <select
          name="sort"
          defaultValue={currentSort === SEARCH ? GET_VIDEOGAMES : currentSort}
          onChange={selectHandler}
        >
          <option value={GET_VIDEOGAMES}>ALL</option>
          <option value={SORT_API}>Games: Only API</option>
          <option value={SORT_AZ}>Games: A-Z</option>
          <option value={SORT_ZA}>Games: Z-A</option>
          <option value={SORT_RATING}>Games: Rating</option>
          <option value={SORT_CREATED}>Games: Created</option>
          {genres && 
            genres.map(e => {
                return <option key={e.id} value={e.name}>Genre: {e.name}</option>
            })
          }
        </select>
      </div>
    </div>
  );
}

export default Sort;
