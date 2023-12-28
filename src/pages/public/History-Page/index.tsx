import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { UseAppSelector } from "utils/hook";
import { useNavigate } from "react-router-dom";
import { getUser } from "store/thunks/auth";
import { Bookmark, IFullUser } from "common/interfaces/auth";
import Toggle from "components/ToggleComponent";
import "./index.scss";
import { updateActiveBookmark } from "store/thunks/user";
import DateRangePickerComponent from "components/DateRangePickerComponent";
import { getHourlyHistoricalWeather } from "store/thunks/historyweather";

const HistoryWeatherComponent = () => {
  const { user, isLoading } = UseAppSelector((state) => state.auth);
  const {
    data: historicalData,
    isLoading: ishistoricalLoading,
    error: historicalError,
  } = UseAppSelector((state) => state.hourlyHistoricalWeather);

  const [ishistory, setIsHistory] = useState(false);
  const [activeBookmark, setActiveBookmark] = useState({} as Bookmark);
  const [actionError, setActionError] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);

  const [currentStartDate, setCurrentStartDate] = useState("");
  const [currentEndDate, setCurrentEndDate] = useState("");

  const [isDisplayGraphs, setIsDisplayGraphs] = useState(false);
  // /**
  //  * GOAL=> get data weather by my server
  //  * 1. verify if bookmarks
  //  *  yes => get Active bookmark
  //  *  no =>
  //  * 2. Display notification
  //  */

  const memoizedBookmarks = useMemo(() => user.bookmarks, [user.bookmarks]);

  useEffect(() => {
    dispatch<any>(getUser());
  }, [dispatch]);

  useEffect(() => {
    const activeBookmark =
      memoizedBookmarks && memoizedBookmarks.length
        ? memoizedBookmarks.find((bookmark) => bookmark.isActive)
        : "";
    if (activeBookmark) {
      setActiveBookmark(activeBookmark);
    }
  }, [memoizedBookmarks]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function onToggleChange() {
    setIsChecked(!isChecked);
  }

  async function onHandleSubmit(
    e: { preventDefault: () => void },
    cityId: string,
    isHistory: boolean
  ) {
    console.log("save clicked", cityId, isHistory);

    try {
      await dispatch<any>(updateActiveBookmark({ cityId, isHistory }));
    } catch (err) {
      console.error(err);
    }
  }
  const handleClickHistory = async (
    startDate: number, //utc
    endDate: number, //utc
    cityId: string
  ) => {
    console.log(
      "startDate",
      startDate,
      "endDate",
      endDate,
      "cityId",
      cityId,
      "cityLat"
    );

    // Convertir le timestamp en millisecondes

    //updateBookmarkState
    // switch (index) {
    //   case 1:
    //     // Comportement pour Élément 1
    //     console.log('Cliqué sur Élément 1');
    //     break;
    //   case 2:
    //     // Comportement pour Élément 2
    //     console.log('Cliqué sur Élément 2');
    //     break;
    //   case 3:
    //     // Comportement pour Élément 3
    //     console.log('Cliqué sur Élément 3');
    //     break;
    //   default:
    //     break;
    // }

    const reqHistoricalData = {
      cityId,
      startDate,
      endDate,
    };
    try {
      const historicalDataReq = await dispatch<any>(
        getHourlyHistoricalWeather(reqHistoricalData)
      );
      if (getHourlyHistoricalWeather.fulfilled.match(historicalDataReq)) {
        console.log("sucess");
        const transformedStartDate = new Date(startDate * 1000);
        const transformedEndDate = new Date(endDate * 1000);
        setCurrentStartDate(`${transformedStartDate}`);
        setCurrentEndDate(`${transformedEndDate}`);
        setIsDisplayGraphs(true);
      } else if (getHourlyHistoricalWeather.rejected.match(historicalDataReq)) {
        setIsDisplayGraphs(false);
        console.log("error rejected");
        const error = (historicalDataReq.payload as { error: string }).error;
        console.error("Erreur lors de la mise à jour", error);
        // @ts-ignore
        setError(error.message);
      }
    } catch (error) {
      console.error("historical try catch", error);
    }
  };

  console.log("memoizedBookmarks", memoizedBookmarks);
  if (
    (memoizedBookmarks && !memoizedBookmarks.length) ||
    !activeBookmark ||
    !Object.keys(activeBookmark).length
  ) {
    return <div>No active location. Add one</div>;
  }

  return (
    <>
      {memoizedBookmarks.some((b) => b.isActive) &&
        memoizedBookmarks.map((bookmark) => {
          if (bookmark.isActive) {
            if (bookmark.isFollowHistory) {
              return (
                <div className="wrap-from-main-history" key={bookmark.city._id}>
                  {!isDisplayGraphs && (
                    <DateRangePickerComponent
                      bookmark={bookmark}
                      handleClickHistory={handleClickHistory}
                      isLoading={ishistoricalLoading}
                    />
                  )}
                  {isDisplayGraphs && (
                    <div>
                      <div>
                        Your range is from {currentStartDate} to{" "}
                        {currentEndDate}.
                      </div>
                      <div>There is {historicalData.length} records</div>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={bookmark.city._id}
                  className="wrap-change-track history"
                >
                  <div>
                    You have chosen not to follow historical data for
                    <span className="title">{bookmark.city.name}</span>
                    Change the choice?
                  </div>
                  <Toggle
                    isChecked={isChecked}
                    onToggleChange={onToggleChange}
                    label="track history data"
                  />
                  <button
                    className="save-history"
                    onClick={(e) =>
                      onHandleSubmit(e, bookmark.city._id, isChecked)
                    }
                  >
                    Save
                  </button>
                </div>
              );
            }
          }
          return null;
        })}
    </>
  );
};

export default HistoryWeatherComponent;
