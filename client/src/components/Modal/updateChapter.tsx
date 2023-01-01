import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { previousPage } from "../../static/index";
import { UserContext } from "../../static/UserContext";
import ChapterProps from "../../common/Chapters";
import { BookProps } from "../../common/Book";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SelectList from "../Form Inputs/SelectList";
import "./createChapter.scss";

//chapterEditorModal Rename function and file
export function UpdateChapterModal(data: any) {
  const user = useContext(UserContext);
  let chapterAuthor = user?.id;
  let updatedChapter: ChapterProps;
  let updatedBook: BookProps;

  let numberOfChapters: number = data.book?.numberOfChapters;
  let options: Array<number> = [];

  for (let x = 0; x <= numberOfChapters; x++) {
    options.push(x + 1);
  }

  const [id, setId] = React.useState(Number);
  const [chapterTitle, setChapterTitle] = React.useState(String);
  const [context, setContext] = React.useState(String);
  const [bookId, setBookId] = React.useState(Number);
  const [selectedOption, setSelectedOption] = React.useState(options.length);
  const dateUpdated = new Date();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(parseInt(event.target.value));
  }

  const submitForm = () => {
    updatedChapter = {
      id,
      chapterTitle,
      context,
      bookId,
      chapterAuthor,
      chapterNumber: selectedOption,
    };
    updatedBook = {
      dateUpdated,
    };
    fetch(`${process.env.REACT_APP_URL}chapter/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedChapter),
    });
    fetch(`${process.env.REACT_APP_URL}books/${data.book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });
    data.handleClose(data.show);
    window.location.reload();
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
              <SelectList
                className="float-right"
                options={options}
                selectedOption={selectedOption}
                onChange={handleChange}
              />
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
