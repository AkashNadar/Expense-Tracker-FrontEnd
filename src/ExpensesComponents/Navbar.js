import React from "react";
import { Link, useParams } from "react-router-dom";

function Navbar() {

  const params = useParams();

  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">ExpenseTracker-App</Link>
        <div className="d-flex">
          <Link className="btn btn-outline-success" to="/login">Login</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
