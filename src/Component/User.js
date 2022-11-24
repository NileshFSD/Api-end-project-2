import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Edit from "./Edit";

const User = () => {
  const users = useOutletContext();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const userId = useParams();
  const id = Number(Object.values(userId)[0]);
  const otherId = Object.values(userId)[0];
  const user = users.find((user) => user.id === id || user.id === otherId);

  function handleClose(e) {
    navigate("/users");
  }

  function handleOpen(e) {
    e.preventDefault();
    setShow(false);
  }
  return (
    <div className="user-page">
      {show ? (
        <div>
          <div className="close-container">
            <AiOutlineCloseCircle className="close" onClick={handleClose} />
          </div>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <td>{user?.first_name}</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>{user?.last_name}</td>
              </tr>
              <tr>
                <th>Age</th>
                <td>{user?.age}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{user?.email}</td>
              </tr>

              <tr>
                <th>Company Name</th>
                <td>{user?.company_name}</td>
              </tr>

              <tr>
                <th>Website</th>
                <td>
                  <a target="blank" className="link" href={user?.web}>
                    Visit Website
                  </a>
                </td>
              </tr>

              <tr>
                <th>State</th>
                <td> {user?.state}</td>
              </tr>
              <tr>
                <th>City</th>
                <td> {user?.city}</td>
              </tr>

              <tr>
                <th>Zip Code</th>
                <td> {user?.zip}</td>
              </tr>
            </thead>
          </table>
          <div className="edit">
            <button className="edit-btn" onClick={handleOpen}>
              Edit{" "}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Edit
            setShow={setShow}
            show={show}
            toName={user?.first_name}
            toSurName={user?.last_name}
            toEmail={user?.email}
            toCompany={user?.company_name}
            toState={user?.state}
            toCity={user?.city}
            toWeb={user?.web}
            toAge={user?.age}
            toZip={user?.zip}
          />
        </div>
      )}
    </div>
  );
};

export default User;
