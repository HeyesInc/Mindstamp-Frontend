import { Link } from "react-router-dom";
import LikeDislikeButton from "./LikeDislikeButton";

export default function ProfilePosts({ posts }) {
  const postsReversed = posts.slice().reverse();
  return (
    <section>
      <div className="homepagePost-main">
        {postsReversed.map((post, i) => {
          return (
            <div key={i} className="homepagePost-individual">
              <div>
                <div>
                  <h2 className="homepagePost-text">{post.content}</h2>
                </div>
                <div className="homepagePost-text">
                  <div>
                    <p className="-username">{post.username}</p>
                  </div>
                </div>
              </div>
              <LikeDislikeButton postId={post.id}></LikeDislikeButton>
              <Link to={"/edit/" + post.id} className="edit">
                Edit
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
