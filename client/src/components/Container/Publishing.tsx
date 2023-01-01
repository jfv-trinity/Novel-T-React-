import React, { FC, useEffect, useState } from "react";
import { BookProps, ContainerProps } from "../../common/Book";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BookDeletionModal } from "../Modal/BookDeletion";
import { UpdateBookModal } from "../Modal/updateBook";
import tempImage from "../../static/images/icon.png";
import "../Views/Home.scss";
import { MdDeleteForever, MdModeEdit, MdPageview } from "react-icons/md";

const PublishingEntity: FC<ContainerProps> = ({ book, user, ...props }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const [authorization, setAuthorization] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id == book?.authorId) {
      setAuthorization(true);
    } else {
      console.log(user?.id, "/", book?.authorId);
    }
  }, [user?.id, book?.authorId]);

  // const retrieveBook = (id: number) => {
  //   let path: string = `/Novel/${id}`;
  //   navigate(path, { state: { id: { id } } });
  // };

  function retrieveBook(id: number) {
    navigate(`/Novel/${id}`);
  }

  return (
    <React.Fragment>
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
      <div className="novelOptions">
        {authorization ? (
          <React.Fragment>
            {/* <Button variant="primary" onClick={() => setshowEdit(!showEdit)}>
                Edit
              </Button> */}
            <MdModeEdit
              onClick={() => setshowEdit(!showEdit)}
              size="5em"
              color="red"
            />

            <MdPageview size="5em" color="red" />

            <MdDeleteForever
              onClick={() => setShowDelete(!showDelete)}
              size="5em"
              color="red"
            />
            {/* <Button
                variant="danger"
                onClick={() => setShowDelete(!showDelete)}
              >
                Delete
              </Button> */}

            <BookDeletionModal
              id={book?.id!}
              show={showDelete}
              handleClose={() => setShowDelete(!showDelete)}
            />

            <UpdateBookModal
              id={book?.id!}
              book={book}
              show={showEdit}
              handleClose={() => setshowEdit(!showEdit)}
            />
          </React.Fragment>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default PublishingEntity;
