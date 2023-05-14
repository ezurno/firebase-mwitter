import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import firebase from "./firebase";

console.log(firebase);
// firebase가 잘 연결 되어 있는지 확인하기 위함

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
