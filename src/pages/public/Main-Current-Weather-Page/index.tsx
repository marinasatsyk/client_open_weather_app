import { useEffect, useState, useMemo } from "react";
import { getUser } from "store/thunks/auth";
import { getCurrentWeather } from "store/thunks/currentwheather";
import { UseAppDispatch, UseAppSelector } from "utils/hook";
import CurrentWeatherCommon from "components/Current";
import DailyForecastComponent from "components/DailyForecast";
import RadarWeatherComponent from "components/Radar";
import { getDailyForecastWeather } from "store/thunks/dailyweather";
import { getHourlyForecastWeather } from "store/thunks/hourlyweather";
import HourlyCurrentForecastComponent from "components/HourlyForecast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useMediaQuery } from "react-responsive";
import { Bookmark } from "common/interfaces/auth";
import "./index.scss";

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
  const {
    isLoading: isLoadingUser,
    user,
    error,
  } = UseAppSelector((state) => state.auth);

  const [localError, setLocalError] = useState("");
  const [isDisplayComponents, setIsDisplayComponents] = useState(false);
  const [activeBookmarkM, setActiveBookmarkM] = useState({} as Bookmark);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const memoizedBookmarks = useMemo(() => user.bookmarks, [user.bookmarks]);

  useEffect(() => {
    getUserDashboard();
    setTimeout(() => {
      setIsDisplayComponents(true);
    }, 2000);
  }, []);

  useEffect(() => {
    const activeBookmark =
      memoizedBookmarks && memoizedBookmarks.length
        ? memoizedBookmarks.find((bookmark: Bookmark) => bookmark.isActive)
        : undefined;

    if (activeBookmark) {
      if (
        (Object.keys(activeBookmarkM).length &&
          activeBookmarkM.city._id !== activeBookmark.city._id) ||
        !Object.keys(activeBookmarkM).length
      ) {
        getCoordinates(activeBookmark);
        setActiveBookmarkM(activeBookmark);
      }
    } else {
      getCoordinates();
    }
  }, [memoizedBookmarks]);

  const getUserDashboard = async () => {
    try {
      const userR = await dispatch(getUser());
      if (getUser.fulfilled.match(userR)) {
        //@ts-ignore
        const fullfiledBookmarks = userR.payload.bookmarks;

        const activeBookmark =
          fullfiledBookmarks?.length > 0 &&
          fullfiledBookmarks.some((bookmark: Bookmark) => bookmark.isActive)
            ? fullfiledBookmarks.filter(
                (bookmark: Bookmark) => bookmark.isActive
              )[0]
            : null;
        getCoordinates(activeBookmark);
      } else if (getUser.rejected.match(userR)) {
        const error = (userR.payload as { error: string }).error;
        setLocalError(error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getFuncDashboardWeather = async (lat: string, lon: string) => {
    try {
      const promises = [
        () => dispatch(getCurrentWeather({ lat, lon })),
        () => dispatch(getDailyForecastWeather({ lat, lon })),
        () => dispatch(getHourlyForecastWeather({ lat, lon })),
      ];

      await Promise.all(promises.map((promiseFunction) => promiseFunction()));
      //forecast houryly here
      setCurrentCoordinates({ lat: Number(lat), lon: Number(lon) });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * GOAL=> get data weather by my server
   * 1. verify if bookmarks
   *  yes => get Active bookmark
   *  no =>
   * 2. use Paris coordinates
   */

  async function getCoordinates(activeBookmark: Bookmark | null = null) {
    let currentActiveBookmark = {
      lat: "",
      lon: "",
    };

    if (activeBookmark && Object.keys(activeBookmark).length) {
      //case#1 we have active bookmark
      const { lat, lon } = activeBookmark.city;
      currentActiveBookmark.lat = String(lat);
      currentActiveBookmark.lon = String(lon);
    } else {
      //case#2 we use default coordinates
      currentActiveBookmark.lat = String(DEFAUT_COORDINATES.lat);
      currentActiveBookmark.lon = String(DEFAUT_COORDINATES.lon);
    }
    //TODO geolocation navigator functionality
    if (Object.keys(currentActiveBookmark).length) {
      await getFuncDashboardWeather(
        String(currentActiveBookmark?.lat),
        String(currentActiveBookmark?.lon)
      );
    }
  }

  if (!isDisplayComponents) {
    return (
      <FontAwesomeIcon
        icon={icon({ name: "spinner", style: "solid" })}
        spin
        className="spinner-current"
        style={{ fontSize: "30px" }}
      />
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
