import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Edit = ({
  toSurName,
  toName,
  toEmail,
  toState,
  toCity,
  toCompany,
  toWeb,
  toZip,
  toAge,
  setShow,
}) => {
  const [first_name, setFirst_name] = useState(toName);
  const [email, setEmail] = useState(toEmail);
  const [last_name, setLast_name] = useState(toSurName);
  const [company_name, setCompany_name] = useState(toCompany);
  const [city, setCity] = useState(toCity);
  const [zip, setZip] = useState(toZip);
  const [web, setWeb] = useState(toWeb);
  const [age, setAge] = useState(toAge);
  const [state, setState] = useState(toState);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const storeRef = query(collection(db, "users"), orderBy("created", "asc"));
    onSnapshot(storeRef, (snapshot) => {
      setProfile(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const id = profile.filter((user) => {
    return user.data.first_name === first_name;
  })[0]?.id;

  // console.log(find);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateDocRef = doc(db, "users", id);

    try {
      await updateDoc(updateDocRef, {
        first_name,
        last_name,
        email,
        age,
        company_name,
        web,
        state,
        city,
        zip,
      });
    } catch (error) {
      alert(error);
    }

    setShow(true);
  };

  function handleClose(e) {
    e.preventDefault();
    setShow(true);
  }

  return (
    <div className="update">
      <div className="update-container">
        <div className="close-container">
          {" "}
          <AiOutlineCloseCircle className="close" onClick={handleClose} />
        </div>
        <form className="update-form" method="post" onSubmit={handleUpdate}>
          <label htmlFor="first-name">First Name </label>
          <input
            type="text"
            name="first-name"
            placeholder="First Name"
            id="edit-name"
            onChange={(e) => setFirst_name(e.target.value)}
            value={first_name}
            autoComplete="off"
          />
          <br />
          <label htmlFor="last-name">Last Name </label>
          <input
            type="text"
            name="last-name"
            placeholder="Last Name"
            id="last-name"
            onChange={(e) => setLast_name(e.target.value)}
            value={last_name}
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
            value={email}
          />
          <br />
          <label htmlFor="company">Company Name </label>
          <input
            type="text"
            name="company"
            id="company"
            placeholder="Company Name"
            onChange={(e) => setCompany_name(e.target.value)}
            value={company_name}
          />
          <br />
          <label htmlFor="age">Age </label>
          <input
            type="number"
            name="age"
            id="age"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
          <br />
          <label htmlFor="city">State</label>
          <input
            type="text"
            name="state"
            id="city"
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
            value={state}
          />{" "}
          <br />
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />{" "}
          <br />
          <label htmlFor="web">Web </label>
          <input
            type="text"
            name="web"
            id="web"
            placeholder="Web"
            onChange={(e) => setWeb(e.target.value)}
            value={web}
          />
          <br />
          <label htmlFor="zip">zip </label>
          <input
            type="number"
            name="zip"
            id="zip"
            placeholder="Zip code"
            onChange={(e) => setZip(e.target.value)}
            value={zip}
          />
          <br />
          <button type="submit" className="signup-btn">
            Save
          </button>
          <div></div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
