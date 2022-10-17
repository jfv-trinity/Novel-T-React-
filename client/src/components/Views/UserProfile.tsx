import React, { useContext, useState } from "react";
import "./UserProfile.scss";
import User from "../../common/User";
import { UserContext } from "../../static/UserContext";
import { EmailConfigurationModal } from "../Modal/EmailChange";
import { UsernameConfigurationModal } from "../Modal/UsernameChange";
import { PasswordConfigurationModal } from "../Modal/PasswordChange";
import { AccountDeletionModal } from "../Modal/AccountDeletion";
import { Button } from "react-bootstrap";

function displayModal(element: HTMLElement | null) {
  if (element != null) {
    if (element.style.display == "block" || element.style.display == null) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  }
}

function UserProfile() {
  const user = useContext(UserContext)!;

  const [showEmailConfiguration, setShowEmailConfiguration] = useState(false);
  const [showUsernameConfiguration, setShowUsernameConfiguration] =
    useState(false);
  const [showPasswordConfiguration, setShowPasswordConfiguration] =
    useState(false);
  const [showAccountDeletion, setShowAccountDeletion] = useState(false);

  let authorization = true;

  return (
    <React.Fragment>
      <div className="something">
        <h2 className="header">Profile</h2>
        <div className="card">
          <div className="form-group">
            <div className="left">
              <p>Email Address: </p>
              <b>
                <p className="subtext">{user.email}</p>
              </b>
            </div>
            <div className="right">
              <button
                type="button"
                className="btn btn-primary btn-edit"
                id="email-change"
                onClick={() =>
                  setShowEmailConfiguration(!showEmailConfiguration)
                }
              >
                edit
              </button>
            </div>
          </div>
          <div className="form-group">
            <div className="left">
              <p>User Name:</p>
              <b>
                <p className="subtext">{user.username}</p>
              </b>
            </div>
            <div className="right">
              <button
                type="button"
                className="btn btn-primary btn-edit"
                id="username-change"
                onClick={() =>
                  setShowUsernameConfiguration(!showUsernameConfiguration)
                }
              >
                edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h4> Password Security </h4>
      <p>
        Change password using existing password or upgrade your security and
        change password using email authentication.
      </p>
      <button
        className="btn btn-primary"
        id="password-change"
        onClick={() => setShowPasswordConfiguration(!showPasswordConfiguration)}
      >
        {" "}
        Change password{" "}
      </button>
      <br />
      <hr />
      <h4> Account Actions </h4>
      <p> Account can be disabled and recovered later.</p>
      <a href="#!" className="btn btn-danger">
        Disable Account
      </a>
      <button
        type="button"
        id="deletion"
        className="btn outline"
        onClick={() => setShowAccountDeletion(!showAccountDeletion)}
      >
        Delete Account
      </button>
      {authorization ? (
        <UsernameConfigurationModal
          id={user?.id}
          show={showUsernameConfiguration}
          handleClose={() =>
            setShowUsernameConfiguration(!showUsernameConfiguration)
          }
        />
      ) : null}
      {authorization ? (
        <EmailConfigurationModal
          id={user?.id}
          show={showEmailConfiguration}
          handleClose={() => setShowEmailConfiguration(!showEmailConfiguration)}
        />
      ) : null}{" "}
      {authorization ? (
        <PasswordConfigurationModal
          id={user?.id}
          show={showPasswordConfiguration}
          handleClose={() =>
            setShowPasswordConfiguration(!showPasswordConfiguration)
          }
        />
      ) : null}
      {authorization ? (
        <AccountDeletionModal
          id={user?.id}
          show={showAccountDeletion}
          handleClose={() => setShowAccountDeletion(!showAccountDeletion)}
        />
      ) : null}
    </React.Fragment>
  );
}

export default UserProfile;
