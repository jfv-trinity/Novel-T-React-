import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../static/UserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
//chapterEditorModal Rename function and file
export function AccountDeletionModal(data: any) {
  const user = useContext(UserContext);
  const [confirmation, setConfirmation] = useState(String);
  const navigate = useNavigate();

  const deleteConfirmation = () => {
    let accountId = user?.id;
    if (confirmation == "DELETE") {
      fetch(`${process.env.REACT_APP_URL}/users/${accountId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.clear();
      navigate("/");
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
          <Modal.Title>Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="confirmation">
              <Form.Label>
                Enter DELETE below to permanently delete your account
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={""}
                onChange={(e) => setConfirmation(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="btn btn-primary"
            onClick={deleteConfirmation}
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
