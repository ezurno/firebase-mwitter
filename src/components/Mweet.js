import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const OwnerTitle = styled.h4`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bolder;
  color: ${(props) => (props.owner ? "#04aaff" : "white")};
`;

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
      <OwnerTitle owner={isOwner}>{mweetObj.userName}</OwnerTitle>
      <div className="nweet">
        {editing ? (
          <>
            <form
              onSubmit={handleSubmit(onValid)}
              onKeyDown={(event) => checkKeyDown(event)}
              className="container nweetEdit"
            >
              <input
                {...register("newMweet", {
                  required: "please write your comment.",
                })}
                autoFocus
                type="text"
                placeholder="수정할 내용을 작성해 주세요."
                value={targetValue}
                onChange={onChangeMweet}
                className="formInput"
              />

              <span>{errors?.newMweet?.message}</span>
              <button className="formBtn">수정하기</button>
            </form>
            <button onClick={toggleEditing} className="formBtn cancelBtn">
              취소
            </button>
          </>
        ) : (
          <>
            <h4>{mweetObj.text}</h4>
            {mweetObj.attachmentUrl && <img src={mweetObj.attachmentUrl} />}
            {isOwner && (
              <div className="nweet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
