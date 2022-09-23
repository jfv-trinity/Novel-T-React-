import React, { useState } from "react";
import react, { useContext } from "react";
import "./BookCreation.scss";
import { previousPage } from "../../static/index";
import { UserContext } from "../../static/UserContext";
import BookProps from "../../common/Book";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GenreButton from "../Container/Genre";
import GenreProps from "../../common/Genres";

function BookCreation() {
  const user = useContext(UserContext);
  const formCheckBoxes = [
    "sci_fi",
    "fantasy",
    "romance",
    "action_adventure",
    "slice_of_life",
    "comedy",
    "tragedy",
    "mystery",
    "thriller",
    "horror",
    "isekai",
    "reincarnation",
    "transmigration",
    "historical",
    "military",
    "school",
    "spy",
    "martial_arts",
  ];

  const navigate = useNavigate();

  enum GENRES {
    sci_fi,
  }

  const [genres, setGenres] = useState<[]>([]);
  const [bookTitle, setBookTitle] = useState(String);
  const [summary, setSummary] = useState(String);
  const [image, setImage] = useState(String);

  const [bookId, setBookId] = useState(Number);
  const [sci_fi, setSci_fi] = useState(Boolean);
  const [fantasy, setFantasy] = useState(Boolean);
  const [romance, setRomance] = useState(Boolean);
  const [action_adventure, setAction_adventure] = useState(Boolean);
  const [slice_of_life, setSlice_of_life] = useState(Boolean);
  const [comedy, setComedy] = useState(Boolean);
  const [tragedy, setTragedy] = useState(Boolean);
  const [mystery, setMystery] = useState(Boolean);
  const [thriller, setThriller] = useState(Boolean);
  const [horror, setHorror] = useState(Boolean);
  const [isekai, setIsekai] = useState(Boolean);
  const [reincarnation, setReincarnation] = useState(Boolean);
  const [transmigration, setTransmigration] = useState(Boolean);
  const [historical, setHistorical] = useState(Boolean);
  const [military, setMilitary] = useState(Boolean);
  const [school, setSchool] = useState(Boolean);
  const [spy, setSpy] = useState(Boolean);
  const [martial_arts, setMartial_arts] = useState(Boolean);

  // var = add toggle to the button;

  let formCheckBoxMethods = [
    setSci_fi,
    setFantasy,
    setRomance,
    setAction_adventure,
    setSlice_of_life,
    setComedy,
    setTragedy,
    setMystery,
    setThriller,
    setHorror,
    setIsekai,
    setReincarnation,
    setTransmigration,
    setHistorical,
    setMilitary,
    setSchool,
    setSpy,
    setMartial_arts,
  ];

  let authorUsername = user?.username;
  let authorId = user?.id;
  let status = "Ongoing";
  let newBook: BookProps;

  // const passedMethods = "method" as React.Dispatch<
  //   React.SetStateAction<boolean>
  // >;

  const submitForm = (e: any) => {
    e.preventDefault();
    // let genre_object = new Array();

    let form = e.target;
    // const formData = new FormData(e.target),
    //   formDataObj = Object.fromEntries(formData.entries());
    console.log(fantasy, military, spy);
    // for (let i = 2; i < 20; i++) {
    //   console.log(form[i].defaultChecked);
    //   console.log(form[i].id);
    //   formCheckBoxMethods[i](form[i].defaultChecked);
    // }

    // console.log(e.target[2].defaultChecked);
  };
  //   newBook = {
  //     bookTitle,
  //     image,
  //     summary,
  //     status,
  //     authorId,
  //     authorUsername,
  //   };
  //   fetch(`/books`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newBook),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBookId(data.id);
  //       let bookGenres: GenreProps = {
  //         book_title: bookTitle,
  //         book_id: bookId,
  //         sci_fi,
  //         fantasy,
  //         romance,
  //         action_adventure,
  //         slice_of_life,
  //         comedy,
  //         tragedy,
  //         mystery,
  //         thriller,
  //         horror,
  //         isekai,
  //         reincarnation,
  //         transmigration,
  //         historical,
  //         military,
  //         school,
  //         spy,
  //         martial_arts,
  //       };
  //       fetch(`/bookgenres/create`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(bookGenres),
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log("data was reached", data);
  //         })
  //         .catch((error) => {
  //           console.error("Error:", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });

  //   // for item in formData => input value into GenreItem => add item into database
  // };

  // const submitForm = (e: any) => {
  //   e.preventDefault();
  //   newBook = {
  //     bookTitle,
  //     image,
  //     summary,
  //     status,
  //     authorId,
  //     authorUsername,
  //   };
  //   fetch(`/books`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newBook),
  //   });
  //   navigate("/AuthorListings");
  // };

  return (
    <React.Fragment>
      <Form onSubmit={submitForm} className="form">
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Book Title: </Form.Label>
          <Form.Control
            type="text"
            placeholder={""}
            onChange={(e) => setBookTitle(e.target.value)}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="summary">
          <Form.Label>Book Summary</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={" Describe your book to get your readers interested."}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Form.Group>
        <div className="container">
          <ul className="ks-cboxtags">
            {formCheckBoxes.map((genre, index) => {
              return (
                <div key={genre}>
                  <Form.Group className={index.toString()} controlId={genre}>
                    <GenreButton
                      id={genre}
                      onClick={formCheckBoxMethods[index]}
                    />
                  </Form.Group>
                </div>
              );
            })}
          </ul>
        </div>

        <Button type="submit" className="btn btn-primary">
          Create Book
        </Button>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Reset
        </Button>
        <Button variant="secondary" onClick={previousPage}>
          Cancel
        </Button>

        {/* {% for element in form_checkboxes %}
                <li><input type="checkbox" id={% print(element) %} name={% print(element) %} />
                <label for={% print(element) %}>{% print(element) %}</label></li>
          {% endfor %} */}
      </Form>
    </React.Fragment>
  );
}
export default BookCreation;
