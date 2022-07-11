import React, { useEffect, useState } from "react";
import MessageSender from "./MessageSender";
import "./Feed.css";
import Post from "./Post";
import db from "./firebase";
import DashedLine from "./DashedLine";

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  return (
    <div className="feed">
      {/* MessageSender */}
      <MessageSender />
      <DashedLine/>
      {posts.map((post) => (
        <Post
          key={post.id}
          profilePic={post.data.profilePic}
          message={post.data.message}
          timestamp={post.data.timestamp}
          username={post.data.username}
        />
      ))}
    </div>
  );
}

export default Feed;
