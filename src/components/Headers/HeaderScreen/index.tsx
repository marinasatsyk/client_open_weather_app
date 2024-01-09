import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./index.scss";
import { Link, useNavigate } from "react-router-dom";

import { UseLogout } from "utils/hook";

interface iHeaderScrin {
  isShowSideMenu: boolean;
  toggleSideMenu: () => void;
}

export default function HeaderScreen({
  isShowSideMenu,
  toggleSideMenu,
}: iHeaderScrin) {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const logoutFull = UseLogout();

  const handleLogout = async () => {
    // sessionStorage.clear();
    // localStorage.clear();
    // const res = await dispatch<any>(logout());
    // if (logout.fulfilled.match(res)) {
    sessionStorage.clear();
    localStorage.clear();
    logoutFull();
    navigate("/connection");
    // }
  };

  return (
    <header className="header-screen">
      <div className="wrap-icons-screen-header" tabIndex={1}>
        <FontAwesomeIcon
          icon={icon({ name: "bars", style: "solid" })}
          className="icon"
          onClick={toggleSideMenu}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toggleSideMenu();
            }
          }}
          tabIndex={0}
          title="sidebar"
        />

        <Link to="current">
          <FontAwesomeIcon
            icon={icon({ name: "house", style: "solid" })}
            className="icon"
            title="home"
            tabIndex={0}
          />
        </Link>
      </div>

      <div className="wrap-header">
        <div className="header-block-one">
          <span>Weather</span>
          <span>Forecast</span>
        </div>
        <div className="header-block-two">
          <div className="empty flex"></div>
          <div className="third-logo flex">& history </div>
        </div>
      </div>
      <div className="icons-menu">
        <Link to="profile/show">
          <FontAwesomeIcon
            icon={icon({ name: "circle-user", style: "solid" })}
            className="icon"
            title="profile"
          />
        </Link>

        <FontAwesomeIcon
          onClick={() => handleLogout()}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogout();
            }
          }}
          icon={icon({ name: "person-walking-arrow-right", style: "solid" })}
          className="icon"
          title="logout"
        />
      </div>
    </header>
  );
}
