import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import { BookProps } from "../../common/Book";
import ChapterProps from "../../common/Chapters";
import background from "../../static/images/Book-Loading.jpg";

// import {
//   retrieveNextChapter,
//   retrievePreviousChapter,
// } from "../../static/index";

function ChapterView() {
  const [book, setBook] = React.useState<BookProps>();
  const [chapter, setChapter] = React.useState<ChapterProps>();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}chapter/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("this is the data for chapter in chapter view", data);
        if (data) {
          setChapter(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (chapter)
      fetch(`${process.env.REACT_APP_URL}books/${chapter?.bookId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("this is the data for book in chapter view", data);
          if (data) {
            setBook(data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }, [chapter?.id]);

  return (
    <React.Fragment>
      <Helmet>
        <style>{`body {background-image: ${`url(${background}); overflow: auto;`} `}</style>
      </Helmet>
      <div className="title">
        <h1>{book?.bookTitle}</h1>
      </div>
      <div className="panel">
        <div className="details">{chapter?.context}</div>
      </div>
      {chapter ? (
        <div>
          <button
            onClick={() => {
              navigate(`/Chapter/${chapter.chapterNumber!}`);
              window.location.reload();
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              navigate(`/Chapter/${chapter.chapterNumber! + 1}`);
              window.location.reload();
            }}
          >
            Next
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );

  //

  return (
    <React.Fragment>
      <div className="centered">
        <h2>
          home / {book?.bookTitle} / {chapter?.chapterTitle}
        </h2>
        <hr />
        <div>
          <p>{chapter?.chapterTitle}</p>
          <hr />
          <p>{chapter?.context}</p>
        </div>
        {/* <button onClick={() => retrievePreviousChapter( chapter.id)}>
          Previous 
        </button>
      <button onClick={() => retrieveNextChapter({ chapter.id}!)}>
          Next 
        </button> */}
      </div>
    </React.Fragment>
  );
}

export default ChapterView;
