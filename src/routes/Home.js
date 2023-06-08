import { onAuthStateChanged } from "firebase/auth";
import Mweet from "../components/Mweet";
import MweetFactory from "../components/MweetFactory";
import { authService, dbService } from "../fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

export default function Home({ userObj }) {
  // console.log(userObj);

  const [mweets, setMweets] = useState([]);

  useEffect(() => {
    // getMweets();

    const queryData = query(
      collection(dbService, "mweets"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(queryData, (snapshot) => {
      // console.log(snapshot.docs);
      const newArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(newArray);
      setMweets(newArray);
    });

    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
  }, []);

  return (
    <div className="container">
      <MweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {mweets.map((data) => (
          <Mweet
            key={data.id}
            mweetObj={data}
            isOwner={data.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}
