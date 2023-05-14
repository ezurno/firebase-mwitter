import React from "react";
import ReactDOM from "react-dom/client";
import firebase from "./firebase";
import Router from "./components/Router";

console.log(firebase);
// firebase가 잘 연결 되어 있는지 확인하기 위함

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
