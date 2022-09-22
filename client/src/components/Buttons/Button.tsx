import { BackdropProps } from "@mui/material";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  className?: string;
  onClick?: () => any;
  isDisabled?: boolean;
  id?: string;
};
const Button = (props: ButtonProps) => {
  return (
    <button
      className={props.className}
      onClick={() => {
        props.onClick!();
      }}
      disabled={props.isDisabled}
      id={props.id}
    >
      {props.text}
    </button>
  );
};

export { Button };
