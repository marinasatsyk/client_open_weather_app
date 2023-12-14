import React from "react";
import { useMediaQuery } from "react-responsive";
import ScreenHourlyForecastComponent from "./screenHourly";
import MobileHourlyForecastComponent from "./mobileHourly";
import { UseAppSelector } from "utils/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const HourlyCurrentForecastComponent = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (!isDesktop) {
    return <MobileHourlyForecastComponent />;
  } else {
    return <ScreenHourlyForecastComponent />;
  }
};

export default HourlyCurrentForecastComponent;
