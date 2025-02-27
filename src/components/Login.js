import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "../css/Login.css";
import { auth, provider } from "../firebase/firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import db from "../firebase/firebase";

function Login({ setter }) {
  const [state, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        var docRef = db.collection("users").doc(result.user.uid);
        // List of Locations
        const visitedLocations = {
          CaveOfMunits: false,
          ParadiseFalls: false,
          Broad: false,
          TopangaLookout: false,
          CSUNLibrary: false,
          UCLALibrary: false,
          DelanoPark: false,
          TravelTown: false,
          Observatory: false,
          Jacaranda: false,
          StarbucksA: false,
        };
        //
        docRef.get().then((doc) => {
          if (doc.data() == undefined) {
            setter(visitedLocations);
            return db.collection("users").doc(result.user.uid).set({
              hikes: 0,
              name: result.user.displayName,
              visitedLocations,
            });
          } else {
            setter(doc.data().visitedLocations);
          }
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="loginBox">
        <h1 className="loginLogo">Map-oodle</h1>
        <Button type="submit" onClick={signIn}>
          Log In
        </Button>
      </div>
    </div>
  );
}

export default Login;
