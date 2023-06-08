import { useEffect, useState } from "react";
import Router from "./Router";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import Footer from "./Footer";

export default function App() {
  const [init, setInit] = useState(false);
  //   console.log(authService.currentUser);
  // authService 의 currentUser var 는 현재 유저정보를 불러옴 User | null

  const [isLogin, setIsLogin] = useState(true);

  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLogin(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, { displayName: user.displayName }),
        });

        if (user.displayName === null || user.displayName === "") {
          const name = user.email.split("@")[0];
          user.displayName = name;
          // E-mail 로그인 시 displayName 이 없으므로
          // 해당하는 이메일의 아이디를 displayName 으로 지정해줌
        }
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) =>
        updateProfile(user, { displayName: user.displayName }),
    });
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Monomaniac+One&display=swap"
        rel="stylesheet"
      />
      {init ? (
        <Router isLogin={isLogin} userObj={userObj} refreshUser={refreshUser} />
      ) : (
        "Initializing..."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Mwitter</footer> */}
      <Footer />
    </>
  );
}
