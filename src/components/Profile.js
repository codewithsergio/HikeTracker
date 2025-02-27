import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import Fetch from "../firebase/fetch";
import EditDetails from "./EditDetails";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

function Profile({ data }) {
    const [{ user }, dispatch] = useStateValue();
    const d = firebase.firestore();
    var docRef = d.collection("users").doc(user.uid);
    const [singleDoc, setSingleDoc] = useState({});
    useEffect(() => {
        docRef.onSnapshot((snapshot) => {
            if (snapshot.data() === undefined) {
                return;
            }
            setSingleDoc(snapshot.data());
        });
    }, []);

    return (
        <div className="profile">
            <img className="pfp" src={user.photoURL} alt="me" />
            <div className="bio">
                <div className="information">
                    <h3>{user.displayName}</h3>
                </div>
                <div className="hikeInformation">
                    <div>
                        <p className="visited">Visited</p>
                        <p className="numOfLocations">{singleDoc.hikes}</p>
                    </div>
                    <div>
                        <p className="visited">Incomplete</p>
                        <p className="numOfLocations">
                            {data.length - singleDoc.hikes}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
