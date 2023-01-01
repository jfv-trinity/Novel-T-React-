import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BookProps } from "../../common/Book";
import UserProps from "../../common/User";

export function UpdateBookModal(data: any) {
  const [bookTitle, setBookTitle] = React.useState(data.book?.bookTitle);
  const [image, setImage] = React.useState(String);
  const [id, setId] = React.useState(data.id);
  const [summary, setSummary] = React.useState(data.book?.summary);
  const [status, setStatus] = React.useState(String);
  // const [bookGenres, setBookGenres] = React.useState(String);
  // const [rank, setRank] = React.useState(Number);
  // const [rating, setRating] = React.useState(Number);

  let authorId = data.user?.id;
  let updatedBook: BookProps;
  const publishDate = new Date();

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_URL}books/${id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data) {
  //         setBookTitle(data.bookTitle);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  const submitForm = () => {
    updatedBook = {
      bookTitle,
      //image,
      id,
      summary,
      publishDate,
      status,
      authorId,
    };

    fetch(`${process.env.REACT_APP_URL}books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });
    //window.location.reload();
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
          <Modal.Title>Edit Novel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Book Title: </Form.Label>
              <Form.Control
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="summary">
              <Form.Label>Book Summary</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={summary}
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
            Confirm Edit(s)
          </Button>
          <Button variant="secondary" onClick={data.handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
