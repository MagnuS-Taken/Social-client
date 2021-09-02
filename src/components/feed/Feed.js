import React, { useState, useEffect } from "react";
import axios from "axios";

import Share from "../share/Share";
import Post from "../post/Post";

export default function Feed({ flag, showShare, user }) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const resp =
        flag === 1
          ? await axios.get("/post/profile/" + user.username)
          : await axios.get("/post/timeline/" + user._id);

      setPost(
        resp["data"].sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };

    fetchPosts();
  }, [flag, user]);

  return (
    <div style={{ flex: "5" }}>
      {showShare ? <Share user={user} /> : ""}

      {post.map((p) => {
        return <Post key={p._id} post={p} userId={user._id} />;
      })}
    </div>
  );
}
