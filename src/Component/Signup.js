import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase/Firebase";

const Signup = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [lastName, setLastName] = useState();
  const [company, setCompany] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [web, setWeb] = useState();
  const [age, setAge] = useState();
  const [state, setState] = useState();
  const navigate = useNavigate();

  const uid = Math.random().toString(36).substring(2, 9);

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

  const checkUsername = users.map((user) => {
    return user?.data.username;
  });

  const checkEmail = users.map((user) => {
    return user?.data.email;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkUsername.includes(name)) {
      alert("please choose another username");
    } else if (checkEmail.includes(email)) {
      alert("this email already registered");
    } else {
      try {
        await addDoc(collection(db, "users"), {
          first_name: name,
          last_name: lastName,
          password: email,
          company_name: company,
          email: email,
          city: city,
          zip: zip,
          web: web,
          age: age,
          state: state,
          created: Timestamp.now(),
          id: uid,
        });

        setTimeout(() => {
          alert("Registration done, we are redirecting you to on user page");
          navigate("/login");
        }, 1000);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" method="post" onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name </label>
        <input
          type="text"
          name="first-name"
          placeholder="First Name"
          id="first-name"
          onChange={(e) =>
            setName(
              e.target.value.slice(0, 1).toUpperCase() + e.target.value.slice(1)
            )
          }
          required
          autoComplete="off"
        />
        <br />
        <label htmlFor="last-name">Last Name </label>
        <input
          type="text"
          name="last-name"
          placeholder="Last Name"
          id="last-name"
          onChange={(e) => setLastName(e.target.value)}
          required
          autoComplete="off"
        />
        <br />
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <br />
        <label htmlFor="company">Company Name </label>
        <input
          type="text"
          name="company"
          id="company"
          placeholder="Company Name"
          onChange={(e) => setCompany(e.target.value)}
          autoComplete="off"
        />
        <br />
        <label htmlFor="age">Age </label>
        <input
          type="number"
          name="age"
          id="age"
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <br />
        <label htmlFor="city">State</label>
        <input
          type="text"
          name="state"
          id="city"
          placeholder="State"
          onChange={(e) => setState(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="web">Web </label>
        <input
          type="text"
          name="web"
          id="web"
          placeholder="Web"
          onChange={(e) => setWeb(e.target.value)}
          autoComplete="off"
        />
        <br />
        <label htmlFor="zip">zip </label>
        <input
          type="number"
          name="zip"
          id="zip"
          placeholder="Zip code"
          onChange={(e) => setZip(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="signup-btn">
          Sign-Up
        </button>
        <div>
          <hr />

          <span>Already have an account?</span>

          <Link className="link" to="/login">
            <strong> Login</strong>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
