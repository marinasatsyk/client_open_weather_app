import axios from 'axios';
import  './index.scss';
import {useState, ChangeEvent, useEffect} from 'react';
import {geoOptionType} from '../../models/types';
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const {REACT_APP_URI_OPEN_GEO_WEATHER, 
  REACT_APP_STUDENT_API_key, 
  REACT_APP_URI_BODY_WEATHER,
  REACT_APP_CURRENT_WEATHER_PREFIX,
  REACT_APP_CURRENT_WEATHER_KEYWORD,
  REACT_APP_16DAYS_FORECAST_CLIMAT_WEATHER_PREFIX,
  REACT_APP_16DAYS_FORECAST_WEATHER_KEYWORD,
  REACT_APP_30DAYS_CLIMAT_WEATHER_KEYWORD
} = process.env;

const LIMIT = 5;
const UNITS='metric'



const endpointsArr = (option: geoOptionType) => {

  return [
    `https://${REACT_APP_CURRENT_WEATHER_PREFIX}.${REACT_APP_URI_BODY_WEATHER}/${REACT_APP_CURRENT_WEATHER_KEYWORD}?lat=${option.lat}&lon=${option.lon}&appid=${REACT_APP_STUDENT_API_key}&units=${UNITS}`,
    `https://${REACT_APP_16DAYS_FORECAST_CLIMAT_WEATHER_PREFIX}.${REACT_APP_URI_BODY_WEATHER}/${REACT_APP_16DAYS_FORECAST_WEATHER_KEYWORD}?lat=${option.lat}&lon=${option.lon}&appid=${REACT_APP_STUDENT_API_key}&units=${UNITS}`,
     `https://${REACT_APP_16DAYS_FORECAST_CLIMAT_WEATHER_PREFIX}.${REACT_APP_URI_BODY_WEATHER}/${REACT_APP_30DAYS_CLIMAT_WEATHER_KEYWORD}?lat=${option.lat}&lon=${option.lon}&appid=${REACT_APP_STUDENT_API_key}&units=${UNITS}`,
  
  ]
} 
type Props = {
  value: string,
  options: [],
  onInputChange:(e: ChangeEvent<HTMLInputElement>) => void,
  onOptionSelect:(option: geoOptionType) => void,
  onSubmit: () => void
}


export const SearchCityComponent = ({value, options, onInputChange, onOptionSelect, onSubmit} : Props): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);
  const [city, setSity] = useState<geoOptionType | null>(null);
  
  const getSearchOptions = async(value: string) => {
    const result = await axios.get(`${REACT_APP_URI_OPEN_GEO_WEATHER}?q=${value}&limit=${LIMIT}&appid=${REACT_APP_STUDENT_API_key}`)
    const citiesData = result.data;
    setOptions(citiesData)
  }
  

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLocaleLowerCase();
    setInputValue(value)
    if(value ===''){
      setOptions([])
      return
    }
    getSearchOptions(value)
  }

  const getWeatherData = async(city: geoOptionType) => {
    const endpoints = endpointsArr(city);
    const globalDataWeahter = await Promise.all(endpoints.map((endpoint) => axios.get(endpoint)));
    
    const [{data: currentWeather}, {data:hourly16DaysForecast}, {data:climate30Days}] = globalDataWeahter; 
     console.log({currentWeather, hourly16DaysForecast, climate30Days})
    return {currentWeather, hourly16DaysForecast, climate30Days}
  }

  const onSubmit  = async() => {
    if(!city){return}
    await getWeatherData(city)
  }




  const onOptionSelect = (option: geoOptionType) => {
    setSity(option);
  }

    useEffect(() => {
      if(city){
        setInputValue(city.name);
        setOptions([])
      }
    }, [city])

    return (
        <main>

            <section className='search-city-wrapper'>
              <div className="search-city-block">
                 <h2>Weather <span className='text-bold'>Forecast</span></h2>
                <p>Enter below a place you want to know th weather of and select an option from the dropdown </p>
              </div>
                <div className="wrap-input">
                    <div className="wrap-bar-search relative">
                      <input type="text" onChange={ onInputChange} value={inputValue} className='input-search-bar-cities'/>
                      {options.length 
                      ?   <ul className='absolute' role="tablist">
                            {options.map((option : geoOptionType, index) => (
                            <li key={option.name+'-'+index} aria-controls={option.name+'-'+index} className='options'>
                              <button title={option.name} onClick={() => onOptionSelect(option)}>{option.name}, {option.country}</button>
                              </li>
                            ))}
                        </ul>
                      : <></>}
                    </div>
                    <button  className='search-cities-btn' onClick={onSubmit}>Search</button>
                </div>
            </section>
        </main>
  )
}


