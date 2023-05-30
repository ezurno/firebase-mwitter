import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
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
