import React from "react";
import { Link } from "react-router-dom";
import img from "../Asset/group.png";
import { BsArrowRight } from "react-icons/bs";

const Home = () => {
  return (
    <div className="home">
      <div className="home-1">
        <h2>By the community, for the community</h2>
        <p>
          You need to understand your community, It’s your opportunity to help
          your community, join like minded community
        </p>
      </div>
      <div className="home-2">
        <div className="home-img">
          <img src={img} alt="Group-img" />
        </div>
        <div className="home-link">
          <Link className="link" id="register" to="/signup">
            Click here to register <BsArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
