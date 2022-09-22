import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChapterProps from "../../common/Chapters";
import { Button as MyButton } from "../Buttons/Button";
import { UpdateChapterModal } from "../Modal/updateChapter";
import Button from "react-bootstrap/Button";
import { ChapterDeletionModal } from "../Modal/ChapterDeletion";
const ChapterEntity: FC<ChapterProps> = ({
  chapterTitle,
  context,
  bookId,
  id,
  chapterAuthor,
  book,
  user,
  ...props
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const [authorization, setAuthorization] = useState(false);
  const navigate = useNavigate();

  let chapter = { id, chapterTitle, context, bookId, chapterAuthor };

  useEffect(() => {
    if (user?.id == chapterAuthor) {
      setAuthorization(true);
    }
  }, [user?.id, book?.authorId]);

  function retrieveChapter(id: number) {
    navigate(`/Chapter/${id}`);
  }

  return (
    <React.Fragment>
      <div>
        {/* <button
          type="button"
          className="chapter-link"
          onClick={() => retrieveChapter(id!)}
        >
          {chapterTitle}
        </button> */}
        {authorization ? (
          <React.Fragment>
            <Button variant="primary" onClick={() => setshowEdit(!showEdit)}>
              Edit
            </Button>

            <UpdateChapterModal
              id={id!}
              show={showEdit}
              handleClose={() => setshowEdit(!showEdit)}
            />

            <Button variant="danger" onClick={() => setShowDelete(!showDelete)}>
              Delete
            </Button>

            <ChapterDeletionModal
              id={id!}
              show={showDelete}
              handleClose={() => setShowDelete(!showDelete)}
            />
          </React.Fragment>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default ChapterEntity;
