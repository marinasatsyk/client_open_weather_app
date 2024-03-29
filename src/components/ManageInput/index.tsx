import { IManageInputProps } from "common/interfaces/auth";
import { useState, ChangeEvent } from "react";
import { clearError } from "store/slice/auth";
import { clearError as clearErrorAdmin } from "store/slice/admin";
import { UseAppDispatch, UseAppSelector } from "utils/hook";
import "./index.scss";
export const ManagedInput = (props: IManageInputProps) => {
  const {
    id,
    type,
    name,
    value,
    setValue,
    errorMessage,
    validateField,
    secondValue,
    clearErrorSetValue,
  } = props;

  const { error } = UseAppSelector((state) => state.auth);
  const dispatch = UseAppDispatch();

  const [isValid, setValid] = useState(true);
  let clearErrorObject = "";

  const f = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setValid(validateField(e.target.value, secondValue && secondValue));
  };
  const onHandleFocus = () => {
    dispatch(clearError(clearErrorObject));
    dispatch(clearErrorAdmin(clearErrorObject));
    clearErrorSetValue && clearErrorSetValue(clearErrorObject);
  };

  return (
    <div className="wrapInput">
      <label className="manage-input" htmlFor={id}>
        {name}
      </label>
      <input
        value={value}
        type={type ?? "text"}
        id={id}
        required
        name={name}
        onChange={(e) => f(e)}
        className="text-control"
        autoComplete="off"
        onFocus={() => onHandleFocus()}
      />
      {!isValid ? <div id="error-manage">{errorMessage}</div> : ""}
    </div>
  );
};
