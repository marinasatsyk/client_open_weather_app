import { UseAppSelector } from "utils/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { getHoursFromUnixTime } from "components/charts/ChartHourly/chartHelpers";

const MobileHourlyForecastComponent: React.FC = () => {
  const { data, error, isLoading } = UseAppSelector(
    (state) => state.hourlyForecast
  );

  const items = data.list || [];
  const city = data.city.coord;
  const itemsToShow = 5;
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (containerRef.current) {
    //   const itemWidth = containerRef.current.clientWidth / itemsToShow;
    //   console.log(
    //     "Largeur de l'élément :",
    //     itemWidth,
    //     "scrollLeft",
    //     containerRef.current.scrollLeft
    //   );
    //   const newScrollLeft = currentIndex * itemWidth;
    //   console.log("newScrollLeft:********", newScrollLeft);
    //   // containerRef.current.scrollLeft = newScrollLeft;
    //   console.log(
    //     "scrollLeft before update🔎",
    //     containerRef.current.scrollLeft
    //   );
    //   containerRef.current.scrollLeft = newScrollLeft;
    //   console.log("scrollLeft after update🔎", containerRef.current.scrollLeft);
    // }
  }, [currentIndex, itemsToShow]);

  const handleNext = () => {
    console.log(
      "click next",
      //@ts-ignore
      containerRef?.current?.clientWidth,
      currentIndex,
      items.length,
      itemsToShow,
      "prevIndex"
    );

    if (currentIndex < items.length - itemsToShow) {
      console.log("Clic sur Next", currentIndex);
      setCurrentIndex((prevIndex) => {
        console.log(prevIndex);
        return prevIndex + 1;
      });
    }
  };

  const handlePrev = () => {
    console.log("Clic sur Prev", currentIndex);
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };
  const currentElementsToShow = items.slice(
    currentIndex,
    currentIndex + itemsToShow
  );
  console.log("currentElementsToShow", currentElementsToShow);
  return (
    <>
      <div
        style={{
          overflowX: "auto",
          position: "relative",
          maxWidth: "380px",
          margin: "0 auto",
        }}
      >
        <div
          ref={containerRef}
          style={{
            display: "flex",
            width: "100%",
            transition: "transform 0.5s ease",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                flex: `0 0 ${100 / itemsToShow}%`,
                boxSizing: "border-box",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
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
      {/* <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        style={{
          position: "absolute",
          left: 5,
          transform: "translateY(-235%)",
          background: "none",
        }}
      >
        <FontAwesomeIcon
          icon={icon({ name: "circle-chevron-left", style: "solid" })}
          style={{
            color: "white",
            fontSize: "25px",
          }}
        />
      </button>
      <button
        onClick={handleNext}
        disabled={currentIndex >= items.length - itemsToShow}
        style={{
          position: "absolute",
          right: 5,
          transform: "translateY(-235%)",
          background: "none",
        }}
      > 
        <FontAwesomeIcon
          icon={icon({ name: "circle-chevron-right", style: "solid" })}
          style={{
            color: "white",
            fontSize: "25px",
          }}
        />
      </button>*/}
    </>
  );
};

export default MobileHourlyForecastComponent;
