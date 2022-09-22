import * as React from "react";
import BookEntity from "../Container/Book";
import { useEffect } from "react";
import { UserContext } from "../../static/UserContext";
import UserProps from "../../common/User";
import { displayBooks } from "../../static";

function HomePage() {
  const numberOfNovelResults = 25;
  const [books, setBooks] = React.useState<any[]>([]);

  let user = React.useContext(UserContext)!;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/books/search/${numberOfNovelResults}`, {
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
        <h1>Recently Listed</h1>
        <div>{displayBooks(books)}</div>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
