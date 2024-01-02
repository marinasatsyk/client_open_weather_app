import HeaderScreen from "components/Headers/HeaderScreen";
import HeaderMobile from "components/Headers/HeaderMobile";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import SideBarComponent from "components/SideBar";
import { useModal } from "utils/hook";
import { CommonModalComponent } from "components/CommonModal";
import { SearchCityComponent } from "components/SearchCity";
import SettingsComponent from "components/SettingsComponent";
import { Outlet } from "react-router-dom";
import "./index.scss";

export const LayoutPublicComponent = () => {
  const { isModalOpened: isModalSearchOpened, toggle: setModalOpened } =
    useModal();
  const {
    isModalOpened: isModalSettingsOpened,
    toggle: setModalSettingsOpened,
  } = useModal();
  const [isShowSideMenu, setShowSideMenu] = useState(false);

  const toggleSideMenu = () => {
    setShowSideMenu(!isShowSideMenu);
  };

  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (isDesktop) {
    return (
      <div
        className={`main-wrapper-current ${
          isShowSideMenu ? "side-menu-opened" : ""
        }`}
      >
        <SideBarComponent isShowSideMenu={isShowSideMenu} />
        <div className={`wrap-main-content`}>
          <HeaderScreen isShowSideMenu toggleSideMenu={toggleSideMenu} />
          <main className="screen">
            <Outlet />
          </main>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main-wrapper-current">
        <HeaderMobile
          showSearchModal={setModalOpened}
          showSettingsModal={setModalSettingsOpened}
        />
        <main className="mobile">
          <Outlet />
        </main>
        <CommonModalComponent
          isModalOpened={isModalSearchOpened}
          hide={setModalOpened}
        >
          <SearchCityComponent />
        </CommonModalComponent>

        <CommonModalComponent
          isModalOpened={isModalSettingsOpened}
          hide={setModalSettingsOpened}
        >
          <SettingsComponent />
        </CommonModalComponent>
      </div>
    );
  }
};
