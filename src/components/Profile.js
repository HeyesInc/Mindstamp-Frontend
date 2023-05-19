import ProfilePosts from "./ProfilePosts";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ isLoggedIn }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      fetch("http://localhost:8080/users/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setPosts(result);
        });
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="width">
      <ProfilePosts posts={posts} />
    </div>
  );
}
