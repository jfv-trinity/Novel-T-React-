import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../static/UserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export function UsernameConfigurationModal(data: any) {
  const user = useContext(UserContext);
  const [username, setUsername] = useState(String);
  const [password, setPassword] = useState(String);
  const { LoginUser } = React.useContext(UserContext)!;

  let id = user!.id;
  let email = user?.email;
  let isLoggedIn = user?.isLoggedIn;

  const updateUsername = () => {
    if (password == user?.password) {
      let updatedUser = { id, email, username, password, isLoggedIn };
      fetch(`${process.env.REACT_APP_URL}/users/${id}`, {
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
        onHide={() => data.handleClose(data.show)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Username Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Enter a new username</Form.Label>
              <Form.Control
                type="text"
                placeholder={""}
                onChange={(e) => setUsername(e.target.value)}
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
            onClick={updateUsername}
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
