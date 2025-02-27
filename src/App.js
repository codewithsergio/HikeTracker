import "./css/App.css";
import React, { useState } from "react";
import Login from "./components/Login.js";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Location from "./components/Location";
import info from "./data";
import Feed from "./components/Feed";
import DashedLine from "./components/DashedLine";
import Leaderboard from "./components/Leaderboard";
import Categories from "./components/Categories";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [mapLocations, setMapLocations] = useState({});
  const [showFeed, setShowFeed] = useState(false);
  const [showVisitedLocations, setShowVisitedLocations] = useState(false);
  const [showNotVisitedLocations, setShowNotVisitedLocations] = useState(true);

  return (
    <div className="app">
      {!user ? (
        <Login setter={setMapLocations} />
      ) : (
        <>
          <Header />
          <div className="app_body">
            <Profile data={info} />
            <Leaderboard />
            <Categories
              setShowFeed={setShowFeed}
              setShowNotVisitedLocations={setShowNotVisitedLocations}
              setShowVisitedLocations={setShowVisitedLocations}
            />
            <DashedLine />
            <div className="locationUIList">
              <Location
                data={info[0]}
                currentLocations={mapLocations}
                setter={setMapLocations}
                showVisitedLocations={showVisitedLocations}
                showNotVisitedLocations={showNotVisitedLocations}
              />
              <Location
                data={info[1]}
                currentLocations={mapLocations}
                setter={setMapLocations}
                showVisitedLocations={showVisitedLocations}
                showNotVisitedLocations={showNotVisitedLocations}
              />
              <Location
                data={info[2]}
                currentLocations={mapLocations}
                setter={setMapLocations}
                showVisitedLocations={showVisitedLocations}
                showNotVisitedLocations={showNotVisitedLocations}
              />
              <Location
                data={info[3]}
                currentLocations={mapLocations}
                setter={setMapLocations}
                showVisitedLocations={showVisitedLocations}
                showNotVisitedLocations={showNotVisitedLocations}
              />
              <Location
                data={info[4]}
                currentLocations={mapLocations}
                setter={setMapLocations}
                showVisitedLocations={showVisitedLocations}
                showNotVisitedLocations={showNotVisitedLocations}
              />
              <Location
                data={info[5]}
                currentLocations={mapLocations}
                setter={setMapLocations}
                showVisitedLocations={showVisitedLocations}
                showNotVisitedLocations={showNotVisitedLocations}
              />
              <Location
                data={info[6]}
                currentLocations={mapLocations}
                setter={setMapLocations}
                showVisitedLocations={showVisitedLocations}
                showNotVisitedLocations={showNotVisitedLocations}
              />
              <Location
                data={info[7]}
                currentLocations={mapLocations}
                setter={setMapLocations}
                showVisitedLocations={showVisitedLocations}
                showNotVisitedLocations={showNotVisitedLocations}
              />
              <Location
                data={info[8]}
                currentLocations={mapLocations}
                setter={setMapLocations}
                showVisitedLocations={showVisitedLocations}
                showNotVisitedLocations={showNotVisitedLocations}
              />
              <Location
                data={info[9]}
                currentLocations={mapLocations}
                setter={setMapLocations}
                showVisitedLocations={showVisitedLocations}
                showNotVisitedLocations={showNotVisitedLocations}
              />
              <Location
                data={info[10]}
                currentLocations={mapLocations}
                setter={setMapLocations}
                showVisitedLocations={showVisitedLocations}
                showNotVisitedLocations={showNotVisitedLocations}
              />
            </div>
            {showFeed ? <Feed /> : null}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
