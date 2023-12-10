import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWeatherReq } from "common/interfaces/auth";
import WeatherService from "services/Weather";


export const getCurrentWeather = createAsyncThunk(
    "weather/current",
    async (data: IWeatherReq, {rejectWithValue})=> {
    try {
            console.log("dataget CurrentWeather Thunk!!!", data)
            const currentWeather = await WeatherService.getCurrentWheather( data.lat,data.lon)
            // const currentWeather = await AuthService.login(data.email, data.password);
            // manageToken(isRememberMe_r, user.data.accessToken);
            return currentWeather.data;
            } catch (error: any) {
            console.log("getCurrent Weather data", error);
            if (error.response && error.response.data) {
                console.log("axios", error);
        
                return rejectWithValue({ error: error.response.data });
            } else {
                console.log("pas axios");
                return rejectWithValue({ error: error });
            }
        }
    }
)