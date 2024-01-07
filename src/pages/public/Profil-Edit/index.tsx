import { Link, useNavigate } from "react-router-dom";
import { UseAppSelector } from "utils/hook";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Validator } from "utils/helpers";
import { ManagedInput } from "components/ManageInput";

import "./index.scss";
import { updateUser } from "store/thunks/user";
import { Helmet } from "react-helmet";

const UserEditComponent = () => {
  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //global states
  const { user } = UseAppSelector((state) => state.auth);
  const currentUser = user;

  //local states
  const [email, setEmail] = useState(currentUser ? currentUser.email : "");
  const [firstName, setFirstName] = useState(
    currentUser ? currentUser.firstName : ""
  );
  const [lastName, setLastName] = useState(
    currentUser ? currentUser.lastName : ""
  );

  //validation states front side
  const [isEmailValidate, setIsEmailValidate] = useState(false);
  const [isFirstNameValidate, setIsFirstNameValidate] = useState(false);
  const [isLastNameValidate, setIsLastNameValidate] = useState(false);
  const [errorMessageSelect, setErrorMessageSelect] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [errorAuth, setErrorAuth] = useState<any>("");
  const [isSavedSuccessfully, setIsSavedSuccessfully] = useState(false);

  useEffect(() => {
    setIsEmailValidate(Validator.email(email));
    setIsFirstNameValidate(Validator.name(firstName));
    setIsLastNameValidate(Validator.name(lastName));

    isEmailValidate && isFirstNameValidate && isLastNameValidate
      ? setIsSubmitEnabled(true)
      : setIsSubmitEnabled(false);
  }, [
    isFirstNameValidate,
    isLastNameValidate,
    isEmailValidate,
    firstName,
    lastName,
    email,
    errorAuth,
  ]);

  const onHandleSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (currentUser && currentUser.id !== "") {
      const userRegisterData = {
        userId: currentUser.id,
        dataUpdate: {
          firstName,
          lastName,
          email,
        },
      };
      try {
        const actionResult = await dispatch<any>(updateUser(userRegisterData));
        if (updateUser.fulfilled.match(actionResult)) {
          setIsSavedSuccessfully(true);

          setTimeout(function () {
            setIsSavedSuccessfully(false);
          }, 2000);
          setTimeout(function () {
            navigate(`/user/profile/show`); // navigate if updated
          }, 2000);
        } else if (updateUser.rejected.match(actionResult)) {
          const error = (actionResult.payload as { error: string }).error;
          //@ts-ignore
          setErrorAuth(error.message);
        }
      } catch (e) {
        // console.error("error", e);
        setErrorAuth(e);
        return;
      }
    }
  };

  return (
    <div className="wrap-user-admin-container edit">
      <h1>User Information</h1>
      <Helmet>
        <title>User profil edit</title>

        <meta name="description" content={`profile user`} />
        <meta name="keywords" content="profile data user edit" />
      </Helmet>

      <section className="user-section">
        {errorAuth && <div className="error">{errorAuth}</div>}
        <div
          className={`success ${isSavedSuccessfully ? "visible" : "hidden"}`}
        >
          Account updated successfully
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

        <div className="btn-wrap">
          <button
            type="submit"
            className="save"
            onClick={(e) => onHandleSave(e)}
            disabled={!isSubmitEnabled}
          >
            Save
          </button>

          <button className="cancel">
            <Link to={`/user/profile/show`}>Cancel</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserEditComponent;
