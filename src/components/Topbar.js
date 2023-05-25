import "../App.css";
import Homepage from "./Homepage";
import Register from "./Register";
import EditPost from "./EditPost";
import Login from "./Login";
import Logout from "./Logout";
import Stamp from "./Stamp";
import Profile from "./Profile";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";

export default function Topbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    if (jwt) {
      try {
        const decoded = jwtDecode(jwt);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("jwtToken");
          setIsLoggedIn(false);
        }
      } catch (error) {
        localStorage.removeItem("jwtToken");
        setIsLoggedIn(false);
      }
    } else if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <div className="topbar-holder sticky-element">
        <div className="topbar">
          <Link to="/" className="title main prevent-select">
            mindStamp
          </Link>
          <nav className="topbar-list-holder">
            {isLoggedIn ? (
              <ul className="topbar-list">
                <li>
                  <Link to="/" className="title home">
                    mindStamp
                  </Link>
                </li>
                <span>/</span>
                <li>
                  <Link to="/profile">profile</Link>
                </li>
                <span>/</span>
                <li>
                  <Link to="/stamp">stamp</Link>
                </li>
                <span>/</span>
                <li>
                  <Link to="/logout">logout</Link>
                </li>
              </ul>
            ) : (
              <ul className="topbar-list">
                <li>
                  <Link to="/" className="title home">
                    mindStamp
                  </Link>
                </li>
                <span>/</span>
                <li>
                  <Link to="/register">register</Link>
                </li>
                <span>/</span>
                <li>
                  <Link to="/login">login</Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
      <Routes>
        <Route
          exact
          path="/"
          element={<Homepage isLoggedIn={isLoggedIn} />}
        ></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/stamp" element={<Stamp />}></Route>
        <Route
          exact
          path="/logout"
          element={<Logout isLoggedIn={isLoggedIn} />}
        ></Route>
        <Route
          exact
          path="/profile"
          element={<Profile isLoggedIn={isLoggedIn} />}
        ></Route>
        <Route
          exact
          path="/edit/:postId"
          element={<EditPost isLoggedIn={isLoggedIn} />}
        ></Route>
        {/* <Route exact path="/article/:articleId" element={<Blogs />}></Route>
        <Route exact path="/edit/:articleId" element={<EditBlog />}></Route>  */}
      </Routes>
    </BrowserRouter>
  );
}
