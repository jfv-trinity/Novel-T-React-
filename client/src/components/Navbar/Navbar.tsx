import React from "react";
import "./Navbar.module.scss";
import { AccountMenu } from "./AccountMenu";
import { AnonAccountMenu } from "./AnonAccountMenu";
import { UserContext } from "../../static/UserContext";

function Navbar() {
  const user = React.useContext(UserContext);
  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="navbar-container">
          {user?.isLoggedIn ? <AccountMenu /> : <AnonAccountMenu />}
        </div>
        <div className="collapse navbar-collapse" id="navbar"></div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
