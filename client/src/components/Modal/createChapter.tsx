import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ChapterProps from "../../common/Chapters";
import { BookProps } from "../../common/Book";
import { MdAddCircleOutline } from "react-icons/md";
import SelectList from "../Form Inputs/SelectList";
import "./createChapter.scss";

export function CreateChapterModal(data: any) {
  let bookId = data.book?.id;
  let chapterAuthor = data.user?.id;
  let newChapter: ChapterProps;
  let updatedBook: BookProps;
  let numberOfChapters: number = data.book?.numberOfChapters;
  let options: Array<number> = [numberOfChapters];

  const [chapterTitle, setChapterTitle] = React.useState(String);
  const [context, setContext] = React.useState(String);
  const [selectedOption, setSelectedOption] = React.useState(options.length);
  const dateUpdated = new Date();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(parseInt(event.target.value));
  }

  const submitForm = () => {
    newChapter = {
      chapterTitle,
      context,
      bookId,
      chapterAuthor,
      chapterNumber: selectedOption,
    };

    updatedBook = {
      numberOfChapters: selectedOption,
      dateUpdated,
    };

    console.log("the new chapter is ", newChapter);
    fetch(`${process.env.REACT_APP_URL}chapters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChapter),
    });

    fetch(`${process.env.REACT_APP_URL}books/${data.book.id}`, {
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
      <MdAddCircleOutline className="lineBreak" onClick={handleShow} />

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
              <SelectList
                className="float-right"
                options={options}
                selectedOption={selectedOption}
                onChange={handleChange}
              />
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
