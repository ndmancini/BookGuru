import axios from "axios";

export function getSingleBook(bookId) {
  return axios.get(`/api/books/id/${bookId}`);
}

export function getBooksByAuthorOrTitle(input) {
  return axios.get(`/api/books/author_title/${input}`);
}

export function getRandomBooks(num) {
  return axios.get(`/api/books/random/${num}`);
}

export function getBooksByCategory(category) {
  return axios.get(`/api/books/category/${category}`);
}

export function getBookRatingAxios(bookId) {
  return axios.get(`/api/books/ratings/${bookId}`);
}

export function updateSingleBook(bookId, movieUpdatedProps) {
  const token = JSON.parse(localStorage.getItem("token"));

  return axios({
    method: "put",
    url: `/api/books/id/${bookId}`,
    data: movieUpdatedProps,
    headers: { authorization: `Bearer ${token}` },
  });
}

export function deleteBookAxios(bookId) {
  const token = JSON.parse(localStorage.getItem("token"));
  return axios({
    method: "delete",
    url: `/api/books/id/${bookId}`,
    headers: { authorization: `Bearer ${token}` },
  });
}

export function postBookAxios(bookProps) {
  const token = JSON.parse(localStorage.getItem("token"));

  return axios({
    method: "post",
    url: `/api/books`,
    data: bookProps,
    headers: { authorization: `Bearer ${token}` },
  });
}
