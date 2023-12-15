import { UseAppSelector } from "utils/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { format } from "date-fns";
import "./index.scss";
import { useState } from "react";
import ChartComponentHouryly from "components/charts/ChartHourly";
import { WeatherDataKeys } from "components/charts/ChartHourly/chartHelpers";

function ScreenHourlyForecastComponent() {
  const { error, isLoading } = UseAppSelector((state) => state.hourlyForecast);
  const [elementActif, setElementActif] = useState<number>(1);
  const [activeKey, setActiveKey] = useState<WeatherDataKeys>(
    WeatherDataKeys.TEMP
  );

  const handleClickMenuActive = (index: number) => {
    setElementActif(index);

    switch (index) {
      case 1:
        // Comportement pour Élément 1
        console.log("Cliqué sur Élément 1");
        setActiveKey(WeatherDataKeys.TEMP);
        break;
      case 2:
        // Comportement pour Élément 2
        console.log("Cliqué sur Élément 2");
        setActiveKey(WeatherDataKeys.POP);
        break;
      case 3:
        // Comportement pour Élément 3
        console.log("Cliqué sur Élément 3");
        setActiveKey(WeatherDataKeys.WIND);
        break;
      case 4:
        // Comportement pour Élément 3
        console.log("Cliqué sur Élément 3");
        setActiveKey(WeatherDataKeys.PRESSURE);
        break;
      case 5:
        // Comportement pour Élément 3
        console.log("Cliqué sur Élément 3");
        setActiveKey(WeatherDataKeys.HUMIDITY);
        break;
      case 6:
        // Comportement pour Élément 3
        console.log("Cliqué sur Élément 3");
        setActiveKey(WeatherDataKeys.VISIBILITY);
        break;
      case 7:
        // Comportement pour Élément 3
        console.log("Cliqué sur Élément 3");

        break;
      case 8:
        // Comportement pour Élément 3
        console.log("Cliqué sur Élément 3");
        setActiveKey(WeatherDataKeys.FEELS_LIKE);
        break;
      default:
        setActiveKey(WeatherDataKeys.TEMP);
        break;
    }
  };

  return (
    <div className="wrap-screen-container">
      <div className="side-menu">
        <div
          className={`temp icon-container ${
            elementActif === 1 ? "active-icon" : ""
          }`}
          title="temp"
          onClick={() => handleClickMenuActive(1)}
        >
          <FontAwesomeIcon
            icon={icon({ name: "temperature-high", style: "solid" })}
          />
        </div>
        <div
          className={`precipitation icon-container ${
            elementActif === 2 ? "active-icon" : ""
          }`}
          title="precipitation"
          onClick={() => handleClickMenuActive(2)}
        >
          <FontAwesomeIcon
            icon={icon({ name: "cloud-showers-heavy", style: "solid" })}
          />
        </div>
        <div
          className={`wind icon-container ${
            elementActif === 3 ? "active-icon" : ""
          }`}
          title="wind"
          onClick={() => handleClickMenuActive(3)}
        >
          <FontAwesomeIcon icon={icon({ name: "wind", style: "solid" })} />
        </div>
        <div
          className={`pressure icon-container ${
            elementActif === 4 ? "active-icon" : ""
          }`}
          title="pressure"
          onClick={() => handleClickMenuActive(4)}
        >
          <FontAwesomeIcon
            icon={icon({ name: "arrows-down-to-line", style: "solid" })}
          />
        </div>
        <div
          className={`humidity icon-container ${
            elementActif === 5 ? "active-icon" : ""
          }`}
          title="humidity"
          onClick={() => handleClickMenuActive(5)}
        >
          <FontAwesomeIcon icon={icon({ name: "droplet", style: "solid" })} />
        </div>
        <div
          className={`visibility icon-container ${
            elementActif === 6 ? "active-icon" : ""
          }`}
          title="visibility"
          onClick={() => handleClickMenuActive(6)}
        >
          <FontAwesomeIcon icon={icon({ name: "eye", style: "solid" })} />
        </div>
        {/* <div
          className={`quality icon-container ${
            elementActif === 7 ? "active-icon" : ""
          }`}
          title="quality"
          onClick={() => handleClickMenuActive(7)}
        >
          <p>AQI</p>
        </div> */}
        <div
          className={`felt icon-container ${
            elementActif === 8 ? "active-icon" : ""
          }`}
          title="felt"
        >
          <FontAwesomeIcon
            icon={icon({ name: "user-pen", style: "solid" })}
            onClick={() => handleClickMenuActive(8)}
          />
        </div>
      </div>
      <div className="main-container-screen-hourly">
        <h2>Hourly Forecast</h2>
        <div className="wrap-chart-container">
          {isLoading ? (
            <FontAwesomeIcon
              icon={icon({ name: "spinner", style: "solid" })}
              spin
              className="spinner-current"
            />
          ) : (
            <ChartComponentHouryly activeKey={activeKey} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ScreenHourlyForecastComponent;
