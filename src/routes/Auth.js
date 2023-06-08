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

  const onMoveSignUp = () => {
    nav("/login");
  };

  return (
    <div className="socialLogin">
      <div className="socialText">
        <h1
          style={{
            fontFamily: "Monomaniac One",
          }}
        >
          Mwitter
        </h1>

        <h2>환영합니다</h2>

        <h2>최신 소식에 대해</h2>
        <h2>알아보세요</h2>
      </div>
      <div className="authContainer">
        <FontAwesomeIcon
          icon={faTwitter}
          color={"#04AAFF"}
          size="3x"
          style={{ marginBottom: 30 }}
        />
        <h1 className="headLine">로그인</h1>

        <AuthForm setResError={setResError} />
        <OtherLogin />

        <br />
        <br />

        <h1>아직 회원이 아닌가요?</h1>
        <h1 onClick={onMoveSignUp} className="signUpBtn">
          회원가입
        </h1>
        {/* <SignForm setResError={setResError} />/ */}
        <span className="authError">{resError}</span>
      </div>
    </div>
  );
}
