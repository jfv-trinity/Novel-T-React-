import * as React from "react";
import BookEntity from "../Container/Book";
import { useEffect } from "react";
import { UserContext } from "../../static/UserContext";
import UserProps from "../../common/User";
import { displayBooks } from "../../static";
import background from "../../static/images/Personal-Library.jpg";
import { Helmet } from "react-helmet";

function HomePage() {
  const numberOfNovelResults = 25;
  const [books, setBooks] = React.useState<any[]>([]);

  let user = React.useContext(UserContext)!;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}books/search/${numberOfNovelResults}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("this is the data: ", data);
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
        <style>{`body { height: 100%; background-image: ${`url(${background});`} `}</style>
      </Helmet>
      <div className="container island">
        <h1 className="centerDisplay">Recently Listed</h1>
        <div className="container listingsContainer">
          <div>{displayBooks(books)}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
