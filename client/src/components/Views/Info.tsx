import React, { useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import "./animation.scss";
import "react-notifications-component/dist/theme.css";
import "./info.scss";
import * as careTaker from "../../static/images/Notification-Icon-CareTaker.jpg";

function Info() {
  // useEffect(() => {
  //   if (Notification.permission != "granted") {
  //     Notification.requestPermission().then(
  //       (response: NotificationPermission) => {
  //         if (response === "granted") {
  //           const notify = new Notification("this is the title");
  //         }
  //       }
  //     );
  //   }
  // }, []);

  // const handleNotification = () => {
  //   Store.addNotification({
  //     title: "Error",
  //     message: "this is the message",
  //     type: "success",
  //     container: "bottom-right",
  //     insert: "top",
  //     animationIn: ["animated", "fadeIn"],
  //     animationOut: ["animated", "fadeOut"],

  //     dismiss: {
  //       duration: 2000,
  //       showIcon: true,
  //     },

  //     width: 300,
  //   });
  // };

  const handleNotification = () => {
    Store.addNotification({
      content: MyNotify,
      container: "bottom-right",
      insert: "bottom",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],

      dismiss: {
        //20 seconds
        duration: 20000,
        //no icon??
        showIcon: true,
      },

      width: 400,
    });
  };

  // const sendNotification = () => {
  //   const myNotification = new Notification("Invalid Sign-in", {
  //     body: "Something went wrong while signing in. Please try again.",
  //     icon: "http://localhost:3000/static/media/icon.9d461358e6c7fe488e4b.png",
  //     image:
  //       "http://localhost:3000/static/media/CareTaker.fc62a49006de2ff50d69.jpg",
  //   });
  //   myNotification.onclick = (event: Event) => {
  //     console.log(event);
  //   };
  // };

  return (
    <React.Fragment>
      <div>
        {/* <button className="btn btn-primary" onClick={sendNotification}>
          Test Notification
        </button> */}
        <button onClick={handleNotification}> Default </button>
      </div>
    </React.Fragment>
  );
}

function MyNotify() {
  return (
    <div className="NotificationContainer">
      <img className="Icon" src={careTaker.default}></img>
      <p className="Context">
        {" "}
        You failed to sign in. Please try again. There might be a problem with
        your username or password. Okay, im exhausted...
      </p>
    </div>
  );
}

export default Info;
