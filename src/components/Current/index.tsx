import HeaderScreen from 'components/Headers/HeaderScreen';
import HeaderMobile from 'components/Headers/HeaderMobile';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import "./index.scss";
import SideBarComponent from 'components/SideBar';
import ModalComponent from 'components/ModalComponent';
import AuthService from 'services/AuthService';
import { jwtDecode } from "jwt-decode";
import { UseAppDispatch } from 'utils/hook';
import { getUser } from 'store/thunks/auth';
import { IFullUser } from 'common/interfaces/auth';
import { Cookies } from 'react-cookie';

interface ICoordinates {
  lat: number | undefined
  lon: number | undefined;
}  
interface IJWTPayload {
  id:string
}

const DesktopComponent = () => <div>Contenu pour les écrans de bureau</div>;
const MobileComponent = () => <div>Contenu pour les écrans mobiles</div>;


export const DashboardCurrentComponent = () => {
 
  let initialCurrentCoordites = {
    lat: 48.866667,
    lon: 2.333333,
  }
  const [currentCoordinates, setIsCurrentCoordinates] = useState<ICoordinates>(initialCurrentCoordites)
  const dispatch = UseAppDispatch();
  const handleClick = async(e: {preventDefault: () => void}) => {
    
try{
  await  dispatch(getUser());
}catch{

}
    //token
    // let clientToken = "";
    // const refreshToken = localStorage.getItem("token");

    // if (localStorageToken) {
    //   clientToken = localStorageToken;
    // } else if (sessionStorageToken) {
    //   clientToken = sessionStorageToken;
    // }
    
    
    
    
    // try{
    //   const decoded: IFullUser = await jwtDecode(id_cookie);
    //   console.log("token decoded!!!", decoded)
    //   await  dispatch(getUser(decoded));
        
    // }catch(err){
    //   console.log("error when get user", err)
    // }

    
     

  }


  useEffect(() => {



    //if no permission for geo browser => Paris information
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
      <div className='main-wrapper-current'>
        <SideBarComponent />
        <div className='wrap-main-content'>
              <HeaderScreen  />
              <main>
                  <button className='magic-btn' onClick={(e) => handleClick(e)}></button>
                  <DesktopComponent />
              </main>
        </div>
      </div>
    )
  }else{
    return (
        <div className='main-wrapper-current'>
          <HeaderMobile city={'Paris, France'}/>
          <main>
            <MobileComponent />
              <p>Dashboard</p>
          </main>
          <ModalComponent />
        </div>
    );
  }
}



