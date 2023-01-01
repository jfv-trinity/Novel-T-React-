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

  // const retrieveBook = (id: number) => {
  //   let path: string = `/Novel/${id}`;
  //   navigate(path, { state: { id: { id } } });
  // };

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
            <b>Author: {book?.authorUsername}</b>
            <b>Chapters: {}</b>
            <b>Status: {book?.status}</b>
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
