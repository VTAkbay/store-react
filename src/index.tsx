import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Header from "./component/Header";
import { HashRouter, Route, Routes } from "react-router-dom";
import Create from "./component/Create";
import Detail from "./component/Detail";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div className="bg-stone-200 min-h-screen pt-10">
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <React.StrictMode>
              <Header />
              <App />
            </React.StrictMode>
          }
        />
        <Route
          path="create"
          element={
            <React.StrictMode>
              <Header />
              <Create />
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
    </HashRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
