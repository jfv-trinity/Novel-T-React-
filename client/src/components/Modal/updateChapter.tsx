import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { previousPage } from "../../static/index";
import { UserContext } from "../../static/UserContext";
import ChapterProps from "../../common/Chapters";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import UserProps from "../../common/User";
//chapterEditorModal Rename function and file
export function UpdateChapterModal(data: any) {
  const user = useContext(UserContext);
  let chapterAuthor = user?.id;
  let updatedChapter: ChapterProps;

  const [id, setId] = React.useState(Number);
  const [chapterTitle, setChapterTitle] = React.useState(String);
  const [context, setContext] = React.useState(String);
  const [bookId, setBookId] = React.useState(Number);

  const submitForm = () => {
    updatedChapter = { id, chapterTitle, context, bookId, chapterAuthor };
    fetch(`${process.env.REACT_APP_URL}chapter/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedChapter),
    });
    data.handleClose(data.show);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}chapter/${data.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("this is the data for the individual chapter query", data);
        if (data) {
          setChapterTitle(data.chapterTitle);
          setContext(data.context);
          setBookId(data.bookId);
          setId(data.id);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <React.Fragment>
      <Modal
        show={data.show}
        onHide={() => data.handleClose(data.show)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Chapter Title: </Form.Label>
              <Form.Control
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="context">
              <Form.Label>Chapter Context</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={context}
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
            Save Changes
          </Button>
          <Button variant="secondary" onClick={data.handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
