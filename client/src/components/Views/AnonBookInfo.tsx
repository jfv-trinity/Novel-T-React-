import React, { useEffect } from "react";
import "./AnonBookInfo.scss";
import { displayChapters, displayModal } from "../../static/index";
import { useParams } from "react-router-dom";
import { BookProps } from "../../common/Book";

function AnonBookInfo() {
  const [book, setBook] = React.useState<BookProps>();
  const [chapters, setChapters] = React.useState<any[]>([]);
  const params = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}books/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("this is the data for book", data);
        if (data) {
          setBook(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}chapters/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("this is the data for chapter", data);
        if (data) {
          setChapters(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <React.Fragment>
      <hr />
      <br />
      <div className="inline-flex">
        <img src="/static/emptybook.png" className="book-cover" />
        <div className="wrapper">
          <div className="details">
            <div className="row">
              <div className="book-attribute">title(s):</div>
              <div className="attribute-context">{book?.bookTitle}</div>
            </div>
            <div className="row">
              <div className="book-attribute">Genre(s): </div>
              <div className="attribute-context">{book?.bookGenres}</div>
            </div>
            <div className="row">
              <div className="book-attribute">Author: </div>
              <div className="attribute-context">{book?.authorUsername}</div>
            </div>
            <div className="row">
              <div className="book-attribute">rank: </div>
              <div className="attribute-context">N/A</div>
            </div>
            <div className="row">
              <div className="book-attribute">rating: </div>
              <div className="attribute-context">N/A</div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div>
        <h3> Book Summary </h3>
        <hr />
        <p style={{ textAlign: "center" }}>{book?.summary}</p>
      </div>
      <br />
      <br />
      <div className="w3-container">
        <h3> Book Chapters </h3>
        <hr />
        <div>{displayChapters(chapters)}</div>
      </div>
    </React.Fragment>
  );
}

export default AnonBookInfo;
