import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BookProps } from "../../common/Book";
import UserProps from "../../common/User";
import { displayBooks, displayLibraryBooks } from "../../static";
import { UserContext } from "../../static/UserContext";
import BookEntity from "../Container/Book";
import background from "../../static/images/Personal-Library.jpg";
import { Helmet } from "react-helmet";
import "./Library.scss";

function Library() {
  // const { state }: UserProps = useLocation();
  const user = React.useContext(UserContext)!;
  const params = useParams();
  const [books, setBooks] = React.useState<any[]>([]);
  console.log("library user", user);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}libraries/${params.id}`, {
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
      <Helmet>
        <style>{`body { background-image: ${`url(${background});`} `}</style>
      </Helmet>
      <div className="collection-component">
        <h1>{user.username}'s Collection</h1>
        <h2 className="style-seven">
          <span></span>
        </h2>
        <div className="grid">
          {books ? displayLibraryBooks(books, user!) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Library;
