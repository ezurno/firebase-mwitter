import { useEffect, useState } from "react";
import Router from "components/Router";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [init, setInit] = useState(false);
  //   console.log(authService.currentUser);
  // authService 의 currentUser var 는 현재 유저정보를 불러옴 User | null

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        const uid = user.uid;
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <Router isLogin={isLogin} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Mwitter</footer>
    </>
  );
}
