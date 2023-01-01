import React, { FC, useEffect, useState } from "react";
import { BookProps } from "../../common/Book";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BookDeletionModal } from "../Modal/BookDeletion";
import { UpdateBookModal } from "../Modal/updateBook";
import LibraryProps from "../../common/Library";
import UserProps from "../../common/User";
// temp image is later replaced by the book.image variable
import tempimage from "../../static/images/Book-Loading.jpg";

const LibraryEntity: FC<LibraryProps> = ({
  id,
  bookTitle,
  image,
  MRchapter,
  Rchapter,
  bookId,
  userId,
  user,
  ...props
}) => {
  const navigate = useNavigate();

  function bookMark(bookTitle: string, bookId: number, userId: number): void {
    let saveToLibrary = { bookTitle, bookId, userId };
    fetch(`${process.env.REACT_APP_URL}libraries/${bookId}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveToLibrary),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response data: ", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function retrieveBook(id: number) {
    navigate(`/Novel/${id}`);
  }

  return (
    <React.Fragment>
      <div
        className="library-novel-object"
        onClick={() => retrieveBook(bookId!)}
      >
        <img
          src={tempimage}
          height="50"
          width="50"
          className="book-cover"
        ></img>
        <b className="cover-title">{bookTitle}</b>
      </div>
    </React.Fragment>
  );
};

export default LibraryEntity;
