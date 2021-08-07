import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCartAxios } from "../axiosRequests/ordersRequests";
import "../styles/Books.css";

const CategoriesCompo = () => {
  const history = useHistory();
  const category = useSelector((state) => state.category);
  const { user } = useSelector((state) => state);

  const addOrder = (bookId) =>
    user.id ? addToCartAxios(bookId, user.id) : history.push("/register");

  return (
    <div className="books">
      {category &&
        category.map((book) => {
          return (
            <div key={book.id}>
              <Link to={`/books/${book.id}`}>
                <img src={book.img} alt="" />
              </Link>
              <div className="tamaño">{book.title.slice(0, 21)}</div>
              <div>Price: {book.price} U$D</div>
              <div>
                <button
                  onClick={() => addOrder(book.id)}
                  className="categoriesButton"
                >
                  Add to cart
                </button>
              </div>
              <br />
            </div>
          );
        })}
    </div>
  );
};

export default CategoriesCompo;
