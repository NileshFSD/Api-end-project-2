import "../src/Styles/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Component/Home";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import Data from "./Component/Data";
import Users from "./Component/Users";
import Error from "./Component/Error";
import User from "./Component/User";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />

          <Route path="/users" element={<Data />}>
            <Route index path="/users" element={<Users />} />
            <Route path=":userId" element={<User />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
