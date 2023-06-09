import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { dbService, storageService } from "fbase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function MweetFactory({ userObj }) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

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

  const checkKeyDown = (event) => {
    if (event.key === "Enter") event.preventDefault();
  };

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
    // console.log(attachmentUrl);

    const mweetPosting = {
      text: data.chat,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
      userName: userObj.displayName,
    };

    await addDoc(collection(dbService, "mweets"), mweetPosting);

    setValue("chat", "");
    onClearAttachment();
    // onValid 통과시 input 을 비워주는 함수
  };

  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = null;
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      onKeyDown={(event) => checkKeyDown(event)}
      className="factoryForm"
    >
      <div className="factoryInput__container">
        <input
          {...register("chat", {
            required: "내용을 작성해 주세요.",
          })}
          placeholder="......."
          maxLength={120}
          className="factoryInput__input"
        />

        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>사진 추가하기</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
        style={{
          opacity: 0,
        }}
      />

      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>지우기</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
}
