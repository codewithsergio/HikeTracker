import React from "react";
import "../css/Header.css";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase/firebase";

function Header() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="cover">
      <div className="header">
        <div className="header__left">
          <h2>Map-oodle</h2>
        </div>
      </div>
    </div>
  );
}

export default Header;
