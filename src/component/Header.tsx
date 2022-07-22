import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  return (
    <div className="header">
      <Link to={"/"}>
        <h1>UPayments Store</h1>
      </Link>
      <button type="button">Register</button>
    </div>
  );
}
