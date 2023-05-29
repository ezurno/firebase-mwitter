import Mweet from "components/Mweet";
import { dbService } from "fbase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home({ userObj }) {
  // console.log(userObj);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const [mweets, setMweets] = useState([]);

  // const getMweets = async () => {
  //   const dbMweets = await getDocs(collection(dbService, "mweets"));
  //   // console.log(dbMweets);

  //   dbMweets.forEach((document) => {
  //     const mweetInstance = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     // console.log(document.data());
  //     setMweets((prev) => [mweetInstance, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getMweets();

    const queryData = query(
      collection(dbService, "mweets"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(queryData, (snapshot) => {
      console.log(snapshot.docs);
      const newArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(newArray);
      setMweets(newArray);
    });
  }, []);

  const onValid = async (data) => {
    // console.log(data.chat);
    try {
      const docRef = await addDoc(collection(dbService, "mweets"), {
        text: data.chat,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setValue("chat", "");
    // onValid 통과시 input 을 비워주는 함수
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("chat", {
            required: "내용을 작성해 주세요.",
          })}
          placeholder="chatting"
        />
        <button>Submit</button>
      </form>

      <div>
        {mweets.map((data) => (
          <Mweet
            key={data.id}
            mweetObj={data}
            isOwner={data.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
}
