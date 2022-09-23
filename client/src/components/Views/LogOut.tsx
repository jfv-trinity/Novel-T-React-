import * as React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../static/UserContext";

function LogOut() {
  const user = React.useContext(UserContext);
  const navigate = useNavigate();

  let id = user!.id;
  let email = user!.email;
  let username = user!.username;
  let password = user!.password;
  let isLoggedIn: boolean = false;

  React.useEffect(() => {
    let logoutUser = { id, email, username, password, isLoggedIn };
    fetch(`/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logoutUser),
    });
    localStorage.clear();
    navigate("/");
    window.location.reload();
  });

  return <React.Fragment>how are you seeing this?</React.Fragment>;
}
export default LogOut;
