import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUserAxios,
  toggleAdminAxios,
} from "../axiosRequests/usersRequests";
import SuccessToast from "../toastNotifications/SuccessToast";
import Users from "../components/Users";
import "../styles/Users.css";

const UsersContainer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(({ data }) => {
      setUsers(data);
    });
  }, []);

  const deleteUser = (userId) => {
    deleteUserAxios(userId)
      .then(({ data }) => {
        SuccessToast(`🚫User ${data.username} Deleted!🚫`);
      })
      .then(() => getAllUsers())
      .then((res) => {
        setUsers(res.data);
      });
  };

  const toggleAdminStatus = (userId) => {
    toggleAdminAxios(userId).then(({ data }) => {
      getAllUsers().then((res) => {
        setUsers(res.data);
        SuccessToast(`👩‍💻${data.username} admin status toggled👩‍💻`);
      });
    });
  };

  return (
    <Users users={users} deleteUser={deleteUser} toggleAdminStatus={toggleAdminStatus} />
  );
};

export default UsersContainer;
