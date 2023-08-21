import React, { useCallback, useState } from "react";
import react, { useContext } from "react";
import "./BookCreation.scss";
import { displayMockBook, previousPage } from "../../static/index";
import { UserContext } from "../../static/UserContext";
import { BookProps } from "../../common/Book";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GenreButton from "../Container/Genre";
import GenreProps from "../../common/Genres";
import tempImage from "../../static/images/icon.png";

function BookCreation() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const [bookTitle, setBookTitle] = useState(String);
  const [summary, setSummary] = useState(String);
  const [image, setImage] = useState(String);

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
 
  const [dik, setDik] = useState<Record<string, boolean>>(genreButtonValues);
  const publishDate = new Date();

  let authorUsername = user?.username;
  let authorId = user?.id;
  let status = "Ongoing";
  let newBook: BookProps;

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
          .catch((error) => {
            console.error("Error:", error);
          })
      })
      navigate(`/AuthorListings/${user?.id}`);
     }
      ,[dik, bookTitle]);

  return (
    <React.Fragment>
      <Form onSubmit={submitForm} className="form">
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
            placeholder={" Describe your book to get your readers interested."}
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
  
      <div className="novelContainer">
        <img src={tempImage} className="novelCover"></img>
        <div className="novelContext">
          <div className="novelTitle space">
            <b>{bookTitle}</b>
          </div>
          <div className="novelStats space">
            <b>Author: {authorUsername}</b>
            <b>Chapters: {}</b>
            <b>Status: {status}</b>
          </div>
          <div className="space">populate line with genres of novel</div>
          <div className="space"> {summary} </div>

          <div className="space">  Read More  </div>
        </div>
      </div>
 
     

        <Button type="submit" className="btn btn-primary">
          Create Book
        </Button>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Reset
        </Button>
        <Button variant="secondary" onClick={previousPage}>
          Cancel
        </Button>
      </Form>
    </React.Fragment>
  );
}
export default BookCreation;
