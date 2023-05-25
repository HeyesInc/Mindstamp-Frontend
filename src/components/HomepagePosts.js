import LikeDislikeButton from "./LikeDislikeButton";
export default function HomepagePosts({ posts }) {
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
