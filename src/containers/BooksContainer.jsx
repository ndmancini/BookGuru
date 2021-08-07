import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBooks } from "../store/books";
import Books from "../components/Books";
import { getRandomBooks } from "../axiosRequests/booksRequests";
import { addToCartAxios } from "../axiosRequests/ordersRequests";
import "../styles/Books.css";
import "react-toastify/dist/ReactToastify.css";

const BooksContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { books, user } = useSelector((state) => state);

  useEffect(() => {
    if (!books.length) {
      getRandomBooks(15).then(({ data }) => dispatch(setBooks(data)));
    }
  }, [books, dispatch]);

  const addToCart = (bookId) => {
    user.id ? addToCartAxios(bookId, user.id) : history.push("/register");
  };

  return <Books books={books} addToCart={addToCart} />;
};

export default BooksContainer;
