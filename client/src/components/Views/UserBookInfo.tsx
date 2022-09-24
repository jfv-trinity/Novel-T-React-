import React, { useContext, useEffect } from "react";
import "./UserBookInfo.scss";
import { displayChapters, displayModal } from "../../static/index";
import { useParams } from "react-router-dom";
import BookProps from "../../common/Book";
import { UserContext } from "../../static/UserContext";
import ChapterProps from "../../common/Chapters";
import { CreateChapterModal } from "../Modal/createChapter";
import UserProps from "../../common/User";
import LibraryProps from "../../common/Library";

function UserBookInfo() {
  const user = useContext(UserContext);
  const params = useParams();
  const [book, setBook] = React.useState<BookProps>();
  const [chapters, setChapters] = React.useState<any[]>([]);
  const [authorId, setAuthorId] = React.useState(Number);
  const [chapterTitle, setChapterTitle] = React.useState(String);
  const [context, setContext] = React.useState(String);
  const [bookId, setBookId] = React.useState(Number);
  let chapterAuthor = user?.id;
  let NewChapter: ChapterProps;
  let saveToLibrary: LibraryProps;

  function bookMark(
    book: BookProps,
    user: UserProps,
    bookTitle: string,
    bookId: number,
    userId: number
  ): void {
    let saveToLibrary = { bookTitle, bookId, userId };
    fetch(`${process.env.REACT_APP_URL}libraries/${book.id}/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveToLibrary),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response data: ", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   NewChapter = { chapterTitle, context, bookId, chapterAuthor };
  //   console.log("this is the information for new chapter", NewChapter);

  //   fetch(`${process.env.REACT_APP_URL}chapters`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(NewChapter),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("this is the data", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });

  //   console.log("post method was successful");
  // };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}books/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("this is the data for books", data);
        if (data) {
          setBook(data);
          setBookId(data.id);
          setAuthorId(data.authorId);
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
        console.log("this is the data for chapters", data);
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
      <button
        className={``}
        onClick={() =>
          bookMark(book!, user!, book?.bookTitle!, book?.id!, user?.id!)
        }
      >
        Bookmark
      </button>
      <hr />
      <br />
      <div>
        <img src="/static/emptybook.png" className="book-cover" />
        <div className="wrapper">
          <div className="details">
            <div className="row">
              <div className="book-attribute">title(s):</div>
              <div className="attribute-context">{book?.bookTitle}</div>
            </div>
            <div className="row">
              <div className="book-attribute">Genre(s): </div>
              {/* <div className="attribute-context">{book.genres}</div> */}
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
      <div>
        <h3>
          Book Chapters{" "}
          {user?.id == authorId ? (
            <CreateChapterModal user={user} isLoggedIn={true} book={book} />
          ) : null}
          <hr />
          {chapters && <div>{displayChapters(chapters, user!)}</div>}
        </h3>
      </div>
    </React.Fragment>
  );
}

export default UserBookInfo;
