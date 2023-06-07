import { authService, dbService } from "fbase";
import { collection, query, getDoc, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

export default function Profile({ userObj, refreshUser }) {
  const nav = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName ?? ""
  );

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

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(await authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          autoFocus
          type="text"
          onChange={onChange}
          value={newDisplayName}
          placeholder="Display Name"
          className="formInput"
        />
        <input
          type="submit"
          placeholder="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
}
