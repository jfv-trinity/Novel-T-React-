import React, { FC, useEffect, useState } from "react";
import BookProps from "../../common/Book";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BookDeletionModal } from "../Modal/BookDeletion";
import { UpdateBookModal } from "../Modal/updateBook";

const BookEntity: FC<BookProps> = ({
  id,
  bookTitle,
  image,
  MRchapter,
  Rchapter,
  summary,
  authorId,
  authorUsername,
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
      <div onClick={() => retrieveBook(id!)}>
        <img src={image} height="50" width="50" className="book-cover"></img>
        <b>{bookTitle}</b> - Author:{authorUsername}
        <p>The book id is: {id}</p>
        <p>The author id is: {authorId}</p>
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
