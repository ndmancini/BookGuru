import React, { useState } from "react";
// import "../styles/SingleBook.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import AddBook from "../components/AddBook";
import { postBookAxios } from "../axiosRequests/booksRequests";
import SuccessToast from "../toastNotifications/SuccessToast";
import WarningToast from "../toastNotifications/WarningToast";

const AddBookContainer = () => {
  const [newBookProps, setNewBookProps] = useState({});
  const history = useHistory();

  const { user } = useSelector((state) => state);

  const changeHandler = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    setNewBookProps({ ...newBookProps, [key]: value });
  };

  function submitHandler(e) {
    e.preventDefault();
    postBookAxios(newBookProps)
      .then(() => {
        SuccessToast("✨ Book created📚 ✨");
        history.push(`/books`);
      })
      .catch((err) => WarningToast("🦥Book already exists🦥"));
  }

  const bookPropsArray = [
    "title",
    "author",
    "img",
    "price",
    "publisher",
    "maturityRating",
  ];

  return (
    <div>
      {user.isAdmin ? (
        <AddBook
          bookPropsArray={bookPropsArray}
          changeHandler={changeHandler}
          submitHandler={submitHandler}
        />
      ) : null}
    </div>
  );
};

export default AddBookContainer;
