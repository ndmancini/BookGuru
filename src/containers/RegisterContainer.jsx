import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
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
              if (!user.username)return;
              
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
      <div className="container-fluid" />
      <br />
      <h3>Welcome to BookGuru !</h3> <br />
      <p style={{ textAlign: "center" }}>
        Please fill in this form to create an account
      </p>
      <form className="formulario container-fluid" onSubmit={handleSubmit}>
        <div>
          <label>
            Name <br />
            <input
              className="registerInputStyle"
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
              className="registerInputStyle"
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
              className="registerInputStyle"
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
              className="registerInputStyle"
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
              className="registerInputStyle"
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
              className="registerInputStyle"
              type="password"
              required
              name="password"
              onBlur={handlerBlur}
            />
          </label>
        </div>
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
        <div className="termsAndPrivacyDiv">
          <h6 style={{ margin: 0 }}>
            By creating an account you agree to our Terms & Privacy
          </h6>
          <div style={{ padding: "0px 0px 0px 10px", height: "20px" }}>
            <input required type="checkbox" />
          </div>
        </div>
        <div className="fbButtonRegisterDiv">
          <button
            className="btn btn-facebook botonRegisterFacebook"
            onClick={registerFB}
          >
            <i className="fa fa-facebook mr-1"></i>
            Continue with Facebook
          </button>
        </div>
        <div className="registerButtonDiv">
          <button
            className="registerButton"
            disabled={isButtonDisable(inputRegistro)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterContainer;

//"Password must be at least 8 characters long, and must contain one number and one capital letter"
