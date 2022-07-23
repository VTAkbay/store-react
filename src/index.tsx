import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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
  <div className="bg-stone-200 min-h-screen pt-10">
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <React.StrictMode>
              <Header />
              <App />
              <Link to={"create"}>
                <button
                  className="sticky h-12 w-12 bottom-20 left-full mr-20"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=""
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
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
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
