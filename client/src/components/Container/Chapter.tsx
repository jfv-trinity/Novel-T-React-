import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateChapterModal } from "../Modal/updateChapter";
import { ChapterDeletionModal } from "../Modal/ChapterDeletion";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import ChapterProps from "../../common/Chapters";

const ChapterEntity: FC<ChapterProps> = ({
  chapterTitle,
  context,
  bookId,
  id,
  chapterAuthor,
  chapterNumber,
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

  function retrieveChapter(bookId: number, chapterNumber: number) {
    navigate(`/Chapter/${bookId}/${chapterNumber}`);
  }

  return (
    <React.Fragment>
      <p className="chapter-link" onClick={() => retrieveChapter(bookId!, chapterNumber! )}>
        {chapterTitle}
      </p>
      <div className="chapter-options">
        {authorization ? (
          <React.Fragment>
            <MdModeEdit
              onClick={() => setshowEdit(!showEdit)}
              size="5em"
              color="red"
            />

            <UpdateChapterModal
              id={id!}
              show={showEdit}
              handleClose={() => setshowEdit(!showEdit)}
              book={book}
              chapter={chapter}
            />

            <MdDeleteForever
              onClick={() => setShowDelete(!showDelete)}
              size="5em"
              color="red"
            />

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
