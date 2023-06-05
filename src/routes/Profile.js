import { authService, dbService } from "fbase";
import { collection, query, getDoc, getDocs, where } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ userObj }) {
  const nav = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    nav("/");
  };

  const getMyMweets = async () => {
    const myQuery = query(
      collection(dbService, "mweets"),
      where("creatorId", "==", userObj.uid)
    );

    const querySnapshot = await getDocs(myQuery);
    querySnapshot.forEach((doc) => {
      console.log(doc);
    });
  };

  useEffect(() => {
    getMyMweets();
  }, []);

  return (
    <>
      <span>Profile</span>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}
