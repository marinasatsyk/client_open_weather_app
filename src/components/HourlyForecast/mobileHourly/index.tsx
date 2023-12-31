import { UseAppSelector } from "utils/hook";
import { useEffect, useRef, useState } from "react";
import { getHoursFromUnixTime } from "components/charts/ChartHourly/chartHelpers";
import "./index.scss";

const MobileHourlyForecastComponent: React.FC = () => {
  const { data, error, isLoading } = UseAppSelector(
    (state) => state.hourlyForecast
  );

  const items = data.list || [];
  const city = data.city.coord;
  const itemsToShow = 5;
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, [currentIndex, itemsToShow]);

  return (
    <>
      <div id="mobile-current-forecast">
        <div ref={containerRef} className="container-mobile-forecast">
          {items.map((item, index) => (
            <div
              key={index}
              className="item-wrap"
              style={{
                flex: `0 0 ${100 / itemsToShow}%`,
              }}
            >
              <div className="time">
                {getHoursFromUnixTime(item.dt, city.lat, city.lon)}
              </div>
              <div className="centre-icon">
                <i
                  className={`owi owi-2x   owi-${
                    item && item.weather ? item?.weather[0].icon : ""
                  }`}
                ></i>
              </div>
              <div className="temp">{item.main.temp}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileHourlyForecastComponent;
