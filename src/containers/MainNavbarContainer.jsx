import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../store/books";
import { setUser } from "../store/user";
import { getRandomBooks, getBooksByAuthorOrTitle } from "../axiosRequests/booksRequests";

import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import "../styles/NavBar.css";
const imagen = require("../assets/Logo.png");

const MainNavbarContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);

  const inputSearchChange = (e) => {
    const input = e.target.value;

    if (input === "") {
      getRandomBooks(15).then(({ data }) => {
        dispatch(setBooks(data));
        history.push("/books");
      });
    } else {
      getBooksByAuthorOrTitle(input).then(({ data }) => {
        if (data.length) {
          dispatch(setBooks(data));
          history.push("/books");
        } else history.push("/no_results");
      });
    }
  };

  const logout = () => {
    window.FB.api("/me/permissions", "delete", null, () => window.FB.logout());
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
                <Button icon="pi pi-shopping-cart"  label="My cart"/>
              </Link>
              <Link to={`/users/${user.id}`}>
                <Button label="My account" style={{ marginLeft: "20px" }} />
              </Link>
              <Button
                label="Logout"
                onClick={logout}
                style={{ margin: "0 20px 0 5vw" }}
              />
            </div>

          ) : (

            <div className="noUserLoggedDiv">
              <Link to="/register">
                <Button icon="pi pi-shopping-cart" label="My cart"/>
              </Link>
              <Link to="/register">
                <Button label="Register" style={{ marginLeft: "20px" }}/>
              </Link>
              <Link to="/login">
                <Button label="Login" style={{ margin: "0 20px" }} />
              </Link>
            </div>

          )}
        </div>
      }
    />
  );
};

export default MainNavbarContainer;
