import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user";
import "../styles/LogIn.css";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import isButtonDisable from "../methods/isButtonDisable";
import SuccessToast from "../toastNotifications/SuccessToast";

export default function LoginContainer() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputSignIn, setInputSignIn] = React.useState({});
  const [validCredentials, setValidCredentials] = React.useState(true);

  const handleChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    setInputSignIn({ ...inputSignIn, [key]: value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/login", inputSignIn)
      .then((res) => {
        dispatch(setUser(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setValidCredentials(true);
        SuccessToast(`👋Welcome ${res.data.user.username}👋`);
        history.push("/");
      })
      .catch(() => setValidCredentials(false));
  };

  const loginFB = async () => {
    let user;
    const { authResponse } = await new Promise(() => {
      window.FB.login(
        function () {
          window.FB.api(
            "/me?fields=email,id,name&transport=cors",
            async function (response) {
              user = {
                username: response.name,
                password: process.env.REACT_APP_PASSWORD_FB,
              };
              if (!user.username) {
                return;
              }
              return axios.post("/api/users/login", user).then((res) => {
                dispatch(setUser(res.data.user));
                localStorage.setItem("token", JSON.stringify(res.data.token));
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setValidCredentials(true);
                history.push("/");
              });
            }
          );
        },
        { scope: "public_profile,email" }
      );
    });
    if (!authResponse) return;
  };

  return (
    <div className="login">
      <h3 className="loginTitle">Login</h3>
      <form onSubmit={handleSignIn}>
        <label>
          Username <br />
          <input
            className="loginInput"
            type="text"
            name="username"
            required
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password <br />
          <input
            className="loginInput"
            type="password"
            name="password"
            required
            onChange={handleChange}
          />
        </label>
        <br />
        <div>
          {validCredentials
            ? null
            : ["danger"].map((variant, idx) => (
                <Alert key={idx} variant={variant}>
                  "You have entered an invalid username or password"
                </Alert>
              ))}
        </div>
        <div>
          <div className="singleButtonLoginDiv">
            <button className="fbButton" onClick={loginFB}>
              Login with Facebook
            </button>
          </div>
          <div className="singleButtonLoginDiv">
            <button className="button" disabled={isButtonDisable(inputSignIn)}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
