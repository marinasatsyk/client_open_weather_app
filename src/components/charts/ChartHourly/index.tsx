import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { UseAppSelector } from "utils/hook";
import { WeatherDataFH } from "common/interfaces/auth";
import {
  ChartData,
  MainWeatherData,
  WeatherData,
  WeatherDataKeys,
  getDateFromUnixTime,
  getHoursFromUnixTime,
  options,
  WeatherDataSources,
} from "./chartHelpers";
import "./index.scss";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.color = "#fff";

type ChartObject = {
  labels: string[];
  values: number[];
  ranges: {
    from: string;
    to: string;
  };
};

export function ChartComponentHouryly(props: {
  activeKey: WeatherDataKeys;
  dataSource: string;
}) {
  const {
    error,
    isLoading,
    data: dataSourceForecast,
  } = UseAppSelector((state) => state.hourlyForecast);

  const {
    error: historyError,
    isLoading: historyIsLoading,
    data: dataSourceHistorical,
  } = UseAppSelector((state) => state.hourlyHistoricalWeather);

  const [isDisabledPrevBtn, setIsDisabledPrevBtn] = useState(false);
  const [isDisabledNextBtn, setIsDisabledNextBtn] = useState(false);
  const [currentIndexData, setCurrentIndexData] = useState(0);

  const { activeKey: currentKey, dataSource: currentDataSource } = props;

  //we define data source for show chart
  let dataSourceForDisplay: any; //to change

  switch (currentDataSource) {
    case WeatherDataSources.FORECAST:
      dataSourceForDisplay = dataSourceForecast;
      break;
    case WeatherDataSources.HISTORICAL:
      dataSourceForDisplay = dataSourceHistorical;
      break;
    default:
      dataSourceForDisplay = dataSourceForecast;
      break;
  }

  const [chartData, setChartData] = useState<ChartData>({
    data: [],
    labels: [],
    startDate: "",
    endDate: "",
  });

  /**
   * data complete
   * dataset à montrer: commence par 0 et montré par 24 h
   *
   * sur click next on glisse à 24 , la date est ajouté
   */

  useEffect(() => {
    // Chargement initial des données
    !isLoading && updateChartData();
  }, [currentKey, currentIndexData]);

  //Select function to use

  const filterData = (
    index: number,
    data: WeatherData[],
    key: WeatherDataKeys,
    lat: number,
    lon: number
  ) => {
    if (!data || !dataSourceForDisplay?.list) {
      return {
        data: [],
        labels: [],
        min: undefined,
        max: undefined,
      };
    }
    if (index < 0 || index >= dataSourceForDisplay?.list.length) {
      return {
        data: [],
        labels: [],
        min: undefined,
        max: undefined,
      };
    }

    if ("main" in data[0] && key in data[0].main) {
      return filterMainData(
        index,
        data,
        key as keyof MainWeatherData,
        lat,
        lon
      );
    } else {
      return filterOtherData(index, data, key as keyof WeatherData, lat, lon);
    }
  };

  const filterMainData = (
    index: number,
    data: WeatherData[],
    key: keyof MainWeatherData,
    lat: number,
    lon: number
  ) => {
    const filteredData = data.slice(index, index + 24).map((item) => ({
      timestamp: item.dt,
      value: item.main[key] as number,
    }));

    const values = filteredData.map((item) => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const labels = filteredData.map((item) => {
      return getHoursFromUnixTime(item.timestamp, lat, lon);
    });

    const sortedTimestamps = filteredData.sort(
      (a, b) => a.timestamp - b.timestamp
    );
    const startDate = moment
      .unix(sortedTimestamps[0].timestamp)
      .format("D MMM YYYY");
    const endDate = moment
      .unix(sortedTimestamps[sortedTimestamps.length - 1].timestamp)
      .format("D MMM YYYY");

    return {
      data: filteredData,
      labels: labels,
      min: minValue,
      max: maxValue,
      startDate,
      endDate,
    };
  };

  const filterOtherData = (
    index: number,
    data: WeatherData[],
    key: keyof WeatherData,
    lat: number,
    lon: number
  ) => {
    const filteredData = data.slice(index, index + 24).map((item) => ({
      timestamp: item.dt,
      value:
        key !== "wind" ? (item[key] as number) : (item[key].speed as number),
    }));

    const values =
      key !== "wind"
        ? filteredData.map((item) => item.value)
        : filteredData.map((item) => item.value);

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const labels = filteredData.map((item) => {
      return getHoursFromUnixTime(item.timestamp, lat, lon);
    });

    const sortedTimestamps = filteredData.sort(
      (a, b) => a.timestamp - b.timestamp
    );
    const startDate = moment
      .unix(sortedTimestamps[0].timestamp)
      .format("D MMM YYYY");
    const endDate = moment
      .unix(sortedTimestamps[sortedTimestamps.length - 1].timestamp)
      .format("D MMM YYYY");

    return {
      data: filteredData,
      labels: labels,
      min: minValue,
      max: maxValue,
      startDate,
      endDate,
    };
  };

  const handlePrev = () => {
    if (currentIndexData >= 24) {
      setCurrentIndexData(currentIndexData - 24);
      updateChartData();
    }
  };

  const handleNext = () => {
    if (currentIndexData + 24 < dataSourceForDisplay.list.length) {
      setCurrentIndexData(currentIndexData + 24);
      updateChartData();
    }
  };

  const updateChartData = () => {
    //we disable btn when no data for display in nex/prev range
    if (Object.keys(dataSourceForDisplay).length) {
      if (currentIndexData + 24 >= dataSourceForDisplay.list.length) {
        setIsDisabledNextBtn(true);
      } else {
        setIsDisabledNextBtn(false);
      }

      if (currentIndexData < 24) {
        setIsDisabledPrevBtn(true);
      } else {
        setIsDisabledPrevBtn(false);
      }
      //@ts-ignore
      const { data, labels, min, max, startDate, endDate } = filterData(
        currentIndexData,
        dataSourceForDisplay.list,
        currentKey,
        dataSourceForDisplay.city.coord.lat,
        dataSourceForDisplay.city.coord.lon
      );
      const dataForChart = data.map((item) => item.value);
      setChartData({
        data: dataForChart,
        labels,
        min,
        max,
        startDate,
        endDate,
      });
    }

    return;
  };

  /**
   * Function for DATA CHART
   */

  let titleChart = "";
  let chartColor = "rgb(255, 99, 132)";

  switch (currentKey) {
    case WeatherDataKeys.TEMP:
      titleChart = "Temperature, °C";
      chartColor = "rgb(255, 99, 132)";
      break;
    case WeatherDataKeys.POP:
      titleChart = "Probality of precipitations, %";
      chartColor = "rgb(77, 77, 255)";
      break;
    case WeatherDataKeys.WIND:
      titleChart = "Wind, m/s";
      chartColor = "rgb(224,231,34)";
      break;
    case WeatherDataKeys.PRESSURE:
      titleChart = "Pressure, hPa";
      chartColor = "rgb(68,214,44)";
      break;
    case WeatherDataKeys.HUMIDITY:
      titleChart = "Humidity, %";
      chartColor = "rgb(255,173,0)";
      break;
    case WeatherDataKeys.VISIBILITY:
      titleChart = "Visibility, m";
      chartColor = "rgb(210,39,48)";
      break;
    case WeatherDataKeys.FEELS_LIKE:
      titleChart = "Felt, °C";
      chartColor = "rgb(172,55,238)";
      break;
    default:
      titleChart = "Temperature, °C";
      chartColor = "rgb(255, 99, 132)";
      break;
  }

  const dataChart = {
    labels: chartData.labels,
    datasets: [
      {
        label: titleChart,
        data: chartData.data,
        borderColor: chartColor,
        // backgroundColor: "rgba(255, 99, 132, 0.5)",
        backgroundColor: chartColor,
        yAxisID: "y",
      },
    ],
  };

  return (
    <div className="main-chart-container">
      <div
        className={`wrap-left-btn ${isDisabledPrevBtn && "hidden"}`}
        onClick={() => handlePrev()}
        tabIndex={0}
        onKeyDown={() => handleNext()}
      >
        <FontAwesomeIcon
          icon={icon({ name: "circle-chevron-left", style: "solid" })}
        />
      </div>
      <div className="chart-container">
        <Line
          options={{
            responsive: true,
            interaction: {
              mode: "index" as const,
              intersect: false,
            },
            plugins: {
              title: {
                display: true,
                text: `From ${chartData.startDate} to ${chartData.endDate}`,
                position: "top",
                padding: {
                  bottom: 15,
                },
              },
            },
            scales: {
              x: {
                border: {
                  dash: [3],
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              },
              y: {
                type: "linear" as const,
                display: true,
                position: "right" as const,
                grid: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                border: {
                  dash: [3],
                  color: "white",
                },
              },
            },
          }}
          aria-label="Graph showing temperature changes over time"
          data={dataChart}
        />
      </div>
      <div
        className={`wrap-right-btn ${isDisabledNextBtn && "hidden"}`}
        onClick={() => handleNext()}
        tabIndex={0}
        onKeyDown={() => handleNext()}
      >
        <FontAwesomeIcon
          icon={icon({ name: "circle-chevron-right", style: "solid" })}
        />
      </div>
    </div>
  );
}

export default ChartComponentHouryly;
