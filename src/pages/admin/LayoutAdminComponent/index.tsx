import HeaderScreen from "components/Headers/HeaderScreen";
import HeaderMobile from "components/Headers/HeaderMobile";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { UseAppDispatch, UseBookmarks, useModal } from "utils/hook";
import { getUser } from "store/thunks/auth";
import { CommonModalComponent } from "components/CommonModal";
import { SearchCityComponent } from "components/SearchCity";
import SettingsComponent from "components/SettingsComponent";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "components/admin/SideBarAdmin";
import HeaderAdmin from "components/admin/HeaderAdmin";

import "./index.scss";

interface ICoordinates {
  lat: number | undefined;
  lon: number | undefined;
}

const LayoutAdminComponent = () => {
  const { isModalOpened: isModalSearchOpened, toggle: setModalOpened } =
    useModal();
  const {
    isModalOpened: isModalSettingsOpened,
    toggle: setModalSettingsOpened,
  } = useModal();
  const [isShowSideMenu, setShowSideMenu] = useState(false);
  let initialCurrentCoordites = {
    lat: 48.866667,
    lon: 2.333333,
  };
  const [currentCoordinates, setIsCurrentCoordinates] = useState<ICoordinates>(
    initialCurrentCoordites
  );
  const dispatch = UseAppDispatch();
  const toggleSideMenu = () => {
    setShowSideMenu(!isShowSideMenu);
  };
  const getUserDashboard = async () => {
    await dispatch(getUser());
  };

  useEffect(() => {
    //getUserInformation
    try {
      getUserDashboard();
    } catch (err) {
      // console.error(err);
    }
  }, []);

  return (
    <div
      className={`main-wrapper-current ${
        isShowSideMenu ? "side-menu-opened" : ""
      }`}
    >
      <SideBarAdmin isShowSideMenu={isShowSideMenu} />
      <div className={`wrap-main-content`}>
        <HeaderAdmin isShowSideMenu toggleSideMenu={toggleSideMenu} />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
  // } else {
  //   return (
  //     <div className="main-wrapper-current">
  //       <HeaderMobile
  //         showSearchModal={setModalOpened}
  //         showSettingsModal={setModalSettingsOpened}
  //       />
  //       <main>
  //         <Outlet />
  //       </main>

  //       <CommonModalComponent
  //         isModalOpened={isModalSearchOpened}
  //         hide={setModalOpened}
  //       >
  //         <SearchCityComponent />
  //       </CommonModalComponent>

  //       <CommonModalComponent
  //         isModalOpened={isModalSettingsOpened}
  //         hide={setModalSettingsOpened}
  //       >
  //         <SettingsComponent />
  //       </CommonModalComponent>
  //     </div>
  //   );
  // }
};

export default LayoutAdminComponent;
