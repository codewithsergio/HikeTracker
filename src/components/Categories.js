import React from "react";
import "../css/Categories.css";

function Categories({
  setShowFeed,
  setShowNotVisitedLocations,
  setShowVisitedLocations,
}) {
  return (
    <div className="Categories">
      <div className="filter-btn-group">
        <button
          className="filter-btn"
          onClick={() => {
            setShowFeed(false);
            setShowVisitedLocations(false);
            setShowNotVisitedLocations(true);
          }}
        >
          Incomplete
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            setShowFeed(false);
            setShowVisitedLocations(true);
            setShowNotVisitedLocations(false);
          }}
        >
          Visited
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            setShowFeed(true);
            setShowVisitedLocations(false);
            setShowNotVisitedLocations(false);
          }}
        >
          Feed
        </button>
      </div>
    </div>
  );
}

export default Categories;
