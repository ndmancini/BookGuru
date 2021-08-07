// import React from "react";
// import { useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";
// import BooksSearch from "../components/NoResults";
// import { addOrderAxios } from "../axiosRequests/ordersRequests";
// import "../styles/Books.css";

// const SearchContainer = () => {
//   const history = useHistory();
//   const { books, user } = useSelector((state) => state);

//   const addOrder = (bookId) =>
//     user.id ? addOrderAxios(bookId, user.id) : history.push("/register");

//   return <BooksSearch books={books} addOrder={addOrder} />;
// };

// export default SearchContainer;
