import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./index.scss";
import { useState } from "react";
import { SearchCityComponent } from "components/SearchCity";
import { Link, useLocation } from "react-router-dom";

interface iSideMenu {
  isShowSideMenu: boolean;
}

export default function SideBarComponent({ isShowSideMenu }: iSideMenu) {
  const [isShowSideSubMenu, setIsShowSideSubMenu] = useState(false);

  const toggleSubMenu = () => {
    console.log("click");
    setIsShowSideSubMenu(!isShowSideSubMenu);
  };

  const location = useLocation();

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
              <li onClick={() => toggleSubMenu()}>
                <span>Locations</span>
                <FontAwesomeIcon
                  icon={icon({ name: "sort-up", style: "solid" })}
                  rotation={90}
                  className="icon-rotation"
                />
              </li>
              <li
                className={
                  location.pathname.includes("current") ? "active" : ""
                }
              >
                <Link to={"current"}>Today</Link>
              </li>
              <li
                className={
                  location.pathname.includes("history") ? "active" : ""
                }
              >
                <Link to={"history"}>History</Link>
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
          <div
            className="back-btn"
            onClick={() => toggleSubMenu()}
            title="back"
          >
            <span className="title-back">Locations</span>
            <FontAwesomeIcon
              icon={icon({ name: "sort-up", style: "solid" })}
              rotation={270}
              className="icon-rotation-back"
            />
          </div>
          <SearchCityComponent />
        </div>
      )}
    </>
  );
}
