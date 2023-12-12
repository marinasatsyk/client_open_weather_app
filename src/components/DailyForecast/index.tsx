import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { format } from 'date-fns';
import { UseAppSelector } from "utils/hook";
import * as moment from 'moment-timezone';
import "./index.scss";
import { getWindDirection } from "utils/helpers";
import { useState } from "react";


function DailyForecastComponent() {
    const {error , isLoading, data} = UseAppSelector((state) => state.dailyForecast);
    const [expandedSections, setExpandedSections] = useState<boolean[]>([]);

    const handleToggle = (index: number) => {
        const newExpandedSections = [...expandedSections];
        newExpandedSections[index] = !newExpandedSections[index];
        setExpandedSections(newExpandedSections);
    };

     const getDate = (unixTimestamp: number) => {
        const inputDate = new Date(unixTimestamp * 1000); // Convertir le timestamp en millisecondes
        return format(inputDate, 'eee, d MMM');
    };


    


    console.log(data.list)
    if(isLoading){
        return <FontAwesomeIcon  icon={icon({name: 'spinner', style:'solid'})}  spin className='spinner-current'/> 
    }else{
        return (
            <>
            <h2>Forecast For 16  Days</h2>
           <div className="wrap-daily-forecast">
                {data && data?.list?.length
                    ? data?.list.map((forecastElement, index) => (
                        <div key={index} className="wrap-section">
                            <section  className="daily-forecast-item" onClick={() => handleToggle(index)}>
                                <div className="left-side">
                                    <div className="wrap-chevron">
                                            <FontAwesomeIcon   icon={icon({name: 'chevron-down', style:'solid'})}   className={`chevron  ${expandedSections[index] ? 'rotate' : '' }`} />
                                    </div>
                                    <div >{getDate(forecastElement.dt)}</div>
                                </div>

                                <div className="centre-icon">
                                    <i className={`owi owi-2x   owi-${forecastElement?.weather && forecastElement?.weather.length ? forecastElement?.weather[0].icon : ''}`}></i>
                                </div>

                                <div className="right-side">
                                    <div className="max"> 
                                        <FontAwesomeIcon icon={icon({name: "arrow-up", style: "solid"})}/> 
                                        <p>{forecastElement?.temp?.max ? forecastElement.temp.max : ""}°C</p>
                                    </div>
                                    <div className="min">
                                        <FontAwesomeIcon icon={icon({name: "arrow-down", style: "solid"})}/> 
                                        <p>{forecastElement?.temp?.min ? forecastElement?.temp?.min : ""}°C</p>
                                    </div>
                                </div>
                            </section>
                            <div className= {`additional-component  ${expandedSections[index] ? 'expand' : 'collapse'}`}>
                                <div className="temperature-block">
                                    <div className="morgning">
                                        <p className="sub-title">Morning</p>
                                        <div className="reel">Temp {forecastElement.temp.morn} °C</div>
                                        <div className="feels-like">Felt{forecastElement.feels_like.morn} °C</div>
                                    </div>
                                    <div className="day">
                                        <p className="sub-title">Day</p>
                                        <div className="reel">Temp {forecastElement.temp.day} °C</div>
                                        <div className="feels-like">Felt {forecastElement.feels_like.day} °C</div>
                                    </div>
                                    <div className="evening">
                                        <p className="sub-title">Evening</p>
                                        <div className="reel">Temp{forecastElement.temp.eve} °C</div>
                                        <div className="feels-like">Felt {forecastElement.feels_like.eve} °C</div>
                                    </div>
                                    <div className="night">
                                        <p className="sub-title">Night</p>
                                        <div className="reel">Temp{forecastElement.temp.night} °C</div>
                                        <div className="feels-like">Felt {forecastElement.feels_like.night} °C</div>
                                    </div>
                                </div>
                                <div className="other-components">

                                    <div className="precipitations">
                                        <p className="sub-title">Probability of precipitations</p>
                                        <p>{forecastElement.pop*100} %</p>
                                    </div>
                                    <div className="pressure">
                                        <p className="sub-title">Pressure</p>
                                        <p>{forecastElement.pressure} hPa</p>
                                    </div>
                                    <div className="cloudiness">
                                        <p className="sub-title">Cloudiness</p>
                                        <p>{forecastElement.clouds} %</p>
                                    </div>
                                    <div className="humidity">
                                        <p className="sub-title">Humidity</p>
                                        <p>{forecastElement.humidity} %</p>
                                    </div>

                                    
                                </div>

                                <div className="wind-and-other">
                                    <div className="max-speed">
                                        <p className="sub-title">Wind max speed</p>
                                        <p>{forecastElement.speed} meter/sec</p>
                                    </div>
                                    <div className="wind direction">
                                        <p className="sub-title">Wind Direction</p>
                                        <p>{getWindDirection(forecastElement.deg)}</p>
                                    </div>
                                    {forecastElement?.rain&&
                                    <div className="rain">
                                        <p className="sub-title">Rain</p>
                                        <p>{forecastElement.rain} mm</p>
                                    </div>
                                    }
                                    {forecastElement?.snow&&
                                        <div className="snow">
                                            <p className="sub-title">Snow</p>
                                            <p>{forecastElement.snow} mm</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        ))
                    : <div>no forecast data</div>
                }

           </div>
           
            </>
            
        )
    }
}

export default DailyForecastComponent