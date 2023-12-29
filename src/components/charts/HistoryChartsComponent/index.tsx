import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { UseAppSelector } from "utils/hook";
import ChartComponentHouryly from "../ChartHourly";
import {
  WeatherDataKeys,
  WeatherDataSources,
} from "../ChartHourly/chartHelpers";

import "./index.scss";

const HistoryChartsComponent = () => {
  const { isLoading, error } = UseAppSelector(
    (state) => state.hourlyHistoricalWeather
  );

  return (
    <div className="main-hisotry-charts">
      <div className="main-container-screen-hourly">
        <h2>Temperature</h2>
        <div className="wrap-chart-container">
          {isLoading ? (
            <FontAwesomeIcon
              icon={icon({ name: "spinner", style: "solid" })}
              spin
              className="spinner-current"
            />
          ) : (
            <ChartComponentHouryly
              activeKey={WeatherDataKeys.TEMP}
              dataSource={WeatherDataSources.HISTORICAL}
            />
          )}
        </div>
      </div>

      <div className="main-container-screen-hourly">
        <h2>Feels like</h2>
        <div className="wrap-chart-container">
          {isLoading ? (
            <FontAwesomeIcon
              icon={icon({ name: "spinner", style: "solid" })}
              spin
              className="spinner-current"
            />
          ) : (
            <ChartComponentHouryly
              activeKey={WeatherDataKeys.FEELS_LIKE}
              dataSource={WeatherDataSources.HISTORICAL}
            />
          )}
        </div>
      </div>

      <div className="main-container-screen-hourly">
        <h2>Humidity</h2>
        <div className="wrap-chart-container">
          {isLoading ? (
            <FontAwesomeIcon
              icon={icon({ name: "spinner", style: "solid" })}
              spin
              className="spinner-current"
            />
          ) : (
            <ChartComponentHouryly
              activeKey={WeatherDataKeys.HUMIDITY}
              dataSource={WeatherDataSources.HISTORICAL}
            />
          )}
        </div>
      </div>

      <div className="main-container-screen-hourly">
        <h2>Pressure</h2>
        <div className="wrap-chart-container">
          {isLoading ? (
            <FontAwesomeIcon
              icon={icon({ name: "spinner", style: "solid" })}
              spin
              className="spinner-current"
            />
          ) : (
            <ChartComponentHouryly
              activeKey={WeatherDataKeys.PRESSURE}
              dataSource={WeatherDataSources.HISTORICAL}
            />
          )}
        </div>
      </div>
      <div className="main-container-screen-hourly">
        <h2>Wind</h2>
        <div className="wrap-chart-container">
          {isLoading ? (
            <FontAwesomeIcon
              icon={icon({ name: "spinner", style: "solid" })}
              spin
              className="spinner-current"
            />
          ) : (
            <ChartComponentHouryly
              activeKey={WeatherDataKeys.WIND}
              dataSource={WeatherDataSources.HISTORICAL}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryChartsComponent;
