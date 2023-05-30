import { dbService } from "fbase";
import { deleteDoc, doc } from "firebase/firestore";

export default function Mweet({ mweetObj, isOwner }) {
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this mweet?");
    console.log(ok);

    const mweetTextRef = doc(dbService, "mweets", `${mweetObj.id}`);
    // 해당 Meets 의 References

    if (ok) {
      // delete mweet
      await deleteDoc(mweetTextRef);
      // delete 실행, 비동기 처리해야함
    }
  };

  return (
    <>
      <h4>{mweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete</button>
          <button>Edit</button>
        </>
      )}
    </>
  );
}
