import { ManagedInput } from "components/ManageInput";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "store/thunks/auth";
import { Validator } from "utils/helpers";
import { UseAppDispatch, UseAppSelector } from "utils/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { UserRoleDataKeys } from "common/interfaces/auth";
import { createUser } from "store/thunks/admin";
import "./index.scss";
import admin from "store/slice/admin";

const DialogForm = () => {
  const { isLoading, users, adminUser, error } = UseAppSelector(
    (state) => state.admin
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorAuth, setErrorAuth] = useState<any>("");

  //**validation states front side */
  const [isEmailValidate, setIsEmailValidate] = useState(false);
  const [isPasswordValidate, setIsPasswordValidate] = useState(false);
  const [isConfirmPasswordValidate, setIsConfirmPasswordValidate] =
    useState(false);
  const [isFirstNameValidate, setIsFirstNameIsValidate] = useState(false);
  const [isLastNameValidate, setIsLastNameIsValidate] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isCreated, setIsAccountCreated] = useState(false);
  const [role, setRoleKey] = useState<UserRoleDataKeys>(UserRoleDataKeys.USER);
  const [isRoleValidate, setIsRoleValidate] = useState(false);
  const [errorMessageSelect, setErrorMessageSelect] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value as UserRoleDataKeys;
    if (Object.values(UserRoleDataKeys).includes(selectedRole)) {
      setIsRoleValidate(true);
      setRoleKey(selectedRole);
    } else {
      setIsRoleValidate(false);
      setErrorMessageSelect("Valeur de rôle invalide");
      console.error("Valeur de rôle invalide");
    }
  };
  //hooks

  const dispatch = UseAppDispatch();
  const navigate = useNavigate();

  const userRoles = Object.values(UserRoleDataKeys);

  // useEffect(() => {
  //   isRegistred && setIsAccountCreated(true);
  //   // Après 3 secondes, notification disparait
  //   setTimeout(function () {
  //     setIsAccountCreated(false);
  //   }, 3000);
  // }, [isRegistred]);

  useEffect(() => {
    setIsEmailValidate(Validator.email(email));
    setIsFirstNameIsValidate(Validator.name(firstName));
    setIsLastNameIsValidate(Validator.name(lastName));
    setIsPasswordValidate(Validator.password(password));
    setIsConfirmPasswordValidate(
      Validator.confirmPassword(password, confirmPassword)
    );

    setIsRoleValidate(Validator.roleValidate(role));

    isEmailValidate &&
    isPasswordValidate &&
    isFirstNameValidate &&
    isLastNameValidate &&
    isRoleValidate &&
    isConfirmPasswordValidate
      ? setIsSubmitEnabled(true)
      : setIsSubmitEnabled(false);

    // Après 3 secondes, notification disparait
    // setTimeout(function() {
    //   setIsAccountCreated(false);
    // }, 3000);
  }, [
    isFirstNameValidate,
    isLastNameValidate,
    isEmailValidate,
    isPasswordValidate,
    isConfirmPasswordValidate,
    isRoleValidate,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    errorAuth,
    role,
    isSubmitEnabled,
    adminUser,
  ]);

  const handldeSubmit = async (e: { preventDefault: () => void }) => {
    console.log("submit");
    e.preventDefault();
    console.log("1");

    try {
      const userRegisterData = { firstName, lastName, email, password, role };

      const createdUser = await dispatch(createUser(userRegisterData));

      if (createUser.fulfilled.match(createdUser)) {
        setIsAccountCreated(true);

        setTimeout(function () {
          setIsAccountCreated(false);
        }, 3000);
        setTimeout(function () {
          navigate(`/admin/dashboard`);
        }, 2000);
      } else if (createUser.rejected.match(createdUser)) {
        const error = (createdUser.payload as { error: string }).error;
        //@ts-ignore
        setErrorAuth(error.message);
      }
    } catch (e) {
      console.error("error", e);
      return e;
    }
  };

  return (
    <div className="form-add-user">
      <div className={`success ${isCreated ? "visible" : "hidden"}`}>
        Account was created successfully
      </div>
      <div className="wrap-item-user-info">
        <label htmlFor="firstName" className="description-user custom">
          First Name:
        </label>
        <ManagedInput
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          setValue={setFirstName}
          errorMessage="Make sure to enter correct  name"
          validateField={Validator.name}
          clearErrorSetValue={setErrorAuth}
        />
      </div>

      <div className="wrap-item-user-info">
        <label className="description-user custom" htmlFor="lastName">
          Last Name:
        </label>
        <ManagedInput
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          setValue={setLastName}
          errorMessage="Make sure to enter correct last name"
          validateField={Validator.name}
          clearErrorSetValue={setErrorAuth}
        />
      </div>

      <div className="wrap-item-user-info">
        <label className="description-user custom" htmlFor="email">
          Email :
        </label>
        <ManagedInput
          id="email"
          type="email"
          name="email"
          value={email}
          setValue={setEmail}
          errorMessage="Make sure to enter correct mail"
          validateField={Validator.email}
          clearErrorSetValue={setErrorAuth}
        />
      </div>
      <div className="wrap-item-user-info">
        <label className="description-user custom" htmlFor="password">
          Password :
        </label>
        <ManagedInput
          id="password"
          type="password"
          name="password"
          value={password}
          setValue={setPassword}
          errorMessage="Make sure to use at least 1 letter, 1 number, 6 characters"
          validateField={Validator.password}
          clearErrorSetValue={setErrorAuth}
        />
      </div>

      <div className="wrap-item-user-info">
        <label className="description-user custom" htmlFor="confirmPassword">
          Confirm password :
        </label>
        <ManagedInput
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          setValue={setConfirmPassword}
          errorMessage="Passwords are not the same"
          validateField={Validator.confirmPassword}
          secondValue={password}
          clearErrorSetValue={setErrorAuth}
        />
      </div>

      <div className="wrap-item-user-info">
        <label className="description-user custom" htmlFor="role">
          Role:
        </label>
        <select name="role" id="role" onChange={(e) => handleOnChange(e)}>
          {userRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {!isRoleValidate && (
          <div style={{ color: "red", fontSize: "12px" }}>
            {errorMessageSelect}
          </div>
        )}
      </div>

      <div className="error-wrap">
        {errorAuth && (
          <>
            <span className="error-title">Error occured:</span>
            <span className="error-body"> {errorAuth}</span>
          </>
        )}
      </div>

      <button
        type="submit"
        onClick={(e) => handldeSubmit(e)}
        disabled={isSubmitEnabled ? false : true}
        className="save"
      >
        {/* {isLoading
                ? <FontAwesomeIcon icon={faSpinner} spin className='spinner'/> 
                :   "Send" 
            } */}
        Save
      </button>
    </div>
  );
};

export default DialogForm;
