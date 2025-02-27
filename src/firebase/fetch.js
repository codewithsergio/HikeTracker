import React, { useState } from "react";
import firebase from "firebase";

function Fetch() {
  const [singleDoc, setSingleDoc] = useState({});
  const db = firebase.firestore();
  db.collection("users")
    .doc("Mmn9T1sMb4R4fAeGetGYTmoACLZ2")
    .get()
    .then((snapshot) => {
      if (snapshot) {
        setSingleDoc(snapshot.data());
      }
    });
  return (
    <div>
      <h1>{singleDoc.hikes}</h1>
    </div>
  );
}

export default Fetch;
