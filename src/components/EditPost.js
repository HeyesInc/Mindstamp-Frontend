import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost({ isLoggedIn }) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { postId } = useParams();

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`/posts/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setContent(result.content);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/");
    }
  }, [isLoggedIn, postId, navigate]);

  const handleDelete = () => {
    fetch(`/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then(() => navigate("/profile"))
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { content };
    fetch(`/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then(() => navigate("/profile"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-outside">
      <section className="form-holder">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-breaker">
            <textarea
              type="text"
              id="body"
              name="body"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              autoComplete="off"
            ></textarea>
          </div>
          <div className="form-breaker buttons">
            <input className="form-submit -button" type="submit"></input>
            <input
              value="Delete"
              onClick={handleDelete}
              className="form-delete -button"
              type="button"
            ></input>
          </div>
        </form>
      </section>
    </div>
  );
}
