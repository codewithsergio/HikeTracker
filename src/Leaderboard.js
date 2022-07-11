import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import firebase from "firebase";

function Leaderboard() {
  const d = firebase.firestore();
  var collectionRef = d.collection("leaderboardData");
  const [docOne, setDocOne] = useState({});
  const [docTwo, setDocTwo] = useState({});
  const [docThree, setDocThree] = useState({});
  useEffect(() => {
    collectionRef.doc("position1").onSnapshot((snapshot) => {
      if (snapshot.data() == undefined) {
        return;
      }
      setDocOne(snapshot.data());
    });
    collectionRef.doc("position2").onSnapshot((snapshot) => {
      if (snapshot.data() == undefined) {
        return;
      }
      setDocTwo(snapshot.data());
    });
    collectionRef.doc("position3").onSnapshot((snapshot) => {
      if (snapshot.data() == undefined) {
        return;
      }
      setDocThree(snapshot.data());
    });
  }, []);

  return (
    <div className="info">
      <h3>Leaderboard</h3>
      <table>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Hikes</th>
        </tr>
        <tr>
          <td className="column1">1</td>
          <td>{docOne.name}</td>
          <td>{docOne.hikes}</td>
        </tr>
        <tr>
          <td className="column1">2</td>
          <td>{docTwo.name}</td>
          <td>{docTwo.hikes}</td>
        </tr>
        <tr>
          <td className="column1">3</td>
          <td>{docThree.name}</td>
          <td>{docThree.hikes}</td>
        </tr>
      </table>
    </div>
  );
}

export default Leaderboard;
