import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footerMain">
      <div className="footerText">
        <h1>&copy; {new Date().getFullYear()} Mwitter</h1>
      </div>
      <a href="https://github.com/ezurno?tab=repositories">
        <FontAwesomeIcon
          icon={faGithubSquare}
          color={"white"}
          size="2x"
          style={{ cursor: "pointer" }}
          className="gitIcon"
        />
      </a>
    </div>
  );
}
