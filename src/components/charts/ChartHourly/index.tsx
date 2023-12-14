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
  getHoursFromUnixTime,
  options,
} from "./chartHelpers";
import "./index.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
    !isLoading && updateChartData();
  }, []);

  //Select function to use

  const filterData = (
    index: number,
    data: WeatherData[],
    key: WeatherDataKeys,
    lat: number,
    lon: number
  ) => {
    if (!data || !dataR?.list) {
      return {
        data: [],
        labels: [],
        min: undefined,
        max: undefined,
      };
    }
    if (index < 0 || index >= dataR?.list.length) {
      console.error("Index out of range");
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
    const filteredData = data.slice(index, index + 12).map((item) => ({
      // timestamp: item.dt * 1000,
      timestamp: item.dt,
      // timeZone: item.timeZone,
      value: item.main[key] as number,
    }));

    const values = filteredData.map((item) => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const labels = filteredData.map((item) => {
      // const date = new Date(item.timestamp);
      // return `${date.getHours()}h`;
      return getHoursFromUnixTime(item.timestamp, lat, lon);
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
    key: keyof WeatherData,
    lat: number,
    lon: number
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
      console.log("*************click prev");
      setCurrentIndexData(currentIndexData - 12);
      updateChartData();
    }
  };

  const handleNext = () => {
    if (currentIndexData + 12 < dataR.list.length) {
      console.log("*************click next");
      setCurrentIndexData(currentIndexData + 12);
      updateChartData();
    }
  };

  const updateChartData = () => {
    console.log("dataR.city.timezone?????????????", dataR);

    if (Object.keys(dataR).length) {
      const { data, labels, min, max } = filterData(
        currentIndexData,
        dataR.list,
        currentKey,
        dataR.city.coord.lat,
        dataR.city.coord.lon
      );
      console.log("data from chart js", data, labels);
      const dataForChart = data.map((item) => item.value);
      console.log(dataForChart);
      setChartData({ data: dataForChart, labels, min, max });
    }
    return;
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
  // if (isLoading) {
  //   return (
  //     <FontAwesomeIcon
  //       icon={icon({ name: "spinner", style: "solid" })}
  //       spin
  //       className="spinner-current"
  //     />
  //   );
  // } else {
  return (
    <>
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
              text: "we change title ici",
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
              position: "top" as const,
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        }}
        data={dataChart}
      />
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
