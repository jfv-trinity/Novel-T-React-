import { body } from "express-validator";
import * as React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import UserProps from "../../common/User";
import { UserContext } from "../../static/UserContext";
import "./Register.scss";
import pageBackground from "../../static/images/Login-Background.jpg";
import { NotificationContext } from "../../static/NotificationContext";
// import formBackground from "../../static/images/sign-in-form.jpg";

function RegisterPage() {
  
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
  
  // let newUser: UserProps;

  const [user, setUser] = useState<UserProps>({isLoggedIn: true});
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (user.password == passwordConfirmation){
      
      //check if email exists already
      fetch(`${process.env.REACT_APP_URL}users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"email": user.email}),
      })
        .then((response) => response.json())
        .then((data) => {

          //create new user if no existing email
          if (data == null) {
            fetch(`${process.env.REACT_APP_URL}users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });

            //login user after being created
            fetch(`${process.env.REACT_APP_URL}users/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"email": user.email}),
            })
              .then((response) => response.json())
              .then((data) => {
                localStorage.clear();
                LoginUser(data);
                navigate(`/MyLibrary/${data.id}`);
              });
          }
          else{
            HandleNotification(
              MyNotification(
                GetErrorMessage(Errors.emailExists),
                GetAvatarImage(Avatars.elf)
              )
            );
          }
        })
    }
    else{
      HandleNotification(
        MyNotification(
          GetErrorMessage(Errors.genericError),
          GetAvatarImage(Avatars.elf)
        )
      );
    }
  };

  return (
    <React.Fragment>
      <div>
        <Helmet>
          <style>{`body { background-image: ${`url(${pageBackground});`} `}</style>
        </Helmet>
        <form
          className="register-form"
          id="form-register"
          onSubmit={handleSubmit}
        >
          <div className="w3-section">
            <label>
              <b>Email Address</b>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                onChange={(e) => setUser({...user, email: e.target.value})}
              />
            </label>
            <br />
            <label>
              <b>User Name</b>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter Username"
                onChange={(e) => setUser({...user, username: e.target.value})}
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
                onChange={(e) => setUser({...user, password: e.target.value})}
              />
            </label>
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
            <div>
              <button
                className="w3-button w3-block w3-green w3-section w3-padding account-button"
                type="submit"
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default RegisterPage;
