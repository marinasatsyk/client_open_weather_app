// import { DashboardCurrentComponent } from 'components/Current'
import {useEffect, useRef, useState} from 'react';
import { getUser } from 'store/thunks/auth';
import { getCurrentWeather } from 'store/thunks/currentwheather';
import { UseAppDispatch, UseBookmarks,UseActiveBookmark,  useModal, UseAppSelector } from 'utils/hook';
import "./index.scss";
//page
interface ICoordinates {
  lat: number | undefined
  lon: number | undefined;
}  

let defaultCoordinate = {
  lat: 48.866667,
  lon: 2.333333,
}

const CurrentWeatherComponent = () => {
  const dispatch = UseAppDispatch();
  const [currentCoordinates, setCurrentCoordinates] = useState<ICoordinates>({lat: undefined, lon: undefined});

  // const { bookmarks } = UseAppSelector((state) => state.auth.user);

   const bookmarks = UseBookmarks();
  
  const getUserDashboard =  async() => {
    console.log("we start get user")
    await  dispatch(getUser());
  }

  const getFuncCurrentWeather =  async(lat: string, lon: string) => {
    console.log("we start get current weather")
    await  dispatch(getCurrentWeather({lat,  lon}));
  }


  // const getBrowserCoodinates = () => {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     const {latitude, longitude} = position.coords;

  //     console.log("Full position :", position);
  //     console.log("Latitude is :", latitude);
  //     console.log("Longitude is :",longitude);

  //     if(latitude && longitude){
  //       setBrowserCoordinates({
  //         lon: longitude,
  //         lat: latitude
  //       })
  //     }
  //   });
  // }



  // const activeBookmark = bookmarks.filter((bookmark) => bookmark.isActive === true);
 
  


  /**
   * GOAL=> get data weather by my server
   * 
   * 1. verify if bookmarks
   * 
   *  yes => get Active bookmark 
   *  
   *  no => 
   * 
   * 2. access to browser's coordinate?
   * 
   *  yes => get coordinates
   *  no => 
   * 
   * 3. use Paris coordinates  
   */


  const isInitialMount = useRef(true);


  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      console.log('🍩', isInitialMount)
      
       getUserDashboard();

       getCoordinates();
    }else{
      console.log("update?")
    }
    console.log("render dashboard")
   
  }, []) 


  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //     console.log('🍩', isInitialMount);
  //     getUserDashboard();
  //   } else {
  //     console.log("update?");
  //   }
  //   console.log("render dashboard");
  // }, []);

  

    async function  getCoordinates ()  {
      //case#1 we have active bookmark
      let currentActiveBookmark = {
        lat: "",
        lon: ""
      };

      const activeBookmark =  
          bookmarks?.length > 0 &&
          bookmarks.some((bookmark) => bookmark.isActive)
        ? 
          bookmarks.filter((bookmark) => bookmark.isActive)[0]
        :  null;  

        console.log("✅actives bookmarks",activeBookmark)

      
      if(activeBookmark && Object.keys(activeBookmark).length){
        const {lat, lon} = activeBookmark.city;

        const dataToSet = {
          lat: lat,
          lon: lon
        };
        console.log("✅dataToSet",dataToSet)

        currentActiveBookmark.lat = String(dataToSet.lat);
        currentActiveBookmark.lon = String(dataToSet.lon);
        
        // setCurrentCoordinates(dataToSet);
        console.log("✅currentCoordinates ==> after setCurrent",currentCoordinates)
        
      }else if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(function(position) {
          const {latitude, longitude} = position.coords;
          console.log("🔎browserCoordinates", latitude, longitude)
    
          if(latitude && longitude){
            // setCurrentCoordinates({
            //   lon: longitude,
            //   lat: latitude
            // })
            currentActiveBookmark.lat = String(latitude);
            currentActiveBookmark.lon = String(longitude);
          }
        });
      }else{
          console.log("🔎we SET default coordinates", defaultCoordinate)
          currentActiveBookmark.lat = String(defaultCoordinate.lat);
          currentActiveBookmark.lon = String(defaultCoordinate.lon);
          // setCurrentCoordinates(defaultCoordinate)
      }


      if(Object.keys(currentActiveBookmark).length){
        console.log(console.log('❤️❤️❤️❤️coordinates', currentActiveBookmark) )
        await  getFuncCurrentWeather(String(currentActiveBookmark?.lat), String(currentActiveBookmark?.lon))
        
      }
    }

    return (
      <div className="wrap-main-current-weather">
        <div className="wrap-common-long-daily">
          <div className='current-common-wrap'>CurrentWeatherComponent</div>
          <div className='long-daily-forecast'>16-day forecast</div>
        </div>
        <div className="wrap-chort-forecast-radar">
          <div className='current-chort-hourly'>Short forecast</div>
          <div className='current-radar'>Radar</div>
        </div>
      </div>
    )
  
}


export default CurrentWeatherComponent