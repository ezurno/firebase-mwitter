import { dbService } from "fbase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const [mweets, setMweets] = useState([]);

  const getMweets = async () => {
    const dbMweets = await getDocs(collection(dbService, "mweets"));
    // console.log(dbMweets);

    dbMweets.forEach((document) => {
      const mweetInstance = {
        ...document.data(),
        id: document.id,
      };
      // console.log(document.data());
      setMweets((prev) => [mweetInstance, ...prev]);
    });
  };

  console.log(mweets);

  useEffect(() => {
    getMweets();
  }, []);

  const onValid = async (data) => {
    console.log(data.chat);
    try {
      const docRef = await addDoc(collection(dbService, "mweets"), {
        mweet: data.chat,
        createdAt: Date.now(),
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
          <div key={data.id}>
            <h3>{data.mweet}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
