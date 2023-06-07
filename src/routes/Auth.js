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

export default function Auth() {
  const [resError, setResError] = useState("");

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
      <AuthForm setResError={setResError} />
      <div className="authBtns">
        <button
          onClick={onSocialClick}
          name="google"
          className="authBtn"
          id="google"
        >
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button
          onClick={onSocialClick}
          name="github"
          className="authBtn"
          id="github"
        >
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>

      <h1 className="signUpBtn">Sign Up</h1>
      {/* <SignForm setResError={setResError} />/ */}
      <p>{resError}</p>
    </div>
  );
}
