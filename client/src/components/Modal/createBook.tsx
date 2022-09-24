import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import BookProps from "../../common/Book";

export function CreateBookModal(data: any) {
  const [bookTitle, setBookTitle] = React.useState(String);
  const [image, setImage] = React.useState(String);
  const [summary, setSummary] = React.useState(String);
  // const [bookGenres, setBookGenres] = React.useState(String);
  // const [rank, setRank] = React.useState(Number);
  // const [rating, setRating] = React.useState(Number);
  const publishDate = new Date();
  let authorUsername = data.user?.username;
  let authorId = data.user?.id;
  let status = "Ongoing";
  let newBook: BookProps;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitForm = () => {
    newBook = {
      bookTitle,
      image,
      summary,
      publishDate,
      status,
      authorId,
      authorUsername,
    };

    fetch(`${process.env.REACT_APP_URL}books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Book Title: </Form.Label>
              <Form.Control
                type="text"
                placeholder={""}
                onChange={(e) => setBookTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="summary">
              <Form.Label>Book Summary</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={
                  " Describe your book to get your readers interested."
                }
                onChange={(e) => setSummary(e.target.value)}
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
            Create Book
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
