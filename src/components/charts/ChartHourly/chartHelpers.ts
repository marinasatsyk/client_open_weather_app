import { format } from "date-fns";
import * as moment from "moment-timezone";
import * as countries from "countries-and-timezones";
import tz_lookup from "tz-lookup";

const getHour = (unixTimestamp: number) => {
  const inputDate = new Date(unixTimestamp * 1000);
  return format(inputDate, "HH[h]");
};

// moment.tz.add("CustomTimeZone|28800|0|");

// export function getHoursFromUnixTime(
//   unixTime: number,
//   timeZone: string = "CustomTimeZone"
// ): string {
//   console.log("timeZone", timeZone);

//   const date = moment.unix(unixTime).tz(timeZone);
//   return date.format("HH[h]");
// }

function offsetToTimezoneByCoord(lat: number, lon: number): string {
  const timeZone: string = moment.tz.guess(true); // Get the default timezone
  const countryFinded = tz_lookup(lat, lon);
  if (countryFinded) {
    return countryFinded;
  } else {
    return timeZone;
  }
}

export function getHoursFromUnixTime(
  unixTime: number,
  lat: number,
  lon: number
): string {
  const timeZone: string = offsetToTimezoneByCoord(lat, lon);
  const date: moment.Moment = moment.unix(unixTime).tz(timeZone);
  return date.format("HH[h]");
}

export function getDateFromUnixTime(
  unixTime: number,
  lat: number,
  lon: number
): string {
  const timeZone: string = offsetToTimezoneByCoord(lat, lon);
  const date: moment.Moment = moment.unix(unixTime).tz(timeZone);
  return date.format("DD/MM/YYYY");
}

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "we change title ici",
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export enum WeatherDataKeys {
  TEMP = "temp",
  FEELS_LIKE = "feels_like",
  PRESSURE = "pressure",
  HUMIDITY = "humidity",
  WIND = "wind",
  VISIBILITY = "visibility",
  POP = "pop",
}

export type MainWeatherData = {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
};

export type WeatherData = {
  dt: number;
  main: MainWeatherData;
  wind: {
    speed: number;
  };
  visibility: number;
  pop: number;
  timeZone?: number;
};

export type WeatherDataKeysUnion = keyof WeatherData | keyof MainWeatherData;

export type ChartData = {
  data: number[];
  labels: string[];
  min?: number;
  max?: number;
  startDate: string;
  endDate: string;
};

//admin user enum
