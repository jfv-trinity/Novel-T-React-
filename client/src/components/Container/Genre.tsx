import React, { FC, useEffect, useState, Dispatch } from "react";
import ButtonProps from "../../common/Button";
const GenreButton: FC<ButtonProps> = ({ id, onClick, ...props }) => {
  const [checked, setChecked] = useState(false);

  return (
    <React.Fragment>
      <input
        type="checkbox"
        id={id}
        name={id}
        defaultChecked={checked}
        onChange={() => setChecked(!checked)}
        onClick={() => onClick!(!checked)}
      />
      <label htmlFor={id}>{id}</label>
    </React.Fragment>
  );
};

export default GenreButton;
