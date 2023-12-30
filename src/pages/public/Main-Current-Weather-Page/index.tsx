// import { DashboardCurrentComponent } from 'components/Current'
import { useEffect, useRef, useState } from "react";
import { getUser } from "store/thunks/auth";
import { getCurrentWeather } from "store/thunks/currentwheather";
import { UseAppDispatch, useModal, UseAppSelector } from "utils/hook";
import "./index.scss";
import CurrentWeatherCommon from "components/Current";
import DailyForecastComponent from "components/DailyForecast";
import RadarWeatherComponent from "components/Radar";
import { getDailyForecastWeather } from "store/thunks/dailyweather";
import { getHourlyForecastWeather } from "store/thunks/hourlyweather";
import HourlyCurrentForecastComponent from "components/HourlyForecast";
import { CommonModalComponent } from "components/CommonModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useMediaQuery } from "react-responsive";

interface ICoordinates {
  lat: number | undefined;
  lon: number | undefined;
}

const DEFAUT_COORDINATES = {
  lat: 48.866667,
  lon: 2.333333,
};

const CurrentWeatherComponent = () => {
  const dispatch = UseAppDispatch();
  const [currentCoordinates, setCurrentCoordinates] = useState<ICoordinates>({
    lat: undefined,
    lon: undefined,
  });
  const { bookmarks } = UseAppSelector((state) => state.auth.user);
  const { isLoading } = UseAppSelector((state) => state.auth);
  const {
    isModalOpened: isModalSettingsOpened,
    toggle: setModalSettingsOpened,
  } = useModal();
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const getUserDashboard = async () => {
    console.log("we start get user from dashboard");
    await dispatch(getUser());
  };

  const getFuncDashboardWeather = async (lat: string, lon: string) => {
    console.log("we start get DATA weather");
    await dispatch(getCurrentWeather({ lat, lon }));
    await dispatch(getDailyForecastWeather({ lat, lon }));
    await dispatch(getHourlyForecastWeather({ lat, lon }));

    //forecast houryly here
    setCurrentCoordinates({ lat: Number(lat), lon: Number(lon) });
  };

  /**
   * GOAL=> get data weather by my server
   * 1. verify if bookmarks
   *  yes => get Active bookmark
   *  no =>
   * 2. use Paris coordinates
   */

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      getUserDashboard();

      setTimeout(() => {
        getCoordinates();
      }, 500);
    } else {
      console.log("update?");
    }
    console.log("render dashboard");
  }, []);

  async function getCoordinates() {
    //case#1 we have active bookmark
    let currentActiveBookmark = {
      lat: "",
      lon: "",
    };

    const activeBookmark =
      bookmarks?.length > 0 && bookmarks.some((bookmark) => bookmark.isActive)
        ? bookmarks.filter((bookmark) => bookmark.isActive)[0]
        : null;

    if (activeBookmark && Object.keys(activeBookmark).length) {
      const { lat, lon } = activeBookmark.city;
      // const dataToSet = {
      //   lat: lat,
      //   lon: lon,
      // };
      // console.log("✅dataToSet", dataToSet);
      currentActiveBookmark.lat = String(lat);
      currentActiveBookmark.lon = String(lon);
      console.log(
        "✅currentCoordinates ==> after setCurrent",
        currentCoordinates
      );
    }
    // else if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     const { latitude, longitude } = position.coords;
    //     console.log("🔎browserCoordinates", latitude, longitude);

    //     if (latitude && longitude) {
    //       // setCurrentCoordinates({
    //       //   lon: longitude,
    //       //   lat: latitude
    //       // })
    //       currentActiveBookmark.lat = String(latitude);
    //       currentActiveBookmark.lon = String(longitude);
    //     }
    //   });
    // }
    else {
      console.log("🔎we SET default coordinates", DEFAUT_COORDINATES);
      currentActiveBookmark.lat = String(DEFAUT_COORDINATES.lat);
      currentActiveBookmark.lon = String(DEFAUT_COORDINATES.lon);
    }

    if (Object.keys(currentActiveBookmark).length) {
      console.log(console.log("❤️❤️❤️❤️coordinates", currentActiveBookmark));
      await getFuncDashboardWeather(
        String(currentActiveBookmark?.lat),
        String(currentActiveBookmark?.lon)
      );
    }
  }

  if (isLoading) {
    return (
      <CommonModalComponent
        isModalOpened={isModalSettingsOpened}
        hide={setModalSettingsOpened}
      >
        <FontAwesomeIcon
          icon={icon({ name: "spinner", style: "solid" })}
          spin
          className="spinner-current"
        />
      </CommonModalComponent>
    );
  } else {
    if (isDesktop) {
      return (
        <div className="wrap-main-current-weather">
          <div className="wrap-common-long-daily">
            <section className="current-common-wrap">
              {currentCoordinates.lat && currentCoordinates.lon && (
                <CurrentWeatherCommon
                  lat={currentCoordinates.lat}
                  lon={currentCoordinates.lon}
                />
              )}
            </section>
            <section className="long-daily-forecast">
              <DailyForecastComponent />
            </section>
          </div>
          <div className="wrap-short-forecast-radar">
            <section className="current-short-hourly">
              <HourlyCurrentForecastComponent />
            </section>
            <section className="current-radar">
              {currentCoordinates.lat && currentCoordinates.lon && (
                <RadarWeatherComponent
                  lat={currentCoordinates.lat}
                  lon={currentCoordinates.lon}
                />
              )}
            </section>
          </div>
        </div>
      );
    } else {
      return (
        <div className="wrap-main-current-weather">
          <section className="current-common-wrap">
            {currentCoordinates.lat && currentCoordinates.lon && (
              <CurrentWeatherCommon
                lat={currentCoordinates.lat}
                lon={currentCoordinates.lon}
              />
            )}
          </section>
        </div>
      );
    }
  }
};

export default CurrentWeatherComponent;
