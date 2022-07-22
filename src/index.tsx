import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Header from "./component/Header";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Create from "./component/Create";
import Detail from "./component/Detail";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <React.StrictMode>
            <Header />
            <App />
            <Link to={"create"}>
              <button className="add-button" type="button">
                +
              </button>
            </Link>
          </React.StrictMode>
        }
      />
      <Route
        path="create"
        element={
          <React.StrictMode>
            <Header />
            <Create />
            <Link to={"/"}>
              <button className="add-button" type="button">
                {"<-"}
              </button>
            </Link>
          </React.StrictMode>
        }
      />
      <Route
        path="detail/:id"
        element={
          <React.StrictMode>
            <Header />
            <Detail />
          </React.StrictMode>
        }
      />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
