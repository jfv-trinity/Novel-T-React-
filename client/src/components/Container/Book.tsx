import React, { FC, useEffect, useState } from "react";
import { BookProps, ContainerProps } from "../../common/Book";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BookDeletionModal } from "../Modal/BookDeletion";
import { UpdateBookModal } from "../Modal/updateBook";
import tempImage from "../../static/images/icon.png";

const BookEntity: FC<ContainerProps> = ({
  book,
  // id,
  // bookTitle,
  // image,
  // MRchapter,
  // Rchapter,
  // summary,
  // authorId,
  // authorUsername,
  // authorPenName,
  // status,
  ...props
}) => {

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const [authorization, setAuthorization] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (book?.user?.id == book?.authorId) {
      setAuthorization(true);
    } else {
      console.log(book?.user?.id, "/", book?.user?.id);
    }
  }, [book?.user?.id, book?.authorId]);

  function retrieveBook(id: number) {
    navigate(`/Novel/${id}`);
  }

  return (
    <React.Fragment>
      {/* <h1 className="centerDisplay">{props.containerHeader}</h1> */}
      <div className="novelContainer" onClick={() => retrieveBook(book?.id!)}>
        <img src={tempImage} className="novelCover"></img>
        <div className="novelContext">
          <div className="novelTitle space">
            <b>{book?.bookTitle}</b>
          </div>
          <div className="novelStats space">
            {/* <b>Chapters: {book?.numberOfChapters}</b> */}
            <b className="statPadding">Views:{book?.views} Temp #</b>
            <b className="statPadding">Rating: {book?.rating}Temp #</b>
            <b className="statPadding">Comments: {book?.commentCount}Temp #</b>
          </div>
          <div className="summary space"> {book?.summary} </div>
        </div>
      </div>
      <div>
        {authorization ? (
          <React.Fragment>
            <Button variant="primary" onClick={() => setshowEdit(!showEdit)}>
              Edit
            </Button>

            <Button variant="danger" onClick={() => setShowDelete(!showDelete)}>
              Delete
            </Button>

            <BookDeletionModal
              id={book?.id!}
              show={showDelete}
              handleClose={() => setShowDelete(!showDelete)}
            />

            <UpdateBookModal
              id={book?.id!}
              show={showEdit}
              handleClose={() => setshowEdit(!showEdit)}
            />
          </React.Fragment>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default BookEntity;
