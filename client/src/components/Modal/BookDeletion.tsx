import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../static/UserContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function BookDeletionModal(data: any) {
  const user = useContext(UserContext);

  const submitForm = () => {
    let bookId = data.id;
    fetch(`${process.env.REACT_APP_URL}/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
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
          <Modal.Title>Book Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure you wish to delete? </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="btn btn-primary"
            onClick={submitForm}
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
