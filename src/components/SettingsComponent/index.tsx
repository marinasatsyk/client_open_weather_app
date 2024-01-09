import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./index.scss";
import { UseLogout } from "utils/hook";

export default function SettingsComponent() {
  const navigate = useNavigate();
  const logoutFull = UseLogout();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    logoutFull();
    navigate("/connection");
  };

  return (
    <div className="wrapSettings">
      <Link to={"/user/profile/show"} className="nav-link link">
        <FontAwesomeIcon
          icon={icon({ name: "circle-user", style: "solid" })}
          className="icon"
        />
        <div className="btn-link">My Profile</div>
      </Link>

      <div className="btn-link link" onClick={() => handleLogout()}>
        <FontAwesomeIcon
          icon={icon({ name: "person-walking-arrow-right", style: "solid" })}
          className="icon"
        />
        <div>Log Out</div>
      </div>
    </div>
  );
}
