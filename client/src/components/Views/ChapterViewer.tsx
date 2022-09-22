import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BookProps from "../../common/Book";
import ChapterProps from "../../common/Chapters";
import {
  retrieveNextChapter,
  retrievePreviousChapter,
} from "../../static/index";

function ChapterView() {
  const [book, setBook] = React.useState<BookProps>();
  const [chapter, setChapter] = React.useState<ChapterProps>();
  const params = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/chapter/${params.id}`, {
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
      fetch(`${process.env.REACT_APP_URL}/books/${chapter?.bookId}`, {
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
      <div className="centered">
        <h2>
          home / {book?.bookTitle} / {chapter?.chapterTitle}
        </h2>
        <hr />
        <div>
          <p>
            {book?.bookTitle} - {chapter?.chapterTitle}
          </p>
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
