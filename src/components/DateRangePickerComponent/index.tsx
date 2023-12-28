import React, { useState } from "react";
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
} from "date-fns";
import fr from "date-fns/locale/fr";
import { Bookmark } from "common/interfaces/auth";

import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

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
  const today = startOfDay(new Date());
  const startDateLimit = subYears(addDays(today, 1), 1); // date min for start today - 1 year + 1 day
  const defineHours = setHours(
    setMinutes(setSeconds(setMilliseconds(today, 0), 0), 0),
    23
  );
  const endDateLimit = subDays(defineHours, 1); // today - 1 day

  const [startDate, setStartDate] = useState<Date>(startDateLimit);
  const [endDate, setEndDate] = useState<Date>(endDateLimit);

  const handleStartDateChange = (date: Date) => {
    if (
      isBefore(date, startDateLimit) ||
      isAfter(date, today) ||
      isAfter(date, endDate)
    ) {
      return;
    }

    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    if (
      isBefore(date, startDateLimit) ||
      isAfter(date, addDays(today, -1)) ||
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
        The selected range should not exceed year N - 1
      </div>
      <button onClick={handleSubmit}> {isLoading ? "Loading" : "Save"}</button>
    </div>
  );
};

export default DateRangePickerComponent;
