import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import SignForm from "components/SignForm";
import { useNavigate } from "react-router-dom";
import OtherLogin from "components/OtherLogin";

export default function Auth() {
  const [resError, setResError] = useState("");

  const nav = useNavigate();

  const onMoveHome = () => {
    nav("/");
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
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <h1 className="headLine">회원가입</h1>

      <SignForm setResError={setResError} />
      <OtherLogin />
      <span className="authError">{resError}</span>

      <h1 onClick={onMoveHome} className="signUpBtn">
        메인 화면으로
      </h1>

      {/* <SignForm setResError={setResError} />/ */}
    </div>
  );
}
