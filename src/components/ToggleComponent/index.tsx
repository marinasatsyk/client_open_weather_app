import React, { useState, FC } from "react";
import "./index.scss";

interface ToggleProps {
  isChecked: boolean;
  onToggleChange: () => void;
  label: string;
}

const Toggle: FC<ToggleProps> = ({ isChecked, onToggleChange, label }) => {
  return (
    <div className="wrap-toggle">
      <label className="toggle-label">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggleChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onToggleChange();
            }
          }}
          aria-checked={isChecked}
          role="switch"
          className="toggle-input"
        />
        <div className={`slider ${isChecked ? "checked" : ""}`} />
      </label>
      <div> {label}</div>
    </div>
  );
};

export default Toggle;
