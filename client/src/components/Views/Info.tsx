import React, { useEffect, useState } from "react";
import { UserContext } from "../../static/UserContext";

function Info() {
  // const { state }: UserProps = useLocation();
  const user = React.useContext(UserContext)!;
  return (
    <React.Fragment>
      <div>
        <h2>Work on me</h2>
        <h3> User Id: {user.id}</h3>
        <h3> User Email: {user.email}</h3>
        <h3> User Name: {user.username}</h3>
        <h3> User Password: {user.password}</h3>
      </div>
    </React.Fragment>
  );
}

export default Info;
