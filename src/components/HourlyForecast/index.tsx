import React from 'react'
import { useMediaQuery } from 'react-responsive';
import ScreenHourlyForecastComponent from './screenHourly';
import MobileHourlyForecastComponent from './mobileHourly';

const HourlyCurrentForecastComponent = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 }); 
 
 if(!isDesktop) {
     return (
      <MobileHourlyForecastComponent /> 
     )
    } else{
        return (
          <ScreenHourlyForecastComponent />
        )
    }
}

export default HourlyCurrentForecastComponent