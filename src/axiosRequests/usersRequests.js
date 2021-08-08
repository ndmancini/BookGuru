import axios from "axios";

export function getSingleUser(userId) {
  const token = JSON.parse(localStorage.getItem("token"));

  return axios.get(`/api/users/user/${userId}`, {
    headers: { authorization: `Bearer ${token}` },
  });
}

export function getAllUsers() {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.isAdmin) {
    return axios({
      method: "get",
      url: `/api/users/all/${user.id}`,
      headers: { authorization: `Bearer ${token}` },
    });
  } else return new Promise(() => []);
}

export function getUserCart() {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return axios.get(`/api/users/${user.id}/cart`, {
      headers: { authorization: `Bearer ${token}` },
    });
  } else return new Promise(() => []);
}

export function getUserPrevious() {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return axios.get(`/api/users/${user.id}/checked`, {
      headers: { authorization: `Bearer ${token}` },
    });
  } else return new Promise(() => []);
}

export function deleteUserAxios(userId) {
  const token = JSON.parse(localStorage.getItem("token"));

  return axios({
    method: "delete",
    url: "/api/users",
    data: { userId: userId },
    headers: { authorization: `Bearer ${token}` },
  });
}

export function toggleAdminAxios(userId) {
  const token = JSON.parse(localStorage.getItem("token"));

  return axios({
    method: "put",
    url: `/api/users/toggleAdmin`,
    data: { userId },
    headers: { authorization: `Bearer ${token}` },
  });
}
