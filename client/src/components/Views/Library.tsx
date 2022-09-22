import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BookProps from "../../common/Book";
import UserProps from "../../common/User";
import { displayBooks, displayLibraryBooks } from "../../static";
import { UserContext } from "../../static/UserContext";
import BookEntity from "../Container/Book";

function Library() {
  // const { state }: UserProps = useLocation();
  const user = React.useContext(UserContext)!;
  const params = useParams();
  const [books, setBooks] = React.useState<any[]>([]);
  console.log("library user", user);

  // function bookMark(
  //   book: BookProps,
  //   user: UserProps,
  //   bookTitle: string,
  //   bookId: number,
  //   userId: number
  // ): void {
  //   let saveToLibrary = { bookTitle, bookId, userId };
  //   fetch(`${process.env.REACT_APP_URL}/libraries/${book.id}/${user.id}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(saveToLibrary),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("response data: ", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/libraries/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setBooks(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <h1>{user.username}'s Collection</h1>
        <div>{books ? displayLibraryBooks(books, user!) : null}</div>
      </div>
    </React.Fragment>
  );
}

export default Library;
