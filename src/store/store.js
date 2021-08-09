import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

//Reducers
import booksReducer from "./books";
import userReducer from "./user";
import singleBookReducer from "./singleBook";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    books: booksReducer,
    singleBook: singleBookReducer,
  },
});

export default store;
