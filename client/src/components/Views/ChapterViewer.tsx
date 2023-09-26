import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import { BookProps } from "../../common/Book";
import ChapterProps from "../../common/Chapters";
import background from "../../static/images/Book-Loading.jpg";

function ChapterView() {
  
  const [chapter, setChapter] = React.useState<ChapterProps>();
  const [chapters, setChapters] = React.useState<any[]>([]);
  const params = useParams();
  const navigate = useNavigate();
  console.log("chapters: ", chapters);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}chapters/${params.bookId}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }) 
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        setChapters(data);
      }
    });
    fetch(`${process.env.REACT_APP_URL}chapters/${params.bookId}/${params.chapterNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setChapter(data[0]);
     
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
      <div className="title">
        <h1>{chapter?.bookTitle}</h1>
      </div>
      <div className="panel">
        <div className="details">{chapter?.context}</div>
      </div>
      {chapter && chapters.length > 0 ? (
        <div>
        {chapter.chapterNumber! > chapters[0].chapterNumber ? (
            <button
            onClick={() => {
              navigate(`/Chapter/${chapter.bookId}/${chapter.chapterNumber! - 1}`)
              window.location.reload();
            }}
          >
            Previous
          </button>
          ) : null}

          {chapter.chapterNumber! < chapters[chapters.length-1].chapterNumber ? (
            <button
            onClick={() => {
             
              navigate(`/Chapter/${chapter.bookId}/${chapter.chapterNumber! + 1}`)
              window.location.reload();
            }}
          >
            Next
          </button>
           ) : null} 

        </div>
      ) : null}
    </React.Fragment>
  );

 
}

export default ChapterView;
