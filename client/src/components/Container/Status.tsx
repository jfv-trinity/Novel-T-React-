import React, { FC, useEffect, useState, Dispatch } from "react";
import ButtonProps from "../../common/Button";
import "../Modal/updateBook.scss";
import { stat } from "fs";
const StatusButton: FC<ButtonProps> = ({ id, onClick, ...props }) => {
  let status = props.currentStatus
  let checked;
  if(status == id){
    checked = true;
  }
  else{
    checked = false;
  }

  return (
    <React.Fragment>
      <input
        type="radio"
        id={id}
        name={"1"}
        defaultChecked={checked}
        onClick={() => onClick!(!id)}
      />
      <label  htmlFor={id}>{id}</label>
    </React.Fragment>
  );
};

export default StatusButton;
