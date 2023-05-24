import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onValid = (data) => {
    console.log(data.chat);
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
    </>
  );
}
