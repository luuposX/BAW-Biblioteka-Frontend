import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to="/">Biblioteka</Link>
    </div>
  );
}

export default Header;
