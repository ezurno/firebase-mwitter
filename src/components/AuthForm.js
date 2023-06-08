import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useForm } from "react-hook-form";

export default function AuthForm({ setResError }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onLoginValid = async (data) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, data.loginId, data.loginPw);
    } catch (error) {
      console.log(error.message);
      setResError(error.message.replace("Firebase: Error", ""));
    }
  };

  return (
    <>
      <form className="container" onSubmit={handleSubmit(onLoginValid)}>
        <input
          className="authInput"
          {...register("loginId", {
            required: "아이디를 작성해야 합니다.",
          })}
          placeholder="아이디"
        />
        <input
          className="authInput"
          {...register("loginPw", {
            required: "비밀번호를 작성해야 합니다.",
            minLength: {
              value: 2,
              message: "비밀번호가 너무 짧습니다.",
            },
          })}
          placeholder="비밀번호"
          type="password"
          autoComplete="off"
        />

        <input type="submit" className="authSwitch" value="확 인" />
        <span className="authError">
          {errors?.loginId?.message
            ? errors?.loginId?.message
            : errors?.loginPw?.message}
        </span>
      </form>
    </>
  );
}
