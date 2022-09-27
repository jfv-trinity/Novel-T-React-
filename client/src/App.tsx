import { useState, ChangeEvent, FormEvent } from "react";
import { ReactComponent as Logo } from "./logo.svg";
import { getData } from "./utils/data-utils";
import FormInput from "./components/form-input/form-input";
import React, { useContext, useEffect } from "react";
import "./App.scss";
import { Button } from "./components/Buttons/Button";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Views/Home";
import LoginPage from "./components/Views/Login";
import RegisterPage from "./components/Views/Register";
import Navbar from "./components/Navbar/Navbar";
import UserProfile from "./components/Views/UserProfile";
import Library from "./components/Views/Library";
import AuthorListings from "./components/Views/AuthorListings";
import BookEditor from "./components/Views/BookEditor";
import ChapterView from "./components/Views/ChapterViewer";
import ChapterEditor from "./components/Views/ChapterEditor";
import { UserContext } from "./static/UserContext";
import LogOut from "./components/Views/LogOut";
import UserProps from "./common/User";
import { ExampleContext } from "./static/ExampleContext";
import AnonBookPage from "./components/Views/AnonBookInfo";
import UserBookPage from "./components/Views/UserBookInfo";
import BookCreation from "./components/Views/BookCreation";
import Contact from "./components/Views/Contact";

function App() {
  const user = React.useContext(UserContext)!;
  const { LoginUser } = React.useContext(UserContext)!;
  useEffect(() => {
    if (!user.isLoggedIn) {
      if (localStorage.getItem("user") != null) {
        var storedUser = JSON.parse(localStorage.getItem("user")!);
        LoginUser(storedUser);
        console.log("user signed in", user);
      }
    }
  });

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="context">
          <Routes>
            {/* any routes below this lines are unfinished due to either backend or frontend */}
            <Route path="/" element={<HomePage />} />
            <Route path="/addbook" element={<BookCreation />} />
            <Route path="HomePage" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="Profile" element={<UserProfile />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="MyLibrary/:id" element={<Library />} />
            <Route path="Novel/Listings" element={<HomePage />} />
            <Route path="AuthorListings/:id" element={<AuthorListings />} />
            <Route
              path="Novel/:id"
              element={65 > 5 ? <UserBookPage /> : <AnonBookPage />}
            />
            <Route path="Contact" element={<Contact />} />
            {/* <Route
                path="Novel/:id"
                element={<AnonBookPage />}
                // if user is autheticated -> element={<AuthorBookInfo />}
                // else -> element={<AnonBookInfo/>}
              /> */}
            <Route path="Novel/:id/edit" element={<BookEditor />} />
            <Route path="Novel/:id/delete" element={<UserProfile />} />
            {/* delete route redirects to API instead of calling an element */}
            <Route path="Chapter/:id" element={<ChapterView />} />
            <Route path="Chapter/:id/delete" element={<UserProfile />} />
            {/* delete route redirects to API instead of calling an element */}
            <Route path="Chapter/:id/edit" element={<ChapterEditor />} />
          </Routes>

          {/* <Button text="testing the button" type="btnPrimary" />
          <Button text="this should change" /> */}
        </div>
      </div>
    </Router>
    // <div className="App-header">
    //   <div className="card">
    //     <Logo className="logo" />
    //     <h2>Sign In</h2>
    //   </div>
    // </div>
  );
}

export default App;
