import React, { FC, useEffect, useState } from "react";
import BookProps from "../../common/Book";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BookDeletionModal } from "../Modal/BookDeletion";
import { UpdateBookModal } from "../Modal/updateBook";
import LibraryProps from "../../common/Library";
import UserProps from "../../common/User";

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
    fetch(`/libraries/${bookId}/${userId}`, {
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
      <div onClick={() => retrieveBook(bookId!)}>
        <img src={image} height="50" width="50" className="book-cover"></img>
        <b>{bookTitle}</b>
      </div>
      <div>
        <button
          className={``}
          onClick={() => bookMark(bookTitle!, bookId!, user?.id!)}
        >
          Bookmark
        </button>
      </div>
    </React.Fragment>
  );
};

export default LibraryEntity;
