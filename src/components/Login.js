import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();

  const handlePageRefresh = () => {
    window.location.reload();
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };
    fetch("http://localhost:8080/users/auth/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user), // converts JS object to JSON string
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("jwtToken", data.token);
        navigate("/profile");
        handlePageRefresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="form-outside">
      <section className="form-holder">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-breaker">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username..."
              autoComplete="off"
            ></input>
          </div>
          <div className="form-breaker">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
              autoComplete="off"
            ></input>
          </div>
          <div className="form-breaker buttons">
            <input
              className="form-submit -button"
              type="submit"
              value="Login"
            ></input>
          </div>
        </form>
      </section>
    </div>
  );
}
