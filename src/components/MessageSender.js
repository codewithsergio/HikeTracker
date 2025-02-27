import React, { useState } from "react";
import db from "../firebase/firebase";
import "../css/MessageSender.css";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

function MessageSender() {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");

  // When they press submit
  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
    });

    setInput("");
  };

  return (
    <div className="messageSender">
      {/* <Avatar className="pic" src={user.photoURL} /> */}
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="messageSender__input"
          placeholder={`What's on your mind, ${user.displayName}?`}
        />
        <button onClick={handleSubmit} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageSender;
