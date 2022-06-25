import { GET_VIDEOGAMES , GET_VIDEOGAME_DETAIL, GET_GENRES, GET_PLATFORMS, SEARCH_VIDEOGAMES, SORT_AZ, SORT_ZA, UPDATE_PAGE, RESET_DETAIL, SORT_API, SORT_CREATED, SORT_RATING, SORT_GENRE, SET_SORT, RESET_SORT_SEARCH, SET_LOADING  } from "../actions/actionsTypes"

const initialState = {
    games: [],
    sortedGames: [],
    searchedGames: [],
    gameDetail: {},
    currentSort: GET_VIDEOGAMES ,
    currentPage:0,
    genres:[],
    platforms:[],
    loading: false
}

export default function rootReducer(state = initialState, {type, payload}){
     switch (type) {
            case GET_VIDEOGAMES: return {...state, games: payload}
            case GET_VIDEOGAME_DETAIL: return {...state, gameDetail: payload}
            case GET_GENRES: return {...state, genres: payload}
            case GET_PLATFORMS: return {...state, platforms: payload}
            case SET_SORT: return {...state, currentSort: payload}
            case SEARCH_VIDEOGAMES: return {...state, searchedGames: payload}
            case UPDATE_PAGE: return {...state, currentPage: payload}
            case SORT_API: return {...state, sortedGames: payload} 
            case SORT_AZ: {
              let gamesAux = [...state.games]
              gamesAux.sort((a,b)=>{
                if (a.name.toLowerCase() < b.name.toLowerCase()){
                  return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1 ;
                }
                // a debe ser igual b
                return 0;
              })
              return {...state, sortedGames: gamesAux, searchedGames: []}
            }
            case SORT_ZA: {
              let gamesAux = [...state.games]
              gamesAux.sort((a,b)=>{
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return 1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return -1 ;
                }
                // a debe ser igual b
                return 0;
              })
              return {...state, sortedGames: gamesAux, searchedGames: []}
            }
            case SORT_RATING: {
              let gamesAux = [...state.games]
              gamesAux.sort((a,b)=>{
                if (a.rating < b.rating) {
                  return 1;
                }
                if (a.rating > b.rating) {
                  return -1 ;
                }
                // a debe ser igual b
                return 0;
              })
              return {...state, sortedGames: gamesAux, searchedGames: []}
            }
            case SORT_GENRE: {
              let gamesAux = [...state.games]
              let res = gamesAux.map(e => {
                
                if(typeof e.genres[0] === "string" && e.genres.includes(payload)){
                    return e
                }
                else {
                    let arr = e.genres.map(g => g.name === payload)
                    if(arr.includes(true)) return e
                }
            }).filter(e=> e !== undefined)
            return {...state, sortedGames: res, searchedGames: []}
            }
            case SORT_CREATED: return {...state, sortedGames: payload}  
            case RESET_DETAIL:  return {...state, gameDetail:{}}
            case RESET_SORT_SEARCH: return {...state, sortedGames: [], searchedGames: []}
            case SET_LOADING: return {...state, loading: payload}
            default: return state
          }
}