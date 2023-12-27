import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { UseAppSelector } from "utils/hook";
import { useNavigate } from "react-router-dom";
import { getUser } from "store/thunks/auth";
import { Bookmark, IFullUser } from "common/interfaces/auth";
import Toggle from "components/ToggleComponent";
import "./index.scss";

const HistoryWeatherComponent = () => {
  const { user, isLoading } = UseAppSelector((state) => state.auth);
  const [ishistory, setIsHistory] = useState(false);
  const [activeBookmark, setActiveBookmark] = useState({} as Bookmark);
  const [actionError, setActionError] = useState("");
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);

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
    const activeBookmark = memoizedBookmarks.find(
      (bookmark) => bookmark.isActive
    );
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

  function onHandleSubmit(e: { preventDefault: () => void }) {
    console.log("save clicked");
  }

  const handleClickHisotry = async (
    index: number,
    cityId: string,
    cityLat: number,
    cityLon: number
  ) => {
    //updateBookmarkState
    try {
      // await dispatch(updateActiveBookmark({cityId}));
      // if(cityLat&&cityLon){
      //   const data = {
      //     lat: String(cityLat),
      //     lon: String(cityLon)
      //   }
      //   console.log("we chanched active city", data);
      //   await dispatch(getCurrentWeather(data));
      //   await  dispatch(getDailyForecastWeather(data));
      //   await  dispatch(getHourlyForecastWeather(data));
      // }
    } catch (err) {
      console.error(err);
    }

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
  };

  console.log("memoizedBookmarks", memoizedBookmarks);
  if (
    !memoizedBookmarks.length ||
    !activeBookmark ||
    !Object.keys(activeBookmark).length
  ) {
    return <div>No active location. Add one</div>;
  }

  return (
    <>
      {memoizedBookmarks.some((b) => b.isActive) && (
        <div>
          {memoizedBookmarks.map((bookmark) => {
            if (bookmark.isActive) {
              if (bookmark.isFollowHistory) {
                return <div key={bookmark.city._id}>{bookmark.city.name}</div>;
              } else {
                return (
                  <div className="wrap-change-track history">
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
                      onClick={(e) => onHandleSubmit(e)}
                    >
                      Save
                    </button>
                  </div>
                );
              }
            }
            return null;
          })}
        </div>
      )}
    </>
  );
};

export default HistoryWeatherComponent;
