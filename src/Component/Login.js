import { isEmpty } from "@firebase/util";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase/Firebase";

const Login = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const nameRef = useRef();

  useEffect(() => {
    const storeRef = query(collection(db, "users"), orderBy("created", "asc"));
    onSnapshot(storeRef, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const data = users.find((user) => {
    return user?.data.username === nameRef?.current.value;
  });

  function handleLogin(e) {
    e.preventDefault();

    const findUser = users.find((user) => {
      return user.data.first_name === userName;
    });

    const userNameRef = findUser?.data.first_name;

    const passwordRef = findUser?.data.password;

    if (isEmpty(findUser)) {
      alert("Invalid Input");
    } else if (userNameRef === userName) {
      if (passwordRef === password) {
        alert("Login Successfully");
        navigate("/users");
      } else {
        alert("wrong password");
      }
    } else {
      alert("wrong username");
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} method="post" className="login-form">
        <br />
        <label htmlFor="login-userName">Username </label>
        <input
          type="text"
          name="login-userName"
          id="login-userName"
          placeholder="Username"
          autoComplete="off"
          onChange={(e) => setUserName(e.target.value)}
          ref={nameRef}
        />
        <br />
        <label htmlFor="login-password">Password </label>
        <input
          type="password"
          name="login-password"
          id="login-password"
          placeholder="Registered Email"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br /> <br />
        <button type="submit" className="signIn-btn">
          Sign-In
        </button>
        <hr />
        <Link className="link" to="/signup">
          Yet not Registered?
        </Link>
      </form>
    </div>
  );
};

export default Login;
