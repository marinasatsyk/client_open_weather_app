import React, { useEffect, useState } from "react";
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
import { faker } from "@faker-js/faker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { format } from "date-fns";
import "./index.scss";
import { UseAppSelector } from "utils/hook";
import { WeatherDataFH } from "common/interfaces/auth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getHour = (unixTimestamp: number) => {
  const inputDate = new Date(unixTimestamp * 1000);
  return format(inputDate, "HH[h]");
};

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
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    // y: {
    //   type: "linear" as const,
    //   display: true,
    //   position: "left" as const,
    // },
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

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const dataEx = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//       yAxisID: "y",
//     },
//   ],
// };

enum WeatherDataKeys {
  TEMP = "temp",
  FEELS_LIKE = "feels_like",
  PRESSURE = "pressure",
  HUMIDITY = "humidity",
  WIND = "wind",
  VISIBILITY = "visibility",
  POP = "pop",
}

type MainWeatherData = {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
};

type WeatherData = {
  dt: number;
  main: MainWeatherData;
  wind: {
    speed: number;
  };
  visibility: number;
  pop: number;
};

type WeatherDataKeysUnion = keyof WeatherData | keyof MainWeatherData;

type ChartData = {
  data: number[];
  labels: string[];
  min?: number;
  max?: number;
};
export function ChartComponentHouryly() {
  const {
    error,
    isLoading,
    data: dataR,
  } = UseAppSelector((state) => state.hourlyForecast);
  const [isDisabledPrevBtn, setIsDisabledPrevBtn] = useState(false);
  const [isDisabledNextBtn, setIsDisabledNextBtn] = useState(false);
  const [currentIndexData, setCurrentIndexData] = useState(0);
  const [currentKey, setCurrentKey] = useState<WeatherDataKeys>(
    WeatherDataKeys.TEMP
  );
  const [chartData, setChartData] = useState<ChartData>({
    data: [],
    labels: [],
  });
  /**
   * data complete
   * dataset à montrer: commence par 0 et montré par 24 h
   *
   * sur click next on glisse à 24 , la date est ajouté
   */

  useEffect(() => {
    // Chargement initial des données
    updateChartData();
  }, []);

  //Select function to use

  const filterData = (
    index: number,
    data: WeatherData[],
    key: WeatherDataKeys
  ) => {
    if (index < 0 || index >= data.length) {
      console.error("Index out of range");
      return {
        data: [],
        labels: [],
        min: undefined,
        max: undefined,
      };
    }

    if ("main" in data[0] && key in data[0].main) {
      return filterMainData(index, data, key as keyof MainWeatherData);
    } else {
      return filterOtherData(index, data, key as keyof WeatherData);
    }
  };

  const filterMainData = (
    index: number,
    data: WeatherData[],
    key: keyof MainWeatherData
  ) => {
    const filteredData = data.slice(index, index + 12).map((item) => ({
      timestamp: item.dt * 1000,
      value: item.main[key] as number,
    }));

    const values = filteredData.map((item) => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const labels = filteredData.map((item) => {
      const date = new Date(item.timestamp);
      return `${date.getHours()}H`;
    });

    return {
      data: filteredData,
      labels: labels,
      min: minValue,
      max: maxValue,
    };
  };

  const filterOtherData = (
    index: number,
    data: WeatherData[],
    key: keyof WeatherData
  ) => {
    const filteredData = data.slice(index, index + 12).map((item) => ({
      timestamp: item.dt * 1000,
      value: item[key] as number,
    }));

    const values = filteredData.map((item) => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const labels = filteredData.map((item) => {
      const date = new Date(item.timestamp);
      return `${date.getHours()}H`;
    });

    return {
      data: filteredData,
      labels: labels,
      min: minValue,
      max: maxValue,
    };
  };

  const handlePrev = () => {
    if (currentIndexData >= 12) {
      setCurrentIndexData(currentIndexData - 12);
      updateChartData();
    }
  };

  const handleNext = () => {
    if (currentIndexData + 12 < dataR.list.length) {
      setCurrentIndexData(currentIndexData + 12);
      updateChartData();
    }
  };

  const updateChartData = () => {
    const { data, labels, min, max } = filterData(
      currentIndexData,
      dataR.list,
      currentKey
    );

    console.log("data from chart js", data, labels);

    const dataForChart = data.map((item) => item.value);
    console.log(dataForChart);
    setChartData({ data: dataForChart, labels, min, max });
    // Mettez à jour votre state ou effectuez toute autre logique nécessaire avec les données filtrées
  };

  /**
   * Function for DATA CHART
   */

  const dataChart = {
    labels: chartData.labels,
    datasets: [
      {
        label: currentKey,
        data: chartData.data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={dataChart} />
      <div className="btn-container">
        <div className="wrap-left-btn" onClick={() => handlePrev()}>
          <FontAwesomeIcon
            icon={icon({ name: "circle-chevron-left", style: "solid" })}
          />
        </div>
        <div className="wrap-right-btn" onClick={() => handleNext()}>
          <FontAwesomeIcon
            icon={icon({ name: "circle-chevron-right", style: "solid" })}
          />
        </div>
      </div>
    </>
  );
}

export default ChartComponentHouryly;
