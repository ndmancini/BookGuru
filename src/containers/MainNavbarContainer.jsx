import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../store/books";
import { setUser } from "../store/user";
import { getBooksByAuthorOrTitle } from "../axiosRequests/booksRequests";

import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";

import "../styles/NavBar.css";
const imagen = require("../assets/Logo.png");

const MainNavbarContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);

  const inputSearchChange = (e) => {
    const input = e.target.value;

    if (input === "") history.push("/");
    else {
      getBooksByAuthorOrTitle(input).then(({ data }) => {
        if (data.length) {
          dispatch(setBooks(data));
          history.push("/books");
        } else history.push("/no_results");
      });
    }
  };

  const logout = () => {
    if (window.FB) window.FB.api("/me/permissions", "delete", null, () => window.FB.logout());
    localStorage.clear();
    dispatch(setUser({}));
    history.push("/");
  };

  return (
    <Menubar
      start={
        <div>
          <Link to="/">
            <img className="logo" src={imagen.default} alt="BookGuru logo" />
          </Link>
          <InputText
            placeholder="Search books by title or author"
            onChange={inputSearchChange}
            className="inputSearch"
          ></InputText>
        </div>
      }
      end={
        <div>
          {user.id ? (
            <div className="userLoggedDiv">
              <h6 className="usernameLabel">{user.username}</h6>
              <Link to="/cart">
                <button className="button">My cart</button>
              </Link>
              <Link to={`/users/${user.id}`}>
                <button className="button" style={{ marginLeft: "20px" }}>
                  My account
                </button>
              </Link>
              <button
                className="button"
                onClick={logout}
                style={{ margin: "0 20px 0 5vw" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="noUserLoggedDiv">
              <Link to="/register">
                <button className="button">My cart</button>
              </Link>
              <Link to="/register">
                <button className="button" style={{ marginLeft: "20px" }}>
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="button" style={{ margin: "0 20px" }}>
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      }
    />
  );
};

export default MainNavbarContainer;

// if (input === "") {
//   getRandomBooks(15).then(({ data }) => {
//     dispatch(setBooks(data));
//     history.push("/books");
//   });
// } else {
//   getBooksByAuthorOrTitle(input).then(({ data }) => {
//     if (data.length) {
//       dispatch(setBooks(data));
//       history.push("/books");
//     } else history.push("/no_results");
//   });
// }
