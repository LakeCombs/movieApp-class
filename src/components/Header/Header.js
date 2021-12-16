import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAsyncMovies } from "../../features/movies/movieSlice";
import avatar from "../../images/user.png";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (search === " ") {
      return alert("enter a movie you want to search");
    }
    dispatch(fetchAsyncMovies(search));
    setSearch("");

    console.log(search);
  };
  return (
    <div className="Header">
      <div className="logo">
        {" "}
        <Link to="/">Movie App </Link>{" "}
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search for movies"
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <div className="user-image">
        <img src={avatar} alt="user" />
      </div>
    </div>
  );
};

export default Header;
