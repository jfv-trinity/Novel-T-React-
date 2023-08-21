import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BookProps } from "../../common/Book";
import { MdAddCircleOutline } from "react-icons/md";
import "../../components/Views/AuthorListings.scss";
import GenreProps from "../../common/Genres";
import GenreButton from "../Container/Genre";

export function CreateBookModal(data: any) {
  const [bookTitle, setBookTitle] = React.useState(String);
  const [image, setImage] = React.useState(String);
  const [summary, setSummary] = React.useState(String);

  const genreTypes:string[] = [
    "sciFi",
    "fantasy",
    "romance",
    "actionAdventure",
    "sliceOfLife",
    "comedy",
    "tragedy",
    "mystery",
    "thriller",
    "horror",
    "isekai",
    "reincarnation",
    "transmigration",
    "historical",
    "military",
    "school",
    "spy",
    "martialArts",
  ];

  const genreButtonValues:Record<string, boolean> = {}

  genreTypes.forEach((key, index)=> {
    genreButtonValues[key] = false;
  })

  // const [bookId, setBookId] = useState(Number);
  const [dik, setDik] = useState<Record<string, boolean>>(genreButtonValues);

  const publishDate = new Date();
  let authorUsername = data.user?.username;
  let authorId = data.user?.id;
  let status = "Ongoing";
  let newBook: BookProps;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitForm = useCallback(() => {
    
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
    })

    .then((response) => response.json())
      .then((data) => {
        let bookGenres: GenreProps = {
          bookId: data.id,
          bookTitle,
          ...dik
        };
        
        fetch(`${process.env.REACT_APP_URL}bookGenres/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookGenres),
        })
    window.location.reload();
  })}
,[dik, bookTitle]);

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
            <div className="container">
          <ul className="ks-cboxtags">
            {genreTypes.map((genre, index) => {
              return (
                <li key={genre}>
                  <Form.Group className={index.toString()} controlId={genre}>
                    <GenreButton
                      id={genre}
                      onClick={()=>{
                        setDik({...dik, [genre]:!dik[genre]})}}
                    />
                  </Form.Group>
                </li>
              );
            })}
          </ul>
        </div>
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
