import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

export default function Nav(props) {
  //uselocation gives the current component
  let location = useLocation();

  const logout =()=>{
    localStorage.removeItem('authToken');
  }
  //whenever location changes, the function inside useEffect will execute
  // useEffect(()=>{
  //   console.log(location.pathname);
  // },[location])
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/home"?"active":""}`}aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`}aria-current="page" to="/about">
                  About
                </Link>
              </li>
            </ul>
            {localStorage.getItem('authToken')?<Link className="btn btn-success mx-2" role="button" to="/" onClick={logout}>Logout</Link>:<Link className="btn btn-success mx-2" role="button" to="/">Login</Link>}
            
            <Link className="btn btn-success" role="button" to="/signup">Signup</Link>
            {props.searchBar?<form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>:""}
          </div>
        </div>
      </nav>
    </div>
  );
}

Nav.propTypes = { 
    title: PropTypes.string.isRequired, 
    searchBar: PropTypes.bool,
};

Nav.defaultProps ={
    title: 'Webname',
    searchBar: true
}