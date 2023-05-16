import { useState } from "react";
import Router from "components/Router";
import fbase from "fbase";
import { authService } from "fbase";

export default function App() {
  //   console.log(authService.currentUser);
  // authService 의 currentUser var 는 현재 유저정보를 불러옴 User | null

  const [isLogin, setIsLogin] = useState(authService.currentUser);
  return (
    <>
      <Router isLogin={isLogin} />
      <footer>&copy; {new Date().getFullYear()} Mwitter</footer>
    </>
  );
}
