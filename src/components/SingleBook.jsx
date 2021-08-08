import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSingleBook } from "../store/singleBook";
import ratingStars from "../hooks/ratingStars";
import "../styles/SingleBook.css";

const SingleBook = ({ singleBook, addToCart, rating }) => {
  const { isAdmin } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setSingleBook(singleBook));
  }, [dispatch, singleBook]);

  return (
    <div className="singlebook">
      <h3>{singleBook.title}</h3>
      <hr />
      <div className="dataimg">
        <div className="data">
          <h5>Author: {singleBook.author}</h5>
          <h5>Genre: {singleBook.category}</h5>
          <h5>Publisher: {singleBook.publisher}</h5>
          <h5>Rating: {rating ? ratingStars(rating) : "No ratings yet"}</h5>
          <h5>Price: U$D {singleBook.price}</h5>
        </div>
        <img src={singleBook.img} alt="" />
      </div>
      <br />
      <div>
        <p>{singleBook.description}</p>
      </div>
      <div className="addToCartEditButton">
        <div className="boton">
          <button
            onClick={() => addToCart(singleBook.id)}
            className="singleBookButtons"
          >
            Add to cart
          </button>
        </div>
        {isAdmin ? (
          <div className="boton">
            <Link to="/edit">
              <button className="singleBookButtons">Edit</button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SingleBook;
