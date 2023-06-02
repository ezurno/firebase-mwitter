import Mweet from "components/Mweet";
import { dbService, storageService } from "fbase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

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
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

  useEffect(() => {
    // getMweets();

    const queryData = query(
      collection(dbService, "mweets"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(queryData, (snapshot) => {
      // console.log(snapshot.docs);
      const newArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(newArray);
      setMweets(newArray);
    });
  }, []);

  const onValid = async (data) => {
    let attachmentUrl = "";

    if (attachment != "") {
      /**
       * 업로드한 파일에 대해 reference 를 부여하는 방법
       * storageService.ref().child();
       */
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      // uuid 는 특정 랜덤한 변수를 생성해주는 ㅎ함수
      const response = await uploadString(fileRef, attachment, "data_url");
      // upload 를 String 형식으로 업로드, fileRef 와 url, "data_url" 형식

      // console.log(await getDownloadURL(response.ref));
      // https://firebase.google.com/docs/reference/js/v8/firebase.storage.Reference#getdownloadurl

      attachmentUrl = await getDownloadURL(response.ref);
    }
    console.log(attachmentUrl);

    const mweetPosting = {
      text: data.chat,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await addDoc(collection(dbService, "mweets"), mweetPosting);

    setValue("chat", "");
    onClearAttachment();
    // onValid 통과시 input 을 비워주는 함수
  };

  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    // FileReader 는 업로드한 파일을 읽어올 수 있는 class

    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);

      setAttachment(finishedEvent.target.result);
    };

    if (theFile) {
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = null;
  };

  const checkKeyDown = (event) => {
    if (event.key === "Enter") event.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onValid)}
        onKeyDown={(event) => checkKeyDown(event)}
      >
        <input
          {...register("chat", {
            required: "내용을 작성해 주세요.",
          })}
          placeholder="chatting"
        />
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <button>Submit</button>

        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear image</button>
          </div>
        )}
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
