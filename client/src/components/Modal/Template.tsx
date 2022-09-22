import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export function TemplateModal() {
  const [chapterTitle, setChapterTitle] = React.useState(String);
  const [context, setContext] = React.useState(Number);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let object: Object;

  const submitForm = () => {
    fetch(`${process.env.REACT_APP_URL}/chapters`, {
      method: "",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Title </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Chapter Title: </Form.Label>
              <Form.Control
                type="text"
                placeholder={"Info here"}
                onChange={(e) => setChapterTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="context">
              <Form.Label>Chapter Context</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={"Info here"}
                onChange={(e) => setContext(parseInt(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="btn btn-primary"
            onClick={submitForm}
          >
            Create Chapter
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
