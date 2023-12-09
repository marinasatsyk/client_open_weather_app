import HeaderScreen from 'components/Headers/HeaderScreen';
import HeaderMobile from 'components/Headers/HeaderMobile';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SideBarComponent from 'components/SideBar';
import { UseAppDispatch, UseBookmarks, useModal } from 'utils/hook';
import { getUser } from 'store/thunks/auth';
import { CommonModalComponent } from 'components/CommonModal';
import { SearchCityComponent } from 'components/SearchCity';
import  SettingsComponent  from 'components/SettingsComponent';
import "./index.scss";
import { Outlet } from 'react-router-dom';

interface ICoordinates {
  lat: number | undefined
  lon: number | undefined;
}  

const DesktopComponent = () => <div>Contenu pour les écrans de bureau</div>;
const MobileComponent = () => <div>Contenu pour les écrans mobiles</div>;


export const LayoutPublicComponent = () => {


  const {isModalOpened: isModalSearchOpened, toggle:setModalOpened} = useModal();
  const {isModalOpened: isModalSettingsOpened, toggle:setModalSettingsOpened} = useModal();
  const [isShowSideMenu, setShowSideMenu] =  useState(false);
  let initialCurrentCoordites = {
    lat: 48.866667,
    lon: 2.333333,
  }
  const [currentCoordinates, setIsCurrentCoordinates] = useState<ICoordinates>(initialCurrentCoordites)
  const dispatch = UseAppDispatch();
  const handleClick = async(e: {preventDefault: () => void}) => {

  }
  const toggleSideMenu = () =>  {
    console.log("click togle")
    setShowSideMenu(!isShowSideMenu)
  }
  console.log('isShowSideMenu', isShowSideMenu)
  const getUserDashboard =  async() => {
    console.log("we start get user")
    await  dispatch(getUser());
  }

  useEffect(() => {
    console.log("render dashboard")
    //getUserInformation
    try{
      getUserDashboard();
      
    }catch(err){
      console.error(err)
    }
    

    //if no bookmarks active or  permission for geo browser => Paris information
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      const {latitude, longitude} = position.coords;

      console.log("Longitude is :", position);
      if(latitude && longitude){
        setIsCurrentCoordinates({
          lon: longitude,
          lat: latitude
        })
      }
    });
   
  }, []) 

  const isDesktop = useMediaQuery({ minWidth: 768 }); 

  if(isDesktop){
    return(
      <div className={`main-wrapper-current ${isShowSideMenu ? 'side-menu-opened' : ''}`}>
       <SideBarComponent isShowSideMenu={isShowSideMenu}/>
        <div className={`wrap-main-content`}>
              <HeaderScreen  isShowSideMenu toggleSideMenu= {toggleSideMenu}/>
              <main>
                  <button className='magic-btn' onClick={(e) => handleClick(e)}></button>
                 <Outlet />
                  <DesktopComponent />
                 
              </main>
        </div>
      </div>
    )
  }else{
    return (
        <div className='main-wrapper-current'>
          <HeaderMobile 
              showSearchModal={setModalOpened}
              showSettingsModal={setModalSettingsOpened}
            />
            <main>
            <Outlet/>
              <MobileComponent />
                <p>Dashboard</p>
            
            </main>
            <CommonModalComponent  
              isModalOpened={isModalSearchOpened}
              hide={setModalOpened}
              >
              <SearchCityComponent/>
            </CommonModalComponent>
           
            <CommonModalComponent  
              isModalOpened={isModalSettingsOpened}
              hide={setModalSettingsOpened}
              >
              <SettingsComponent/>
            </CommonModalComponent>
        </div>
    );
  }
}



