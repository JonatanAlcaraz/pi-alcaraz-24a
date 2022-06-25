import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVidegoameByName, setLastSort, updatePage } from "../../redux/actions";
import { SEARCH } from "../../redux/actions/actionsTypes";

function SearchBar() {
  
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(getVidegoameByName(input));
    dispatch(updatePage(0))
    dispatch(setLastSort(SEARCH))
  }

  function onInputChange(e) {
      e.preventDefault();
      setInput(e.target.value);
      if(e.target.value === "") dispatch(getVidegoameByName(input));
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onInputChange}
          value={input}
          placeholder="Search game..."
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}

export default SearchBar;
