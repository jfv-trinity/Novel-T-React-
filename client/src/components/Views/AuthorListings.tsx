import React, { useContext, useEffect, useState } from "react";
import "./AuthorListings.scss";
import { displayPublishedBooks } from "../../static/index";
import BookEntity from "../Container/Book";
import { UserContext } from "../../static/UserContext";
import { useNavigate } from "react-router-dom";
import { CreateBookModal } from "../Modal/createBook";
import { useParams } from "react-router-dom";

function AuthorListings() {
  const user = useContext(UserContext);
  const params = useParams();
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}books/search/author/${params.id}`, {
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
        <h1>{user?.username}&apos;s Listings </h1>
        <h2>
          <span>
            <CreateBookModal user={user} isLoggedIn={true} />
          </span>
        </h2>
        <div className="container publishingContainer">
          {books && <div>{displayPublishedBooks(books, user!)}</div>}
        </div>
      </div>
    </React.Fragment>
  );
}

export default AuthorListings;
