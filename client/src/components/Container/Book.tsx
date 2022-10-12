import React, { FC, useEffect, useState } from "react";
import BookProps from "../../common/Book";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BookDeletionModal } from "../Modal/BookDeletion";
import { UpdateBookModal } from "../Modal/updateBook";
import tempImage from "../../static/images/icon.png";
import "../Views/Home.scss";

const BookEntity: FC<BookProps> = ({
  id,
  bookTitle,
  image,
  MRchapter,
  Rchapter,
  summary,
  authorId,
  authorUsername,
  authorPenName,
  status,
  user,
  ...props
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const [authorization, setAuthorization] = useState(false);
  const navigate = useNavigate();

  let book: BookProps = {
    id,
    bookTitle,
    image,
    summary,
    status,
    authorId,
    authorUsername,
    authorPenName,
  };

  useEffect(() => {
    if (user?.id == authorId) {
      setAuthorization(true);
    }
  }, [user?.id, authorId]);

  // const retrieveBook = (id: number) => {
  //   let path: string = `/Novel/${id}`;
  //   navigate(path, { state: { id: { id } } });
  // };

  function retrieveBook(id: number) {
    navigate(`/Novel/${id}`);
  }

  return (
    <React.Fragment>
      <div className="novelContainer" onClick={() => retrieveBook(id!)}>
        <img src={tempImage} className="novelCover"></img>
        <div className="novelContext">
          <div className="novelTitle space">
            <b>{bookTitle}</b>
          </div>
          <div className="novelStats space">
            <b>Author: {authorUsername}</b>
            <b>Chapters: {}</b>
            <b>Status: {status}</b>
          </div>
          <div className="space">populate line with genres of novel</div>
          <div className="space">populate line novel's catcher</div>
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
              id={id!}
              show={showDelete}
              handleClose={() => setShowDelete(!showDelete)}
            />

            <UpdateBookModal
              id={id!}
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
