import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Users = () => {
  const data = useOutletContext();
  const [sort, setSort] = useState("");

  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 25;
  const pageVisited = pageNumber * userPerPage;
  const [search, setSearch] = useState("");
  const [find, setFind] = useState();

  if (sort === "") {
    data.sort((a, b) => a.id - b.id);
  } else if (sort === "asc") {
    data.sort((a, b) => (b.first_name > a.first_name ? -1 : 1));
  } else if (sort === "dec") {
    data.sort((a, b) => (a.first_name > b.first_name ? -1 : 1));
  }

  function handleSearch(e) {
    e.preventDefault();
    setFind(
      data.find((item) => {
        return item.first_name === search;
      })
    );
  }

  const displayUsers = data
    .slice(pageVisited, pageVisited + userPerPage)
    .map((user, index) => {
      return (
        <tr key={user.id}>
          <td>{user?.id}</td>
          <td>{user?.first_name}</td>

          <td>
            <Link className="link" to={`/users/${user.id}`}>
              {" "}
              View{" "}
            </Link>
          </td>
        </tr>
      );
    });

  const pageCount = Math.ceil(data.length / userPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="users-data">
      <div className="user-sort-logout">
        <div className="sort-logout">
          <div className="sort">
            <select
              className="select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value={""}>Default</option>
              <option value="asc">Ascending</option>
              <option value="dec">Descending</option>
            </select>
          </div>
          <div className="log-out-container">
            <button className="logOut-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="user-data-handler">
        <div className="search-container">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search......"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            <FaSearch style={{ marginLeft: "1rem" }} />
          </button>
        </div>
      </div>
      <div>
        <table border="5">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>First Name</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {find === undefined ? (
              displayUsers
            ) : (
              <>
                <tr key={find?.id}>
                  <td>{find?.id}</td>
                  <td>{find?.first_name}</td>

                  <td>
                    <Link className="link" to={`/users/${find.id}`}>
                      {" "}
                      View{" "}
                    </Link>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="paginate">
        <ReactPaginate
          previousLabel={`Previous`}
          nextLabel={`Next`}
          breakLabel={`...`}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          onPageChange={changePage}
          containerClassName="pagination justify-content-center margin-bottom"
          pageClassName="page-items"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Users;
