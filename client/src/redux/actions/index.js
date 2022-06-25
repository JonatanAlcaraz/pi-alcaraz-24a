import { GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_PLATFORMS, SEARCH_VIDEOGAMES, UPDATE_PAGE, RESET_DETAIL, SORT_API, SORT_CREATED, SORT_GENRE, SET_SORT, RESET_SORT_SEARCH, SET_LOADING } from "./actionsTypes";
import axios from 'axios'
const env = process.env
console.log(env,"env");
export function getVidegoames(){
    return async (dispatch) => {
        return await axios.get(` ${env.REACT_APP_URL}videogames`)
        //.then(r =>  (r))
        .then(r => dispatch({ type: GET_VIDEOGAMES, payload: r.data }))
        .catch(e =>  ("error en peticion al backend"))
    }
}
export function getVidegoamesApi(){
    return async (dispatch) => {
        return await axios.get(` ${env.REACT_APP_URL}videogames/get/onlyapi`)
        //.then(r =>  (r))
        .then(r => dispatch({ type: SORT_API, payload: r.data }))
        .catch(e =>  ("error en peticion al backend"))
    }
}


export function getVidegoameDetail(id){
    return async (dispatch) => {
        return await axios.get(` ${env.REACT_APP_URL}videogames/${id}`)
        //.then(r =>  (r))
        .then(r => dispatch({ type: GET_VIDEOGAME_DETAIL, payload: r.data }))
        .catch(e =>  ("error en peticion al backend"))
    }
}
export function getVidegoameByName(name){
    return async (dispatch) => {
        return await axios.get(` ${env.REACT_APP_URL}videogames?name=${name}`)
        //.then(r =>  (r))
        .then(r => dispatch({ type: SEARCH_VIDEOGAMES, payload: r.data }))
        .catch(e =>  ("error en peticion al backend"))
    }
}


export function getGenres(){
    return async (dispatch) => {
        return await axios.get(` ${env.REACT_APP_URL}genres`)
        .then(r => dispatch({ type: GET_GENRES, payload: r.data }))
    }
}

export function getPlatforms(){
    return async (dispatch) => {
        return await axios.get(` ${env.REACT_APP_URL}videogames/get/platforms`)
        .then(r => dispatch({ type: GET_PLATFORMS, payload: r.data }))
    }
}

export function resetDetail(){
    return async (dispatch) => {
        return dispatch({ type: RESET_DETAIL })
    }
}
export function resetGames(){
    return async (dispatch) => {
        return dispatch({ type: RESET_SORT_SEARCH })
    }
}
export function sortBy(sort){
    return async (dispatch) => {
        return dispatch({ type: sort })
    }
}
export function setLastSort(sort){
    return async (dispatch) => {
        return dispatch({ type: SET_SORT, payload: sort })
    }
}
export function filterByGenre(genre){
    return async (dispatch) => {
        return dispatch({ type: SORT_GENRE ,payload:genre})
    }
}

export function sortByCreate(){
    return async (dispatch) => {
        return await axios.get(` ${env.REACT_APP_URL}videogames/get/created`)
        .then(r => dispatch({ type: SORT_CREATED, payload: r.data }))
    }
}

export function updatePage(actualPage){
    return async (dispatch) => {
        return dispatch({ type: UPDATE_PAGE, payload: actualPage })
    }
}
export function setLoading(bool){
    return async (dispatch) => {
        return dispatch({ type: SET_LOADING, payload: bool })
    }
}
