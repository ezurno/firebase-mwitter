import { useState } from "react";
import Router from "./Router";
import firebase from "../firebase";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Router isLogin={isLogin} />
      <footer>&copy; {new Date().getFullYear()} Mwitter</footer>
    </>
  );
}
