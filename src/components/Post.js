import { Avatar } from "@material-ui/core";
import React from "react";
import "../css/Post.css";

function Post({ profilePic, username, timestamp, message }) {
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post_avatar" />
        <div className="post__topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Post;
