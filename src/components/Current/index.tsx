import HeaderScreen from 'components/Headers/HeaderScreen';
import HeaderMobile from 'components/Headers/HeaderMobile';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import "./index.scss";
import SideBarComponent from 'components/SideBar';



interface ICoordinates {
  lat: number | undefined
  lon: number | undefined;
}

const DesktopComponent = () => <div>Contenu pour les écrans de bureau</div>;
const MobileComponent = () => <div>Contenu pour les écrans mobiles</div>;


export const DashboardCurrentComponent = () => {
  let initialCurrentCoordites = {
    lat: 48.866667,
    lon: 2.333333,
  }
  const [currentCoordinates, setIsCurrentCoordinates] = useState<ICoordinates>(initialCurrentCoordites)
  
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
        </div>
    );
  }
}



