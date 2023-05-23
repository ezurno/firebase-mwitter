import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { authService, firebaseInstance } from "fbase";

export default function Auth() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const {
    register: signRegister,
    handleSubmit: signHandleSubmit,
    setError: signSetError,
    formState: { errors: signErrors },
  } = useForm();

  const [resError, setResError] = useState("");

  const onLoginValid = async (data) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, data.loginId, data.loginPw);
    } catch (error) {
      console.log(error.message);
      setResError(error.message.replace("Firebase: Error", ""));
    }
  };

  const onSignUpValid = async (data) => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, data.signUpId, data.signUpPw);
    } catch (error) {
      console.log(error.message.replace("Firebase:", ""));
      setResError(error.message);
    }
  };

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "250px",
        }}
        onSubmit={handleSubmit(onLoginValid)}
      >
        <input
          {...register("loginId", {
            required: "아이디를 작성해야 합니다.",
          })}
          placeholder="아이디"
        />
        <span>{errors?.loginId?.message}</span>
        <input
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
        <span>{errors?.loginPw?.message}</span>

        <button>확인</button>
      </form>

      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with GitHub
        </button>
      </div>

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
      <p>{resError}</p>
    </div>
  );
}
