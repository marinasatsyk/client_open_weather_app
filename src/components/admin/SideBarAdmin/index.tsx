import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./index.scss";
import { useState } from "react";
import { SearchCityComponent } from "components/SearchCity";
import { Link } from "react-router-dom";

interface iSideMenu {
  isShowSideMenu: boolean;
}

const SideBarAdmin = ({ isShowSideMenu }: iSideMenu) => {
  const [isShowSideSubMenu, setIsShowSideSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setIsShowSideSubMenu(!isShowSideSubMenu);
  };

  return (
    <>
      {!isShowSideSubMenu && (
        <div
          className={`wrap-side-menu ${
            isShowSideMenu
              ? "side-menu-enter side-menu-enter-active"
              : "side-menu-exit side-menu-exit-active"
          }`}
        >
          <nav>
            <ul className="side-bar-menu">
              <li>
                <Link to={"dashboard"}>Dashboard Admin</Link>
              </li>
              <li>
                <Link to={"user/new"}>Create new User</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
      {isShowSideSubMenu && (
        <div
          className={`wrap-side-menu ${
            isShowSideMenu
              ? "side-menu-enter side-menu-enter-active"
              : "side-menu-exit side-menu-exit-active"
          }`}
        >
          <div className="back-btn" onClick={() => toggleSubMenu()}>
            <span>Locations</span>
            <FontAwesomeIcon
              icon={icon({ name: "sort-up", style: "solid" })}
              rotation={270}
              className="icon-rotation"
            />
          </div>
          <SearchCityComponent />
        </div>
      )}
    </>
  );
};

export default SideBarAdmin;
