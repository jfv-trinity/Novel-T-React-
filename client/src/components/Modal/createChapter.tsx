import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ChapterProps from "../../common/Chapters";
import UserProps from "../../common/User";
import { useNavigate } from "react-router-dom";
import BookProps from "../../common/Book";

export function CreateChapterModal(data: any) {
  const [chapterTitle, setChapterTitle] = React.useState(String);
  const [context, setContext] = React.useState(String);
  let bookId = data.book?.id;
  let chapterAuthor = data.user?.id;
  let newChapter: ChapterProps;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitForm = () => {
    newChapter = { chapterTitle, context, bookId, chapterAuthor };
    console.log("the new chapter is ", newChapter);
    fetch(`${process.env.REACT_APP_URL}/chapters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChapter),
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
          <Modal.Title>Create Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Chapter Title: </Form.Label>
              <Form.Control
                type="text"
                placeholder={"Example: My book chapter 1"}
                onChange={(e) => setChapterTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="context">
              <Form.Label>Chapter Context</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={" Enter your chapter body text here."}
                onChange={(e) => setContext(e.target.value)}
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
