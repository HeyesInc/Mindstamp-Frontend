import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function LikeDislikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    fetch("/posts/" + postId + "/interactions", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDislikes(data.dislikeCount);
        setLikes(data.likeCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  const handlePageRefresh = () => {
    window.location.reload();
  };

  const handleLike = () => {
    fetch("/posts/" + postId + "/like", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLikes(data.likeCount);
        setDislikes(data.dislikeCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDislike = () => {
    fetch("/posts/" + postId + "/dislike", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLikes(data.likeCount);
        setDislikes(data.dislikeCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button className="hidden-button" onClick={handleLike}>
        <ThumbUpIcon
          sx={{
            color: "white",
            "&:hover": { color: "#358cb7" },
          }}
        />
      </button>
      <span>{likes}</span>
      <button className="hidden-button" onClick={handleDislike}>
        <ThumbDownIcon
          sx={{
            color: "white",
            "&:hover": { color: "#358cb7" },
          }}
        />
      </button>
      <span>{dislikes}</span>
    </div>
  );
}
