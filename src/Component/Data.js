import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

const Data = () => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
      )
      .then((res) => setUsers(res.data));
  }, []);

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

  let userValue = [];

  for (let i = 0; i < profile.length; i++) {
    userValue.push(profile[i].data);
  }

  const data = users.concat(userValue);

  return (
    <div>
      <Outlet context={data} />
    </div>
  );
};

export default Data;
