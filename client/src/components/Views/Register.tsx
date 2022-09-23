import { body } from "express-validator";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProps from "../../common/User";
import { UserContext } from "../../static/UserContext";

function RegisterPage() {
  const { LoginUser } = React.useContext(UserContext)!;
  const navigate = useNavigate();
  let newUser: UserProps;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newUser = {
      email: email,
      username: username,
      password: password,
      isLoggedIn: true,
    };
    const checkForEmail = { email };
    // work on this  if password1 = password2 then fetch else return password !=
    if (password == passwordConfirmation) {
      console.log(newUser);
      fetch(`${process.env.REACT_APP_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkForEmail),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data == null) {
            fetch(`${process.env.REACT_APP_URL}/users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            });
            const loginEmail = email;
            const login = { loginEmail };
            fetch(`${process.env.REACT_APP_URL}/users/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(login),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("data was reached", data);
                localStorage.clear();
                LoginUser(data);
                navigate(`/MyLibrary`);
              });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <React.Fragment>
      <form className="w3-container" id="form-register" onSubmit={handleSubmit}>
        <div className="w3-section">
          <p>
            <b>Email Address</b>
          </p>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>
            <b>User Name</b>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            <b>Password</b>
            <input
              type="password"
              className="form-control"
              id="password1"
              name="password1"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p id="password1-error" className="hidden-subtext">
            this is subtext
          </p>
          <br />
          <label>
            <b>Re-enter Password</b>
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              placeholder="Re-enter Password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </label>
          <p id="password2-error" className="hidden-subtext">
            this is subtext
          </p>
          <button
            className="w3-button w3-block w3-green w3-section w3-padding"
            type="submit"
          >
            Create Account
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default RegisterPage;
