import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import { setUser } from "../store/user";
import isButtonDisable from "../hooks/isButtonDisable";
import SuccessToast from "../hooks/toastNotifications/SuccessToast";
import WarningToast from "../hooks/toastNotifications/WarningToast";
import "../styles/Register.css";

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputRegistro, setInputRegistro] = React.useState({});
  const [passwordValidator, setPasswordValidator] = React.useState(true);
  const [emailValidator, setEmailValidator] = React.useState(true);

  const handleChange = (e) => {
    setInputRegistro({ ...inputRegistro, [e.target.name]: e.target.value });
  };

  const handlerBlur = (e) => {
    if (e.target.name === "email") {
      const result = /(?=.*@)(?=.*\.).{8,}/.test(e.target.value);
      setInputRegistro({ ...inputRegistro, email: e.target.value });
      if (result) setEmailValidator(true);
      else setEmailValidator(false);
    }
    if (e.target.name === "password") {
      const result = /(^[A-Z])(?=.*\d).{6,}/.test(e.target.value);
      setInputRegistro({ ...inputRegistro, password: e.target.value });
      if (result) setPasswordValidator(true);
      else setPasswordValidator(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/register", inputRegistro)
      .then((res) => {
        SuccessToast("👋User created!👋");
        dispatch(setUser(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        if (res.data.user) history.push("/");
      })
      .catch((err) => WarningToast("🚫User already exists!🚫"));
  };

  const registerFB = async () => {
    let user;
    const { authResponse } = await new Promise(() => {
      window.FB.login(
        function () {
          window.FB.api(
            "/me?fields=email,id,first_name,last_name,name&transport=cors",
            async function (response) {
              user = {
                username: response.name,
                email: response.email,
                name: response.first_name,
                lastname: response.last_name,
                password: process.env.REACT_APP_PASSWORD_FB,
              };
              if (!user.username) return;

              return axios.post("/api/users/register", user).then((res) => {
                dispatch(setUser(res.data.user));
                localStorage.setItem("token", JSON.stringify(res.data.token));
                localStorage.setItem("user", JSON.stringify(res.data.user));
                if (res.data.user) history.push("/");
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
    <div className="register">
      <h3>Welcome to BookGuru!</h3> <br />
      <p>Please fill in this form to create an account</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name <br />
            <input
              className="registerInput"
              type="text"
              name="name"
              required
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Last Name <br />
            <input
              className="registerInput"
              type="text"
              required
              name="lastname"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Address <br />
            <input
              className="registerInput"
              type="text"
              required
              name="address"
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label>
            Username <br />
            <input
              className="registerInput"
              type="text"
              required
              name="username"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            E-mail <br />
            <input
              className="registerInput"
              type="text"
              required
              name="email"
              onBlur={handlerBlur}
            />
          </label>
          <div>
            {emailValidator
              ? null
              : ["danger"].map((variant, idx) => (
                  <Alert key={idx} variant={variant}>
                    "Wrong e-mail"
                  </Alert>
                ))}
          </div>
          <label>
            Password <br />
            <input
              className="registerInput"
              type="password"
              required
              name="password"
              onBlur={handlerBlur}
            />
          </label>
          <div>
            {passwordValidator
              ? null
              : ["danger"].map((variant, idx) => (
                  <Alert key={idx} variant={variant}>
                    "Password must contain 8 characters, 1 number and 1 capital
                    letter"
                  </Alert>
                ))}
          </div>
        </div>
        <div className="termsAndPrivacyDiv">
          <h6 className="termsH6">
            By creating an account you agree to our Terms & Privacy
          </h6>
          
            <input className="inputCheckboxDiv" required type="checkbox" />
          
        </div>
        <div>
          <button
            className="fbButton localBtn"
            onClick={registerFB}
          >
            Continue with Facebook
          </button>
        </div>
        <div className="registerButtonDiv">
          <button className="button" disabled={isButtonDisable(inputRegistro)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterContainer;

//"Password must be at least 8 characters long, and must contain one number and one capital letter"
