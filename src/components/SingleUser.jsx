import React from "react";
import { Link } from "react-router-dom";
import "../styles/SingleUser.css";

const SingleUser = ({ singleUser }) => {
  return (
    <div className="singleuser">
      <h2>{singleUser.username}</h2>
      <hr />
      <div>
        <h5>Name: {singleUser.name}</h5>
        <h5>Last name: {singleUser.lastname}</h5>
        <h5>Address: {singleUser.address}</h5>
        <h5>Username: {singleUser.username}</h5>
        <h5>E-mail: {singleUser.email}</h5>
        <div className="editBtnDiv">
          <Link to="/">
            <button className="button editBtn">Edit my info</button>
          </Link>
          <Link to="/previous">
            <button className="button">My history</button>
          </Link>
        </div>
      </div>
      <hr />

      {singleUser.isAdmin ? (
        <div>
          <p>You are admin of this website</p>
          <div className="adminButtonsDiv">
            <Link to="/newbook">
              <button className="button">Add new book</button>
            </Link>
            <Link to="/history">
              <button className="button allHistoryBtn">See all history</button>
            </Link>
            <Link to="/users">
              <button className="button">See all users</button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SingleUser;
