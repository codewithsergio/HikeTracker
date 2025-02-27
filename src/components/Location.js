import React, { useEffect, useState } from "react";
import "../css/Location.css";
import firebase from "firebase";
import { useStateValue } from "../StateProvider";
import listOfCurrentLocations from "./Login";

function Location({
  photo,
  data,
  currentLocations,
  setter,
  showVisitedLocations,
  showNotVisitedLocations,
}) {
  const [{ user }, dispatch] = useStateValue();
  const d = firebase.firestore();
  var docRef = d.collection("users").doc(user.uid);
  let leaderboardCollection = d.collection("leaderboardData");
  let classes = currentLocations[data.locationKey] == true ? "hidden" : "";
  let locationClassName =
    (currentLocations[data.locationKey] == false &&
      showNotVisitedLocations == true) ||
    (currentLocations[data.locationKey] == true && showVisitedLocations == true)
      ? ""
      : "hidden";
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 10000,
  };

  function went() {
    docRef.get().then((doc) => {
      if (doc.exists) {
        const increment = firebase.firestore.FieldValue.increment(1);
        docRef.update({
          [["visitedLocations", data.locationKey].join(".")]: true,
        });
        setter((currentLocations) => ({
          ...currentLocations,
          [data.locationKey]: true,
        }));
        docRef.update({ hikes: increment });

        // Check if you need to update leaderboard
        let docRefPos1 = leaderboardCollection.doc("position1");
        let docRefPos2 = leaderboardCollection.doc("position2");
        let docRefPos3 = leaderboardCollection.doc("position3");
        docRefPos1.get().then((d1) => {
          docRefPos2.get().then((d2) => {
            docRefPos3.get().then((d3) => {
              // Do we just need to update our current value?
              if (
                // Are we going up the leaderboard ladder?
                doc.data().hikes + 1 >=
                d1.data().hikes
              ) {
                if (doc.data().name == d1.data().name) {
                  docRefPos1.update({ hikes: doc.data().hikes + 1 });
                } else {
                  // Move current 1st to 2nd
                  docRefPos2.update({ hikes: d1.data().hikes });
                  docRefPos2.update({ name: d1.data().name });
                  // We are 1st place
                  docRefPos1.update({ hikes: doc.data().hikes + 1 });
                  docRefPos1.update({ name: doc.data().name });
                }
              } else if (doc.data().hikes + 1 >= d2.data().hikes) {
                if (doc.data().name == d2.data().name) {
                  docRefPos2.update({ hikes: doc.data().hikes + 1 });
                } else {
                  // Move 2nd to 3rd
                  docRefPos3.update({ hikes: d2.data().hikes });
                  docRefPos3.update({ name: d2.data().name });
                  // We are 2nd place
                  docRefPos2.update({ hikes: doc.data().hikes + 1 });
                  docRefPos2.update({ name: doc.data().name });
                }
              } else if (doc.data().hikes + 1 >= d3.data().hikes) {
                if (doc.data().name == d3.data().name) {
                  docRefPos3.update({ hikes: doc.data().hikes + 1 });
                } else {
                  // We are 3rd place
                  docRefPos3.update({ hikes: doc.data().hikes + 1 });
                  docRefPos3.update({ name: doc.data().name });
                }
              }
            });
          });
        });
        // End check to update leadboard
      }
    });
  }

  function getLocation() {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          showPosition(position.coords.latitude, position.coords.longitude);
        },
        function error(msg) {
          alert("Please enable your GPS position feature.");
        },
        options
      );
    } else {
      console.log("Not supported");
    }
  }

  function showPosition(lat, long) {
    // if (
    //   lat <= data.latitude &&
    //   lat >= data.latitude2 &&
    //   long >= data.longitude &&
    //   long <= data.longitude2
    // ) {
    went();
    alert(`Congrats! You made it to ${data.locationName}!`);
    // } else {
    //   alert(
    //     `Please get closer to this location, you are only at ${lat}, ${long}`
    //   );
    // }
  }

  return (
    <div className={`location ${locationClassName}`}>
      <div className="location__left">
        <img src={data.photo} alt={data.locationName} />
      </div>
      <div className="description">
        <h3>{data.locationName}</h3>
        <p>{data.locationDescription}</p>
        <button className={classes} onClick={getLocation}>
          I am here
        </button>
      </div>
    </div>
  );
}

export default Location;
