import React, { useContext, useEffect } from "react";
import "./UserBookInfo.scss";
import { displayChapters, displayModal } from "../../static/index";
import { useParams } from "react-router-dom";
import { BookProps } from "../../common/Book";
import { UserContext } from "../../static/UserContext";
import ChapterProps from "../../common/Chapters";
import { CreateChapterModal } from "../Modal/createChapter";
import UserProps from "../../common/User";
import LibraryProps from "../../common/Library";
import { RiBookMarkFill, RiBookLine } from "react-icons/ri";
import background from "../../static/images/Book-Loading.jpg";
import { Helmet } from "react-helmet";

function UserBookInfo() {
  const user = useContext(UserContext);
  const params = useParams();
  const [book, setBook] = React.useState<BookProps>();

  const [isBookMarked, setBookMark] = React.useState(false);
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
    fetch(`${process.env.REACT_APP_URL}libraries/${user.id}/${book.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveToLibrary),
    })
      .then((response) => response.json())
      .then((data) => {
        setBookMark(!isBookMarked);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  //fetching to check bookmarked status
  useEffect(() => {
    if (user?.id && book?.id) {
      fetch(`${process.env.REACT_APP_URL}libraries/${user?.id}/${book?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setBookMark(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [user?.id, book?.id]);

  //fetching book details using url variable
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}books/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setBook(data);
          setBookId(data.id);
          setAuthorId(data.authorId);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //fetching chapters of book using url variable
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
      <Helmet>
        <style>{`body {background-image: ${`url(${background}); overflow: auto;`} `}</style>
      </Helmet>
      {isBookMarked == true ? (
        <RiBookMarkFill
          onClick={() =>
            bookMark(book!, user!, book?.bookTitle!, book?.id!, user?.id!)
          }
        />
      ) : (
        <RiBookLine
          onClick={() =>
            bookMark(book!, user!, book?.bookTitle!, book?.id!, user?.id!)
          }
        />
      )}
      <div className="title">
        <h1>{book?.bookTitle}</h1>
      </div>
      <div className="panel">
        <div className="details">
          <div className="book-attributes">
            <div className="attribute-row">
              <div className="book-attribute">Status </div>
              <div className="attribute-context">{book?.status}</div>
            </div>
            <div className="attribute-row">
              <div className="book-attribute">Author: </div>
              <div className="attribute-context">{book?.authorUsername}</div>
            </div>
            <div className="attribute-row">
              <div className="book-attribute">Genre(s): </div>
              {/* <div className="attribute-context">{book.genres}</div> */}
            </div>
            <div className="ratings">
              <div className="attribute-row">
                <div className="book-attribute">rank: </div>
                <div className="attribute-context">N/A</div>
              </div>
              <div className="attribute-row">
                <div className="book-attribute">rating: </div>
                <div className="attribute-context">N/A</div>
              </div>
            </div>
          </div>
        </div>
        <div className="novel-summary">
          <h3> Novel Summary </h3>
          <hr />
          <p style={{ textAlign: "center" }}>{book?.summary}</p>
        </div>
        <div className="novel-chapters">
          <h3>
            Book Chapters{" "}
            {user?.id == authorId ? (
              <CreateChapterModal user={user} isLoggedIn={true} book={book} />
            ) : null}
            <hr />
            {chapters && book && (
              <div className="chapter-list">
                {displayChapters(chapters, user!, book)}
              </div>
            )}
          </h3>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserBookInfo;
