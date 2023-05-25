import ProfilePosts from "./ProfilePosts";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ isLoggedIn }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      fetch("/users/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setPosts(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div className="width">
      <ProfilePosts posts={posts} />
    </div>
  );
}
