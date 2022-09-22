import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { previousPage } from "../../static/index";
import { UserContext } from "../../static/UserContext";
import ChapterProps from "../../common/Chapters";

function ChapterEditor() {
  const user = useContext(UserContext);
  const params = useParams();
  const [id, setId] = React.useState(Number);
  const [chapterTitle, setChapterTitle] = React.useState(String);
  const [context, setContext] = React.useState(String);
  const [bookId, setBookId] = React.useState(Number);
  let chapterAuthor = user?.id;
  let updatedChapter: ChapterProps;
  const navigate = useNavigate();

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updatedChapter = { id, chapterTitle, context, bookId, chapterAuthor };
    console.log("this is the information for updated chapter", updatedChapter);

    fetch(`${process.env.REACT_APP_URL}/chapter/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedChapter),
    });
    console.log("submitted getting ready to redirect");
    navigate(-1);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/chapter/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("this is the data for the individual chapter query", data);
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
      <form onSubmit={submitForm}>
        <h5>Chapter Editor</h5>
        <hr />
        <div className="form-group">
          <b>Chapter Title</b>
          <input
            type="text"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
          />

          {context && (
            <div>
              <b>Chapter Context</b>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Confirm changes
        </button>
        <button
          type="reset"
          className="btn btn-warning"
          onClick={() => location.reload()}
        >
          reset
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => previousPage()}
        >
          cancel
        </button>
      </form>
    </React.Fragment>
  );
}

export default ChapterEditor;
