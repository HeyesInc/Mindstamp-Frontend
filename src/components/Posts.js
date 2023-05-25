import LikeDislikeButton from "./LikeDislikeButton";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

export default function Posts({ posts, postType }) {
  const postsReversed = posts.slice().reverse();

  return (
    <section>
      <div className="homepagePost-main">
        {postsReversed.map((post, i) => {
          const localDateTime = DateTime.fromISO(post.createdAt);
          const formattedDateTime = localDateTime.toLocaleString({
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return (
            <div key={i} className="homepagePost-individual">
              <div>
                <div>
                  <p className="-username">{post.username}</p>
                </div>
                <div>
                  <h2 className="homepagePost-text">{post.content}</h2>
                </div>

                <div>
                  <p>{formattedDateTime}</p>
                </div>
              </div>
              <LikeDislikeButton postId={post.id}></LikeDislikeButton>
              {postType === "Profile" ? (
                <Link to={"/edit/" + post.id} className="edit">
                  Edit
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
