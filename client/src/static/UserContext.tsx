import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import UserProps from "../common/User";
import { PropsWithChildren } from "react";

export const UserContext = createContext<UserProps | null>(null);

export const UserProvider: React.FC<PropsWithChildren<UserProps>> = ({
  children,
}) => {
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function LoginUser(data: any) {
    let data_serialized = JSON.stringify(data);
    setId(data["id"]);
    setUsername(data["username"]);
    setPassword(data["password"]);
    setEmail(data["email"]);
    setIsLoggedIn(true);
    localStorage.setItem("user", data_serialized);
  }

  // const value = useMemo(
  //   () => ({
  //     id,
  //     setId,
  //     email,
  //     setEmail,
  //     username,
  //     setUsername,
  //     password,
  //     setPassword,
  //   }),
  //   [id, email, username, password]

  return (
    <UserContext.Provider
      // value={value}
      value={{
        id,
        email,
        username,
        password,
        isLoggedIn,
        setId,
        setEmail,
        setUsername,
        setPassword,
        LoginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
