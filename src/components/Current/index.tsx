import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { format } from "date-fns";
import { CommonModalComponent } from "components/CommonModal";
import { UseAppSelector, useModal } from "utils/hook";
import * as moment from "moment-timezone";
import { SunsetSVG } from "components/svg/Sunset";
import { useMediaQuery } from "react-responsive";
import DailyForecastComponent from "components/DailyForecast";
import RadarWeatherComponent from "components/Radar";
import MobileHourlyForecastComponent from "components/HourlyForecast/mobileHourly";
import "./index.scss";

interface ICurrent {
  lat: number;
  lon: number;
}

const CurrentWeatherCommon = (props: ICurrent) => {
  const { error, isLoading, data } = UseAppSelector(
    (state) => state.currentWeather
  );
  const isDesktop = useMediaQuery({ minWidth: 768 });
  // const {bookmarks} = UseAppSelector((state) => state.auth.user);
  const { lat, lon } = props;

  const getDate = () => {
    const date = new Date();
    return format(date, "eeee, d MMMM yyyy");
  };

  function formatUnixTime(
    unixTime: number,
    timeZone: string = moment.tz.guess()
  ): string {
    const date = moment.unix(unixTime).tz(timeZone);
    return date.format("HH:mm");
  }

  const rotationValue = data?.wind?.deg ? data.wind.deg : 0;

  const style = {
    transform: `rotate(${rotationValue}deg)`,
  };

  const getPollutionState = (dataPollution: number) => {
    let pollutionStatus = "";
    switch (dataPollution) {
      case 1:
        pollutionStatus = "Good";
        break;
      case 2:
        pollutionStatus = "Fair";
        break;
      case 3:
        pollutionStatus = "Moderate";
        break;
      case 4:
        pollutionStatus = "Poor";
        break;
      case 5:
        pollutionStatus = "Very Poor";
        break;

      default:
        pollutionStatus = "N/C";
        break;
    }
    return pollutionStatus;
  };

  if (isLoading) {
    return (
      <FontAwesomeIcon
        icon={icon({ name: "spinner", style: "solid" })}
        spin
        className="spinner-current"
      />
    );
  } else {
    if (isDesktop) {
      return (
        <>
          <h2>Current Weather</h2>
          <div className="wrap-containers-main">
            <div className="container-current-data">
              <div className="title-current">
                <div className="title-part">
                  {/**TODO NAME OF CITY */}
                  <h1>
                    {data.name}, {data?.sys?.country ? data?.sys?.country : ""}{" "}
                  </h1>
                  <div className="date">{getDate()}</div>
                </div>
                <div className="description">
                  {data?.weather && data?.weather.length
                    ? data?.weather[0].description
                    : ""}
                </div>
              </div>

              <div className="current-temperature">
                <h1>{data?.main?.temp ? data?.main?.temp : ""}°C</h1>
                <div className="min-max-wrap">
                  <div className="max">
                    <FontAwesomeIcon
                      icon={icon({ name: "arrow-up-9-1", style: "solid" })}
                    />
                    <p>{data?.main?.temp_max ? data.main.temp_max : ""}°C</p>
                  </div>
                  <div className="min">
                    <FontAwesomeIcon
                      icon={icon({ name: "arrow-down-9-1", style: "solid" })}
                    />
                    <p>{data?.main?.temp_min ? data?.main?.temp_min : ""}°C</p>
                  </div>
                </div>
              </div>
              <div className="icon-container">
                <i
                  className={`owi owi-4x owi-fw  owi-${
                    data?.weather && data?.weather.length
                      ? data?.weather[0].icon
                      : ""
                  }`}
                ></i>
              </div>
            </div>
            <div className="wrap-containers">
              <div className="additionals-details">
                <div className="felt current-item">
                  <div className="item-title">
                    <FontAwesomeIcon
                      icon={icon({ name: "user-pen", style: "solid" })}
                      className="icon icon-felt"
                    />
                    <p>Felt</p>
                  </div>
                  <div className="data-content">
                    {data?.main?.feels_like ? data?.main?.feels_like : ""}°C
                  </div>
                </div>
                <div className="visibility current-item">
                  <div className="item-title">
                    <FontAwesomeIcon
                      icon={icon({ name: "eye", style: "solid" })}
                      className="icon icon-visibility"
                    />
                    <p>Visibility</p>
                  </div>
                  <div className="data-content">
                    <p>{data?.visibility ? data?.visibility / 1000 : ""} km</p>
                  </div>
                </div>

                <div className="wind current-item">
                  <div className="item-title">
                    <FontAwesomeIcon
                      icon={icon({ name: "wind", style: "solid" })}
                      className="icon icon-visibility"
                    />
                    <p>Wind</p>
                  </div>
                  <div className="wind-container data-content">
                    <div className="div-wind-cercle">
                      <FontAwesomeIcon
                        className="wind-icon"
                        icon={icon({ name: "arrow-up-long", style: "solid" })}
                        style={style}
                      />
                      <div className="top compas">N</div>
                      <div className="right compas">E</div>
                      <div className="bottom compas">S</div>
                      <div className="left compas">O</div>
                    </div>
                  </div>
                </div>
                <div className="sunset current-item">
                  <div className="item-title">
                    <div className="wrap-svg">
                      <SunsetSVG width={25} height={25} />
                    </div>
                    <p>Sun cycles</p>
                  </div>

                  <div className="data-content">
                    <div className="wrap-sunrise">
                      <span>Sunrise</span>
                      <span>
                        {data?.sys?.sunrise
                          ? formatUnixTime(data?.sys?.sunrise)
                          : "N/C"}
                      </span>
                    </div>
                    <div className="wrap-sunset">
                      <span>Sunset</span>
                      <span>
                        {data?.sys?.sunset
                          ? formatUnixTime(data?.sys?.sunset)
                          : "N/C"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pressure current-item">
                  <div className="item-title">
                    <FontAwesomeIcon
                      icon={icon({
                        name: "arrows-down-to-line",
                        style: "solid",
                      })}
                    />
                    <p>Pressure</p>
                  </div>
                  <div className="data-content">
                    <p>
                      {data?.main?.pressure ? data?.main?.pressure : ""} hPa
                    </p>
                  </div>
                </div>
                <div className="humidity current-item">
                  <div className="item-title">
                    <FontAwesomeIcon
                      icon={icon({ name: "droplet", style: "solid" })}
                    />
                    <p>humidity</p>
                  </div>
                  <div className="data-content">
                    <p>{data?.main?.humidity ? data?.main?.humidity : ""} %</p>
                  </div>
                </div>

                <div className="pollution current-item">
                  <div className="item-title">
                    <h3>AQI</h3>
                    <p>Air quality</p>
                  </div>
                  <div className="data-content">
                    <p>
                      index {data?.pollution?.main && data.pollution.main.aqi}
                    </p>
                    <p>
                      {data?.pollution?.main &&
                        getPollutionState(data.pollution.main.aqi)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="mobile-date">{getDate()}</div>
          <div className="mobile-current-data">
            <div className="icon-temp-wrap">
              <div className="icon-container">
                <i
                  className={`owi owi-4x owi-fw  owi-${
                    data?.weather && data?.weather.length
                      ? data?.weather[0].icon
                      : ""
                  }`}
                ></i>
              </div>
            </div>
            <h1>{data?.main?.temp ? data?.main?.temp : ""}°C</h1>
          </div>
          <div className="description-wrap">
            <div className="feels-like">
              <span className=" secondaire">Feels like</span>
              <span>
                {data?.main?.feels_like ? data?.main?.feels_like : ""}°C
              </span>
            </div>
            <div className="separator">|</div>
            <div className="description">
              <span className="secondaire">
                {data?.weather && data?.weather.length
                  ? data?.weather[0].description
                  : ""}
              </span>
            </div>
          </div>
          <section>
            <MobileHourlyForecastComponent />
          </section>
          <section className="long-daily-forecast">
            <DailyForecastComponent />
          </section>
          <section className="current-radar">
            {lat && lon && <RadarWeatherComponent lat={lat} lon={lon} />}
          </section>
          <section className="detailes-current">
            <div className="horisontal-items">
              <div className="felt current-item">
                <div className="item-title">
                  <FontAwesomeIcon
                    icon={icon({ name: "user-pen", style: "solid" })}
                    className="icon icon-felt"
                  />
                  <p>Felt</p>
                </div>
                <div className="data-content">
                  {data?.main?.feels_like ? data?.main?.feels_like : ""}°C
                </div>
              </div>
              <div className="wind current-item">
                <div className="item-title">
                  <FontAwesomeIcon
                    icon={icon({ name: "wind", style: "solid" })}
                    className="icon icon-visibility"
                  />
                  <p>Wind</p>
                </div>
                <div className="wind-container data-content">
                  <div className="div-wind-cercle">
                    <FontAwesomeIcon
                      className="wind-icon"
                      icon={icon({ name: "arrow-up-long", style: "solid" })}
                      style={style}
                    />
                    <div className="top compas">N</div>
                    <div className="right compas">E</div>
                    <div className="bottom compas">S</div>
                    <div className="left compas">O</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="horisontal-items">
              <div className="pressure current-item">
                <div className="item-title">
                  <FontAwesomeIcon
                    icon={icon({
                      name: "arrows-down-to-line",
                      style: "solid",
                    })}
                  />
                  <p>Pressure</p>
                </div>
                <div className="data-content">
                  <p>{data?.main?.pressure ? data?.main?.pressure : ""} hPa</p>
                </div>
              </div>
              <div className="humidity current-item">
                <div className="item-title">
                  <FontAwesomeIcon
                    icon={icon({ name: "droplet", style: "solid" })}
                  />
                  <p>humidity</p>
                </div>
                <div className="data-content">
                  <p>{data?.main?.humidity ? data?.main?.humidity : ""} %</p>
                </div>
              </div>
            </div>

            <div className="horisontal-items">
              <div className="visibility current-item">
                <div className="item-title">
                  <FontAwesomeIcon
                    icon={icon({ name: "eye", style: "solid" })}
                    className="icon icon-visibility"
                  />
                  <p>Visibility</p>
                </div>
                <div className="data-content">
                  <p>{data?.visibility ? data?.visibility / 1000 : ""} km</p>
                </div>
              </div>

              <div className="sunset current-item">
                <div className="item-title">
                  <div className="wrap-svg">
                    <SunsetSVG width={25} height={25} />
                  </div>
                  <p>Sun cycles</p>
                </div>
                <div className="data-content ">
                  <div className="wrap-sunrise">
                    <span>Sunrise</span>
                    <span>
                      {data?.sys?.sunrise
                        ? formatUnixTime(data?.sys?.sunrise)
                        : "N/C"}
                    </span>
                  </div>
                  <div className="wrap-sunset">
                    <span>Sunset</span>
                    <span>
                      {data?.sys?.sunset
                        ? formatUnixTime(data?.sys?.sunset)
                        : "N/C"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="horisontal-items">
              <div className="pollution current-item">
                <div className="item-title">
                  <h3>AQI</h3>
                  <p>Air quality</p>
                </div>
                <div className="data-content">
                  <p>
                    index {data?.pollution?.main && data.pollution.main.aqi}
                  </p>
                  <p>
                    {data?.pollution?.main &&
                      getPollutionState(data.pollution.main.aqi)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
  }
};

export default CurrentWeatherCommon;
