import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <div className="sidenav">
        <Link to="/pools">Ավազաններ</Link>
        <Link to="/partners">Գործընկերներ</Link>
        <Link to="/fishes">Ձկներ</Link>
        <Link to="/foods">Կերեր</Link>
      </div>
    </div>
  );
}

export default Sidebar;
