import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  return (
    <div className="header">
      <h1>
        <Link to={"/"}>UPayments Store</Link>
      </h1>

      <button type="button">Register</button>
    </div>
  );
}
