import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import { geoOptionType } from "common/types/geo";
import { UseAppDispatch, UseAppSelector, UseBookmarks } from "utils/hook";
import {
  deleteBookmark,
  updateActiveBookmark,
  updateBookmarks,
} from "store/thunks/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Toggle from "components/ToggleComponent";
import { getCurrentWeather } from "store/thunks/currentwheather";
import { getDailyForecastWeather } from "store/thunks/dailyweather";
import { getHourlyForecastWeather } from "store/thunks/hourlyweather";
import { useLocation } from "react-router-dom";
import "./index.scss";

const { REACT_APP_URI_OPEN_GEO_WEATHER, REACT_APP_STUDENT_API_FREE_key } =
  process.env;

const LIMIT = 5;

export const SearchCityComponent = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setSity] = useState<geoOptionType | null>(null);
  const { error, isLoading } = UseAppSelector((state) => state.auth);
  const [isTrackHistory, setIsTrackHistory] = useState(false);
  const [isShowHistoryBlock, setIsShowHistoryBlock] = useState(false);

  const dispatch = UseAppDispatch();
  const bookmarks = UseBookmarks();
  const location = useLocation();

  const handleToggleIsTrackHistory = () => {
    setIsTrackHistory(!isTrackHistory);
  };

  const getSearchOptions = async (value: string) => {
    try {
      const result = await axios.get(
        `${REACT_APP_URI_OPEN_GEO_WEATHER}?q=${value}&limit=${LIMIT}&appid=${REACT_APP_STUDENT_API_FREE_key}`
      );
      const citiesData = result.data;
      setOptions(citiesData);
    } catch (err) {
      console.error("error of getting geo data");
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setIsShowHistoryBlock(false);
    setIsTrackHistory(false);
    setInputValue(value);
    if (value === "") {
      setOptions([]);
      return;
    }
    getSearchOptions(value);
  };

  const getWeatherData = async (city: geoOptionType) => {
    try {
      const updateBookmarksPayload = {
        city,
        isHistory: isTrackHistory,
        isActive: false, //define if city by default
      };
      await dispatch(updateBookmarks(updateBookmarksPayload));
      setInputValue("");
      setSity(null);
      setIsShowHistoryBlock(false);
      setIsTrackHistory(false);
    } catch (err) {
      // console.error(err);
    }
  };

  const onSubmit = async () => {
    if (!city) {
      return;
    }
    await getWeatherData(city);
  };

  const handleClickActive = async (
    index: number,
    cityId: string,
    cityLat: number,
    cityLon: number
  ) => {
    //updateBookmarkState
    try {
      await dispatch(updateActiveBookmark({ cityId }));

      if (cityLat && cityLon) {
        const data = {
          lat: String(cityLat),
          lon: String(cityLon),
        };

        const promises = [
          () => dispatch(getCurrentWeather(data)),
          () => dispatch(getDailyForecastWeather(data)),
          () => dispatch(getHourlyForecastWeather(data)),
        ];

        if (location.pathname.includes("current")) {
          await Promise.all(
            promises.map((promiseFunction) => promiseFunction())
          );
        } else if (location.pathname.includes("history")) {
          //for historical page
        }
      }
    } catch (err) {
      // console.error(err);
    }
  };

  const handleDeleteCityBookmark = async (cityId: string) => {
    try {
      await dispatch(deleteBookmark({ cityId }));
    } catch (err) {
      // console.error("error deleting bookmark");
    }
  };

  const onOptionSelect = (option: geoOptionType) => {
    setSity(option);
    setIsShowHistoryBlock(true);
  };

  useEffect(() => {
    if (city) {
      setInputValue(city.name);
      setOptions([]);
    }
  }, [city]);

  return (
    <div className="main-search-city">
      <section className="search-city-wrapper">
        <div className="wrap-input">
          <div className="container-search-block">
            <div className="wrap-bar-search relative">
              <input
                type="text"
                onChange={onInputChange}
                value={inputValue}
                className="input-search-bar-cities"
              />
              {options.length ? (
                <ul className="absolute" role="tablist">
                  {options.map((option: geoOptionType, index) => (
                    <li
                      key={option.name + "-" + index}
                      aria-controls={option.name + "-" + index}
                      className="options"
                    >
                      <button
                        title={option.name}
                        onClick={() => onOptionSelect(option)}
                      >
                        {option.name}, {option.country}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <></>
              )}
            </div>
            <button className="search-cities-btn" onClick={onSubmit}>
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin className="spinner" />
              ) : (
                "Add"
              )}
            </button>
          </div>
          {isShowHistoryBlock && (
            <>
              <Toggle
                isChecked={isTrackHistory}
                onToggleChange={handleToggleIsTrackHistory}
                label="Track history data"
              />
              <p>
                Historical data recovery will take a few minuts, be patient
                please
              </p>
            </>
          )}
        </div>

        <>
          {bookmarks && bookmarks?.length ? (
            bookmarks.map((bookmark, index) => {
              return (
                <div className="wrap-followed-city" key={bookmark.city._id}>
                  <div
                    className={`followed-city ${bookmark.isActive && "active"}`}
                    onClick={() =>
                      handleClickActive(
                        index,
                        bookmark.city._id,
                        bookmark.city.lat,
                        bookmark.city.lon
                      )
                    }
                  >
                    <div>
                      <span>
                        {bookmark.city.name}, {bookmark.city.country}
                      </span>
                      {bookmark.isFollowHistory && (
                        <span className="history-mark">
                          <FontAwesomeIcon
                            icon={icon({
                              name: "helicopter-symbol",
                              style: "solid",
                            })}
                          />
                        </span>
                      )}
                    </div>
                  </div>

                  <FontAwesomeIcon
                    className="close-icon"
                    title="history is tracked"
                    aria-description="history data is available"
                    icon={icon({ name: "circle-xmark", style: "regular" })}
                    onClick={() => handleDeleteCityBookmark(bookmark.city._id)}
                  />
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      </section>
    </div>
  );
};
