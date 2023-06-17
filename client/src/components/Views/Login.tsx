import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserProvider } from "../../static/UserContext";
import { Helmet } from "react-helmet";
import "./Login.scss";
import { NotificationContext } from "../../static/NotificationContext";
import * as careTaker from "../../static/images/Notification-Icon-CareTaker.jpg";
import background from "../../static/images/Login-Background.jpg";

function Login() {
  const navigate = useNavigate();
  const { LoginUser } = React.useContext(UserContext)!;
  const {
    Avatars,
    Errors,
    GetErrorMessage,
    GetAvatarImage,
    HandleNotification,
    MyNotification,
  } = React.useContext(NotificationContext)!;
  

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const login = { loginEmail };
    fetch(`${process.env.REACT_APP_URL}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("login data was reached", data);
        if (data.password === loginPassword) {
          LoginUser(data);
          navigate(`/MyLibrary/${data.id}`);
        } 
      })
      .catch((error) => {
        HandleNotification(
          MyNotification(
            GetErrorMessage(Errors.login),
            GetAvatarImage(Avatars.elf)
          )
        );
        console.error("Error:", error);
      });
  };

  return (
    <React.Fragment>
      <div>
        <Helmet>
          <style>{`body { background-image: ${`url(${background});`} `}</style>
        </Helmet>
        <form method="POST" onSubmit={handleSubmit} className="login-form">
          {/* <br />
          <h5 style={{ textAlign: "center" }}>Sign-In</h5> */}
          <br />
          <div className="form-group top">
            <label>
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
          <div className="form-group bottom">
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
          <button
            type="submit"
            id="submit-button"
            value="Send Form"
            className="btn btn-primary"
          >
            Sign-in
          </button>
          <button
            className="btn btn-danger"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;
