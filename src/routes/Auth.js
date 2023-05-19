import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";

export default function Auth() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const onChange = (event) => {
  //   const {
  //     target: { name, value },
  //   } = event;
  //   if (name === "email") {
  //     setEmail(value);
  //   } else if (name === "password") {
  //     setPassword(value);
  //   }
  // };

  // const onSubmit = (event) => {
  //   event.preventDefault();
  // };

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

  const onLoginValid = (data) => {
    console.log(data);
  };

  const onSignUpValid = (data) => {
    console.log(data);
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
        />
        <span>{errors?.loginPw?.message}</span>

        <button>확인</button>
      </form>

      <div>
        <button>Continue with Google</button>
        <button>Continue with GitHub</button>
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
        />
        <span>{signErrors?.signUpPw?.message}</span>

        <button>확인</button>
      </form>
    </div>
  );
}
