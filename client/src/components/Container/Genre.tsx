import React, { FC, useEffect, useState, Dispatch } from "react";
import ButtonProps from "../../common/Button";
const GenreButton: FC<ButtonProps> = ({ id, onClick, ...props }) => {
  const [checked, setChecked] = useState(false);

  return (
    <React.Fragment>
      <li>
        <input
          type="checkbox"
          id={id}
          name={id}
          defaultChecked={checked}
          onChange={() => setChecked(!checked)}
          onClick={() => onClick!(true)}
        />
        <label htmlFor={id}>{id}</label>
      </li>
    </React.Fragment>
  );
};

export default GenreButton;
