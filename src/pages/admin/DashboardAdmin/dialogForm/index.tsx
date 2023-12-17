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

const DialogForm = () => {
  const { isLoading, users, error } = UseAppSelector((state) => state.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRemeberMe, setIsRemeberMe] = useState(false);
  const [errorAuth, setErrorAuth] = useState<any>({});

  //**validation states front side */
  const [isEmailValidate, setIsEmailValidate] = useState(false);
  const [isPasswordValidate, setIsPasswordValidate] = useState(false);
  const [isConfirmPasswordValidate, setIsConfirmPasswordValidate] =
    useState(false);
  const [isFirstNameValidate, setIsFirstNameIsValidate] = useState(false);
  const [isLastNameValidate, setIsLastNameIsValidate] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isRegistred, setIsAccountCreated] = useState(false);
  const [role, setRoleKey] = useState<UserRoleDataKeys>(UserRoleDataKeys.USER);

  const [isRoleValidate, setIsRoleValidate] = useState(false);
  const [errorMessageSelect, setErrorMessageSelect] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value as UserRoleDataKeys;
    if (Object.values(UserRoleDataKeys).includes(selectedRole)) {
      setIsRoleValidate(true);
      setRoleKey(selectedRole);
      console.log(selectedRole);
    } else {
      setIsRoleValidate(false);
      setErrorMessageSelect("Valeur de rôle invalide");
      console.error("Valeur de rôle invalide");
    }
  };
  //hooks

  const dispatch = UseAppDispatch();

  const userRoles = Object.values(UserRoleDataKeys);

  useEffect(() => {
    setIsEmailValidate(Validator.email(email));
    setIsFirstNameIsValidate(Validator.name(firstName));
    setIsLastNameIsValidate(Validator.name(lastName));
    setIsPasswordValidate(Validator.password(password));
    setIsConfirmPasswordValidate(
      Validator.confirmPassword(password, confirmPassword)
    );
    //select is valid?????
    setIsRoleValidate(Validator.roleValidate(role));

    isEmailValidate &&
    isPasswordValidate &&
    isFirstNameValidate &&
    isLastNameValidate &&
    isRoleValidate &&
    isConfirmPasswordValidate
      ? setIsSubmitEnabled(true)
      : setIsSubmitEnabled(false);
    setIsAccountCreated(isRegistred);

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
    isRemeberMe,
    errorAuth,
    role,
    isSubmitEnabled,
    isRegistred,
  ]);

  const handldeSubmit = async (e: { preventDefault: () => void }) => {
    console.log("submit");
    e.preventDefault();
    console.log("1");

    try {
      const userRegisterData = { firstName, lastName, email, password, role };
      console.log("========================", userRegisterData);
      await dispatch(createUser(userRegisterData));
    } catch (e) {
      console.error("error", e);
      // setErrorAuth(e);
      return e;
    }
  };

  return (
    <div className="form-add-user">
      <ManagedInput
        id="firstName"
        type="text"
        name="firstName"
        value={firstName}
        setValue={setFirstName}
        errorMessage="Make sure to enter correct  name"
        validateField={Validator.name}
      />
      <ManagedInput
        id="lastName"
        type="text"
        name="lastName"
        value={lastName}
        setValue={setLastName}
        errorMessage="Make sure to enter correct last name"
        validateField={Validator.name}
      />
      <ManagedInput
        id="email"
        type="email"
        name="email"
        value={email}
        setValue={setEmail}
        errorMessage="Make sure to enter correct mail"
        validateField={Validator.email}
      />
      <ManagedInput
        id="password"
        type="password"
        name="password"
        value={password}
        setValue={setPassword}
        errorMessage="Make sure to use at least 1 letter, 1 number, 6 characters"
        validateField={Validator.password}
      />

      <ManagedInput
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        setValue={setConfirmPassword}
        errorMessage="Passwords are not the same"
        validateField={Validator.confirmPassword}
        secondValue={password}
      />
      {/* <ManagedInput
        id="role"
        type="role"
        name="role"
        value={role}
        setValue={setRoleKey}
        errorMessage="Not allowed"
        validateField={Validator.role}
      /> */}
      <div className="select-input">
        <label htmlFor="userRole">Sélectionnez un rôle :</label>
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

      <button
        type="submit"
        onClick={(e) => handldeSubmit(e)}
        disabled={isSubmitEnabled ? false : true}
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
