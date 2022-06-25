import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getGenres, getPlatforms, getVidegoames } from "../../redux/actions";
import NavBar from "../NavBar";
import "../styles/Create.css";
function CreateGame() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    image_background: "",
    genres: [],
  });

  const [error, setError] = useState({ submit: false });
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const dispatch = useDispatch();

  function handleChange(e) {
    setInput((prevState) => {
      const newState = {
        ...prevState,
        [e.target.name]: e.target.value,
      };
      setError(validate(newState));
      return newState;
    });
  }

  function handleCheckChange(e) {
    if (e.target.name === "rating") {
      let newValue = parseFloat(e.target.value);
      isNaN(newValue) && (newValue = "");
      setInput((prevState) => {
        const newState = {
          ...prevState,
          rating: newValue,
        };
        setError(validate(newState));
        return newState;
      });
    } else if (e.target.checked) {
      setInput((prevState) => {
        const newState = {
          ...prevState,
          [e.target.name]: [...input[e.target.name], parseInt(e.target.value)],
        };
        setError(validate(newState));
        return newState;
      });
    } else {
      setInput((prevState) => {
        const newState = {
          ...prevState,
          [e.target.name]: [...prevState[e.target.name]].filter(
            (el) => el !== parseInt(e.target.value) && el
          ),
        };
        setError(validate(newState));
        return newState;
      });
    }
  }
  // ||

  function validate(input) {
    const dateValidation =
      /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
    let errors = {};
    if (!input.name) errors.name = "Name is required";
    else if (input.name.length < 4)
      errors.name = "The Name must have more than 4 characters";
    if (!input.description) errors.description = "Description required";
    else if (input.description.length < 10)
      errors.description = "The Description must have more than 10 characters";
    if (!input.released) errors.released = "Date is required";
    else if (!dateValidation.test(input.released))
      errors.released = "Date is invalid";
    if (input.genres.length === 0)
      errors.genres = "You must select at least one genre";
    if (!input.platforms.length)
      errors.platforms = "You must select at least one platform";
    if (
      parseInt(input.rating) < 1 ||
      parseInt(input.rating) > 5 ||
      input.rating === ""
    )
      errors.rating = "The rating must be greater than 1 and less than 5";
    if (
      !errors.name &&
      !errors.description &&
      !errors.released &&
      !errors.genres &&
      !errors.platforms &&
      !errors.rating
    )
      errors.submit = true;
    else errors.submit = false;
    return errors;
  }

  let history = useHistory();
  function handleSubmit(e) {
    const env = process.env;
    e.preventDefault();
    axios
      .post(`${env.REACT_APP_URL}videogames`, input)
      .then(() => dispatch(getVidegoames()))
      .then(() => history.push("/home"));
  }
  useEffect(() => {
    if (genres && genres.length === 0) dispatch(getGenres());
    if (platforms && platforms.length === 0) dispatch(getPlatforms());
  }, [dispatch, genres, platforms]);

  return (
    <div>
      <NavBar/>
      <div class="title">
        <h1>Create your Game</h1>
      </div>
      <div className="container-form-create">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label>Name:</label>
            <input
              className={error.name && "danger"}
              value={input.name}
              type="text"
              name="name"
              placeholder="Game name"
              onChange={handleChange}
            />

            <br />
          </div>
          <div className="input">
            <label className="des">Description:</label>
            <br />
            <textarea
              className={error.description && "danger"}
              value={input.description}
              type="text"
              name="description"
              placeholder="Game description"
              onChange={handleChange}
              cols="30"
              rows="10"
            ></textarea>

            <br />
          </div>
          <div className="input">
            <label>Released Date:</label>
            <input
              value={input.released}
              type="text"
              name="released"
              placeholder="dd/mm/aaaa"
              onChange={handleChange}
            />

            <br />
          </div>

          <div className="input">
            <label>Rating:</label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              name="rating"
              placeholder="1-5"
              onChange={handleCheckChange}
              value={input.rating}
            ></input>
          </div>

            <label>Genres:</label>
          <div className="check">
            <br />
            {genres && genres.length ? (
              genres.map((e) => {
                return (
                  <div>
                    <label key={e.name}>
                      <input
                        type="checkbox"
                        name="genres"
                        value={e.id}
                        onClick={handleCheckChange}
                      />{" "}
                      {e.name}
                    </label>
                  </div>
                );
              })
            ) : (
              <span>Loading Genres...</span>
            )}
          </div>

            <label>Platforms:</label>
          <div className="check">
            <br />
            {platforms.length ? (
              platforms.map((e) => {
                return (
                  <label key={e.name}>
                    <input
                      type="checkbox"
                      name="platforms"
                      value={e.id}
                      onClick={handleCheckChange}
                    />{" "}
                    <span>{e.name}</span>
                  </label>
                );
              })
            ) : (
              <span>Loading Platforms...</span>
            )}
          </div>
          <div className="errors">
            {error.name && (
              <span style={{ color: "red" }}>
                {error.name}
                <br />
              </span>
            )}
            {error.description && (
              <span style={{ color: "red" }}>
                {error.description}
                <br />
              </span>
            )}
            {error.released && (
              <span style={{ color: "red" }}>
                {error.released}
                <br />
              </span>
            )}
            {error.rating && (
              <span style={{ color: "red" }}>
                {error.rating}
                <br />
              </span>
            )}
            {error.genres && (
              <span style={{ color: "red" }}>
                {error.genres}
                <br />
              </span>
            )}
            {error.platforms && (
              <span style={{ color: "red" }}>
                {error.platforms}
                <br />
              </span>
            )}
          </div>
          <div className="submit">
            {error.submit && (
              <input type="submit" value="Create Game" onClick={handleSubmit} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGame;
