import { useState } from "react";
import Router from "components/Router";
import fbase from "fbase";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Router isLogin={isLogin} />
      <footer>&copy; {new Date().getFullYear()} Mwitter</footer>
    </>
  );
}
