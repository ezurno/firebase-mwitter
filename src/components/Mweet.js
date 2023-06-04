import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { set, useForm } from "react-hook-form";

export default function Mweet({ mweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [targetValue, setTargetValue] = useState(mweetObj.text);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm();

  const onDeleteClick = async () => {
    const mweetTextRef = doc(dbService, "mweets", `${mweetObj.id}`);
    // 해당 Meets 의 References

    const ok = window.confirm("Are you sure you want to delete this mweet?");
    console.log(ok);

    if (ok) {
      // delete mweet
      await deleteDoc(mweetTextRef);
      // delete 실행, 비동기 처리해야함
      if (mweetObj.attachmentUrl !== "") {
        const urlRef = ref(storageService, mweetObj.attachmentUrl);
        // ref 를 사용하면 storage 에 url 이 일치하는 referernse 를 받아올 수 있음

        await deleteObject(urlRef);
        // 받아온 url 로 deleteObject 실행
      } // attachmetUrl 이 존재할 시
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onValid = async (data) => {
    const mweetTextRef = doc(dbService, "mweets", `${mweetObj.id}`);

    console.log(data);

    await updateDoc(mweetTextRef, {
      text: data.newMweet,
    });

    setEditing(false);
  };

  const onChangeMweet = async (event) => {
    const {
      target: { value },
    } = event;
    setTargetValue(value);
  };

  const checkKeyDown = (event) => {
    if (event.key === "Enter") event.preventDefault();
  };

  return (
    <>
      {editing ? (
        <>
          <form
            onSubmit={handleSubmit(onValid)}
            onKeyDown={(event) => checkKeyDown(event)}
          >
            <input
              {...register("newMweet", {
                required: "please write your comment.",
              })}
              type="text"
              placeholder="Edit your comment."
              value={targetValue}
              onChange={onChangeMweet}
            />

            <span>{errors?.newMweet?.message}</span>
            <button>Edit</button>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{mweetObj.text}</h4>
          {mweetObj.attachmentUrl && (
            <img src={mweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </>
  );
}
