import React from "react";
import ReactDOM from "react-dom/client";
import firebase from "./fbase";
import App from "./components/App";
import "./styles.css";

// console.log(firebase);
// firebase가 잘 연결 되어 있는지 확인하기 위함

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
