import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import {
  addDays,
  startOfDay,
  subDays,
  isAfter,
  isBefore,
  getYear,
  endOfYear,
  subYears,
  format,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isValid,
} from "date-fns";
import fr from "date-fns/locale/fr";
import { Bookmark, IreqAvailable } from "common/interfaces/auth";

import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";
import $api from "utils/http";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableHistoryStartDate } from "store/thunks/availableDataHistory";
import { UseAppSelector } from "utils/hook";

registerLocale("fr", fr);

interface DateRangePickerProps {
  bookmark: Bookmark;
  handleClickHistory: (
    startDate: number,
    endDate: number,
    cityId: string
  ) => Promise<void>;
  isLoading: boolean;
}

const DateRangePickerComponent: React.FC<DateRangePickerProps> = ({
  bookmark,
  handleClickHistory,
  isLoading,
}) => {
  const {
    data: availableDataStart,
    isLoading: availableIsLoading,
    error,
  } = UseAppSelector((state) => state.availableHistoricalStart);

  const today = startOfDay(new Date());
  const startDateLimit_base = subYears(addDays(today, 1), 1); // date min for start today - 1 year + 1 day
  console.log("startDateLimit????????????", startDateLimit_base);

  const defineHours = setHours(
    setMinutes(setSeconds(setMilliseconds(today, 0), 0), 0),
    23
  );
  const endDateLimit_base = subDays(defineHours, 1); // today - 1 day

  const [endDateLimit, setEndDateLimit] = useState(endDateLimit_base);
  const [startDateLimit, setStartLimit] = useState(startDateLimit_base);
  const [startDate, setStartDate] = useState<Date>(startDateLimit);
  const [endDate, setEndDate] = useState<Date>(endDateLimit);
  const dispatch = useDispatch();

  useEffect(() => {
    const dataForReqStart = {
      cityId: bookmark.city._id,
    };
    getStartDate(dataForReqStart);
  }, [bookmark]);

  async function getStartDate(data: IreqAvailable) {
    const res = await dispatch<any>(getAvailableHistoryStartDate(data));

    if (getAvailableHistoryStartDate.fulfilled.match(res)) {
      //@ts-ignore
      const transformedDate = new Date(availableDataStart.dt * 1000);
      const date = startOfDay(transformedDate);
      if (isValid(date)) {
        setStartLimit(date);
        setStartDate(date);
      }
    } else if (getAvailableHistoryStartDate.rejected.match(res)) {
    }
  }

  const handleStartDateChange = (date: Date) => {
    if (!isValid(date)) {
      return;
    }
    console.log(date);
    if (
      isBefore(date, startDateLimit) ||
      isAfter(date, endDate) ||
      isAfter(date, endDateLimit)
    ) {
      return;
    }

    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    if (!isValid(date)) {
      return;
    }
    if (
      isBefore(date, startDateLimit) ||
      isAfter(date, endDateLimit) ||
      isBefore(date, startDate)
    ) {
      return;
    }
    const adjustedEndDate = setHours(
      setMinutes(setSeconds(setMilliseconds(date, 0), 0), 0),
      23
    );
    setEndDate(adjustedEndDate);
  };

  const handleSubmit = () => {
    const startDateUnix = Math.floor(startDate.getTime() / 1000);
    const endDateUnix = Math.floor(endDate.getTime() / 1000);

    console.log("Start Date (Unix):", startDate, startDateUnix);
    console.log("End Date (Unix):", endDate, endDateUnix);

    // Ajoutez ici le code pour soumettre les dates

    handleClickHistory(
      startDateUnix,
      endDateUnix,
      bookmark.city._id
      // bookmark.city.lat,
      // bookmark.city.lon
    );
  };

  console.log("limits", startDateLimit, endDateLimit);
  return (
    <div className="datapicker-wrap">
      <div className="title-data-picker">{bookmark.city.name}</div>
      <div className="error-message hide"></div>
      <div>
        Please select an range <span className="important">*</span>
      </div>
      <div className="wrap-pickers">
        <div className="startDate-wrap container-date">
          <label htmlFor="startDate">From:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            maxDate={addDays(today, -1)}
            minDate={startDateLimit}
            locale="fr"
            id="startDate"
            name="startDate"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="startDate-wrap container-date">
          <label htmlFor="endDate">To:</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            maxDate={addDays(today, -1)}
            minDate={startDateLimit}
            locale="fr"
            id="endDate"
            name="endDate"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <div className="notice">
        <span className="important">*</span>
        The start date is determinated by the availability of data in the
        database, otherwise it should not exceed year N - 1 + 1 day
      </div>
      <button onClick={handleSubmit}> {isLoading ? "Loading" : "Save"}</button>
    </div>
  );
};

export default DateRangePickerComponent;
