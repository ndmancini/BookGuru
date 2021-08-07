import React from "react";
import { Link } from "react-router-dom";
import "../styles/Books.css";

const Books = ({ books, addToCart }) => {
  return (
    <div className="books">
      {books &&
        books.map((book) => {
          return (
            <div key={book.id}>
              <Link to={`/books/${book.id}`}>
                <img src={book.img} alt="" />
              </Link>
              <div className="title">{book.title.slice(0, 21)}</div>
              <div>Price: {book.price} U$D</div>
              <div className="btnDiv">
                <button
                  onClick={() => addToCart(book.id)}
                  className="addToCartBtn"
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

export default Books;
