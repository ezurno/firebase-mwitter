import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { useForm } from "react-hook-form";

export default function SignForm({ setResError }) {
  const {
    register: signRegister,
    handleSubmit: signHandleSubmit,
    setError: signSetError,
    formState: { errors: signErrors },
  } = useForm();

  const onSignUpValid = async (data) => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, data.signUpId, data.signUpPw);
    } catch (error) {
      console.log(error.message.replace("Firebase:", ""));
      setResError(error.message);
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        width: "250px",
      }}
      onSubmit={signHandleSubmit(onSignUpValid)}
    >
      <input
        {...signRegister("signUpId", {
          required: "아이디를 작성해야 합니다.",
        })}
        placeholder="아이디"
      />
      <span>{signErrors?.signUpId?.message}</span>
      <input
        {...signRegister("signUpPw", {
          required: "비밀번호를 작성해야 합니다.",
          minLength: {
            value: 5,
            message: "비밀번호가 너무 짧습니다.",
          },
        })}
        placeholder="비밀번호"
        type="password"
        autoComplete="off"
      />
      <span>{signErrors?.signUpPw?.message}</span>

      <button>확인</button>
    </form>
  );
}
