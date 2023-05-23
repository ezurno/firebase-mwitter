import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const nav = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    nav("/");
  };

  return (
    <>
      <span>Profile</span>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}
