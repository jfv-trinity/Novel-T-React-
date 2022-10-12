import React, { createContext, ReactElement, useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import * as careTaker from "./images/Notification-Icon-CareTaker.jpg";
import NotificationProps from "../common/Notification";
import { PropsWithChildren } from "react";

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

// const handleNotification = () => {
//   Store.addNotification({
//     content: myNotification,
//     container: "bottom-right",
//     insert: "bottom",
//     animationIn: ["animated", "fadeIn"],
//     animationOut: ["animated", "fadeOut"],

//     dismiss: {
//       //20 seconds
//       duration: 20000,
//       //no icon??
//       showIcon: true,
//     },

//     width: 400,
//   });
// };

const background: any = careTaker.default;

export const NotificationContext = createContext<NotificationProps>({
  context: "Generic context provided",
  src: { background },
});

export const NotificationProvider: React.FC<
  PropsWithChildren<NotificationProps>
> = ({ children }) => {
  function MyNotification(context: string, avatar: string) {
    return (
      <div className="NotificationContainer">
        <img className="Icon" src={avatar}></img>
        <p className="Context">{context}</p>
      </div>
    );
  }
  //avatar Paramater of MyNotification
  enum Avatars {
    elf,
    nazghoul,
  }

  function GetAvatarImage(avatar: Avatars): string {
    switch (avatar) {
      case Avatars.elf:
        return careTaker.default;
      default: {
        return careTaker.default;
      }
    }
  }

  //context paramater of MyNotification
  enum Errors {
    login,
    bookCreation,
    chapterCreation,
    profileCreation,
    editComplete,
    logout,
  }

  function GetErrorMessage(Error: Errors): string {
    switch (Error) {
      case Errors.login:
        return "It seems you can't come in. See if trying again works or become a member if you haven't already.";
      case Errors.bookCreation:
        return "There are a few issues with your book form. Let me help you with that. Please change or fill in where i have marked on the form.";
      case Errors.chapterCreation:
        return "There are a few issues with your chapter form. I can help with that. Please change or fill in where i have marked on the form.";
      case Errors.profileCreation:
        return "There are a few issues with your account form. If you change what i've highlighted i can submit it.";
      case Errors.editComplete:
        return "";
      case Errors.logout:
        return "";
      default: {
        return careTaker.default;
      }
    }
  }

  function HandleNotification(MyNotification: any) {
    Store.addNotification({
      content: MyNotification,
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
  }

  return (
    <NotificationContext.Provider
      value={{
        MyNotification,
        HandleNotification,
        GetAvatarImage,
        GetErrorMessage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
