import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../static/UserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export function EmailConfigurationModal(data: any) {
  const user = useContext(UserContext);
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const { LoginUser } = React.useContext(UserContext)!;

  let id = user?.id;
  let username = user?.username;
  let isLoggedIn = user?.isLoggedIn;

  const updateAccountEmail = () => {
    if (password == user?.password) {
      let updatedUser = { id, email, username, password, isLoggedIn };
      fetch(`${process.env.REACT_APP_URL}users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      LoginUser(updatedUser);
      window.location.reload();
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={data.show}
        onHide={() => data.handleClose()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Email Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Enter a new email address</Form.Label>
              <Form.Control
                type="text"
                placeholder={""}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>enter current password</Form.Label>
              <Form.Control
                type="text"
                placeholder={""}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="btn btn-primary"
            onClick={updateAccountEmail}
          >
            Confirm
          </Button>
          <Button variant="secondary" onClick={data.handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
