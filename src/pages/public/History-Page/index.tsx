import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { UseAppSelector } from "utils/hook";
import { getUser } from "store/thunks/auth";
import { Bookmark } from "common/interfaces/auth";
import Toggle from "components/ToggleComponent";
import { updateActiveBookmark } from "store/thunks/user";
import DateRangePickerComponent from "components/DateRangePickerComponent";
import { getHourlyHistoricalWeather } from "store/thunks/historyweather";
import HistoryChartsComponent from "components/charts/HistoryChartsComponent";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./index.scss";

const HistoryWeatherComponent = () => {
  const { user, isLoading } = UseAppSelector((state) => state.auth);
  const {
    data: historicalData,
    isLoading: ishistoricalLoading,
    error: historicalError,
  } = UseAppSelector((state) => state.hourlyHistoricalWeather);

  const [activeBookmark, setActiveBookmark] = useState({} as Bookmark);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const [currentStartDate, setCurrentStartDate] = useState("");
  const [currentEndDate, setCurrentEndDate] = useState("");
  const [isDisplayGraphs, setIsDisplayGraphs] = useState(false);
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
      console.log("😊😊😊😊active bookmark change");
      setActiveBookmark(activeBookmark);
      setIsDisplayGraphs(false);
    }
  }, [memoizedBookmarks]);

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

        setCurrentStartDate(`${format(transformedStartDate, "dd/MM/yyyy")}`);
        setCurrentEndDate(`${format(transformedEndDate, "dd/MM/yyyy")}`);
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

  const getDate = () => {
    const date = new Date();
    return format(date, "eeee, d MMMM yyyy");
  };
  console.log("memoizedBookmarks", memoizedBookmarks);

  if (isLoading || ishistoricalLoading) {
    return (
      <FontAwesomeIcon
        icon={icon({ name: "spinner", style: "solid" })}
        spin
        className="spinner-current"
        style={{ fontSize: "30px" }}
      />
    );
  } else {
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
                  <div
                    className="wrap-from-main-history"
                    key={bookmark.city._id}
                  >
                    {!isDisplayGraphs && (
                      <DateRangePickerComponent
                        bookmark={bookmark}
                        handleClickHistory={handleClickHistory}
                        isLoading={ishistoricalLoading}
                      />
                    )}
                    {isDisplayGraphs && (
                      <section className="chart-wrap-all">
                        <div className="title-all-charts">
                          <h3>
                            {activeBookmark.city.name}
                            {", "}
                            {activeBookmark.city.country}{" "}
                            <div className="date">{getDate()}</div>
                          </h3>
                          <h3>
                            Your range is from {currentStartDate} to{" "}
                            {currentEndDate}
                          </h3>
                          <button
                            className="reset"
                            onClick={() => setIsDisplayGraphs(false)}
                          >
                            Reset
                          </button>
                        </div>

                        <HistoryChartsComponent />
                      </section>
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
  }
};

export default HistoryWeatherComponent;
