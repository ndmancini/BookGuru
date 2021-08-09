import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./containers/App";
import store from "./store/store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { initFacebookSdk } from "./methods/initFacebokSdk";

initFacebookSdk().then(
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
  )
);
