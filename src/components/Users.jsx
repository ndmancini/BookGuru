import React from "react";
import { Link } from "react-router-dom";
import "../styles/Books.css";
import "../styles/Users.css";

const Users = ({ users, deleteUser, toggleAdminStatus }) => {
  return (
    <div className="usersMainDiv">
      {users &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <Link to={`/users/${user.id}`} className="usersLinkProperties">
                <div className="tamaño">
                  {user.name} {user.lastname}
                </div>
              </Link>
              <div> {user.username} </div>
              <div> {user.address} </div>
              <div> {user.isAdmin ? "This user is admin" : null} </div>
              <div className="usersButtonDiv">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="usersButton"
                >
                  Delete
                </button>
              </div>
              <div className="usersButtonDiv">
                <button
                  onClick={() => toggleAdminStatus(user.id)}
                  className="usersButton"
                >
                  Toggle admin status
                </button>
              </div>
              <br />
            </div>
          );
        })}
    </div>
  );
};

export default Users;
