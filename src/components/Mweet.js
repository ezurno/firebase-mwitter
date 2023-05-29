export default function Mweet({ mweetObj, isOwner }) {
  return (
    <>
      <h4>{mweetObj.text}</h4>
      {isOwner && (
        <>
          <button>Delete</button>
          <button>Edit</button>
        </>
      )}
    </>
  );
}
