import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import BookProps from "../../common/Book";
import UserProps from "../../common/User";

export function UpdateBookModal(data: any) {
  const [bookTitle, setbookTitle] = React.useState(String);
  const [image, setImage] = React.useState(String);
  const [id, setId] = React.useState(Number);
  const [summary, setSummary] = React.useState(String);
  const [status, setStatus] = React.useState(String);
  // const [bookGenres, setBookGenres] = React.useState(String);
  // const [rank, setRank] = React.useState(Number);
  // const [rating, setRating] = React.useState(Number);
  let authorId = data.user?.id;
  let updatedBook: BookProps;
  const publishDate = new Date();

  const submitForm = () => {
    updatedBook = {
      bookTitle,
      image,
      id,
      summary,
      publishDate,
      status,
      authorId,
    };

    fetch(`/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Modal
        show={data.show}
        onHide={() => data.setShow(false)}
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
                onChange={(e) => setbookTitle(e.target.value)}
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
            {/* <Form.Group className="mb-3" controlId="status">
              <Form.Label>Book Status</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={
                  " Describe your book to get your readers interested."
                }
                onChange={(e) => setSummary(e.target.value)}
              />
            </Form.Group> */}
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
          <Button variant="secondary" onClick={data.handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
