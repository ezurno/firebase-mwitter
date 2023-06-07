import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { authService, firebaseInstance } from "fbase";

export default function OtherLogin() {
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
    <>
      <div className="comportText">
        <h3>간편하게 로그인</h3>
      </div>
      <div className="authBtns">
        <button
          onClick={onSocialClick}
          name="google"
          className="authBtn"
          id="google"
        >
          Google 계정 로그인 <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button
          onClick={onSocialClick}
          name="github"
          className="authBtn"
          id="github"
        >
          Github 계정 로그인 <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </>
  );
}
