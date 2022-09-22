import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Any } from "typeorm";
import { UserContext, UserProvider } from "../../static/UserContext";

function Login() {
  const navigate = useNavigate();
  const { LoginUser } = React.useContext(UserContext)!;

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
        if (data.password === loginPassword) {
          console.log("data: ", data);
          LoginUser(data);
          navigate(`/MyLibrary/${data.id}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <React.Fragment>
      <form method="POST" onSubmit={handleSubmit}>
        <h5 style={{ textAlign: "center" }}>Login</h5>
        <div className="form-group">
          <label>
            {" "}
            <b>Email Address</b>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email/username"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <b>Password</b>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </label>
        </div>
        <input type="hidden" name="type" value="login" />
        <br />
        <button
          type="submit"
          id="submit-button"
          value="Send Form"
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </React.Fragment>
  );
}

export default Login;
