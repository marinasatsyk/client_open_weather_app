import { Bookmark, UserRoleDataKeys } from "common/interfaces/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UseAppSelector } from "utils/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useDispatch } from "react-redux";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getAllUsers } from "store/thunks/admin";
import { Validator } from "utils/helpers";
import { ManagedInput } from "components/ManageInput";
import "./index.scss";
const UserAmdinEdit = () => {
  //hooks
  const flag = useRef(false);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(params);

  //global states
  const { adminUser, users } = UseAppSelector((state) => state.admin);
  const { user } = UseAppSelector((state) => state.auth);

  const currentUser = users.filter((user) => user._id === params.uid)[0];
  console.log(currentUser);
  //local states
  const [email, setEmail] = useState(currentUser ? currentUser.email : "");
  const [firstName, setFirstName] = useState(
    currentUser ? currentUser.firstName : ""
  );
  const [lastName, setLastName] = useState(
    currentUser ? currentUser.lastName : ""
  );
  const [role, setRoleKey] = useState<UserRoleDataKeys>(
    currentUser
      ? currentUser.role === "user"
        ? UserRoleDataKeys.USER
        : UserRoleDataKeys.ADMIN
      : UserRoleDataKeys.USER
  );
  const [activationStatus, setActivationStatus] = useState(
    currentUser ? currentUser.isActivated : false
  );

  //validation states front side
  const [isEmailValidate, setIsEmailValidate] = useState(false);
  const [isFirstNameValidate, setIsFirstNameValidate] = useState(false);
  const [isLastNameValidate, setIsLastNameValidate] = useState(false);
  const [isRoleValidate, setIsRoleValidate] = useState(false);
  const [isActivationStatusValidate, setIsActivationStatusValidate] =
    useState(false);
  const [errorMessageSelect, setErrorMessageSelect] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const userRoles = Object.values(UserRoleDataKeys);

  useEffect(() => {
    setIsEmailValidate(Validator.email(email));
    console.log("???");
    setIsFirstNameValidate(Validator.name(firstName));

    setIsLastNameValidate(Validator.name(lastName));
    setIsRoleValidate(Validator.roleValidate(role));
    setIsActivationStatusValidate(Validator.activatedStatus(activationStatus));

    console.log("???", isFirstNameValidate);
    isEmailValidate &&
    isFirstNameValidate &&
    isLastNameValidate &&
    isRoleValidate &&
    isActivationStatusValidate
      ? setIsSubmitEnabled(true)
      : setIsSubmitEnabled(false);

    // console.log("isEmailValidate", isEmailValidate);
    // console.log("isFirstNameValidate", isFirstNameValidate);
    // console.log("isLastNameValidate", isLastNameValidate);
    // console.log("isRoleValidate", isRoleValidate);
    // console.log("isActivationStatusValidate", isActivationStatusValidate);
  }, [
    isFirstNameValidate,
    isLastNameValidate,
    isEmailValidate,
    isRoleValidate,
    firstName,
    lastName,
    email,
    role,
  ]);

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

  const handleOnclick = (e: { preventDefault: () => void }) => {
    setActivationStatus(!activationStatus);
  };

  const onHandleSave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("submit update user");
    try {
      const userRegisterData = {
        firstName,
        lastName,
        email,
        role,
        isActivated: activationStatus,
      };
      console.log("userRegisterData", userRegisterData);
      // await dispatch(registerUser(userRegisterData));
      // console.log("userRegisterData", userRegisterData);
    } catch (e) {
      console.error("error", e);
      // setError(e)
      return e;
    }
  };
  console.log("=======isSubmitEnabled", isSubmitEnabled);
  return (
    <div className="wrap-user-admin-container edit">
      <h1>User Information</h1>
      {params.uid &&
        users.map(
          (user) =>
            user._id === params.uid && (
              <section key={user._id} className="user-section">
                <div className="wrap-item-user-info">
                  <label
                    htmlFor="firstName"
                    className="description-user custom"
                  >
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
                  />
                </div>

                <div className="wrap-item-user-info">
                  <label
                    className="description-user custom"
                    htmlFor="isActivated"
                  >
                    Activation status :
                  </label>
                  <div className="checkbox-input">
                    <input
                      type="checkbox"
                      id="isActivated"
                      name="isActivated"
                      checked={activationStatus}
                      onChange={(e) => handleOnclick(e)}
                    />
                  </div>
                </div>

                <div className="wrap-item-user-info">
                  <label className="description-user custom" htmlFor="role">
                    Role:
                  </label>
                  <div className="select-input">
                    <select
                      name="role"
                      id="role"
                      onChange={(e) => handleOnChange(e)}
                    >
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
                    {/* {error && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {error.message}
                      </div>
                    )} */}
                  </div>
                </div>
                <section className="user-bookmarks">
                  <h3>Bookmarks</h3>
                  {user.bookmarks.length ? (
                    <BookmarksComponent bookmarks={user.bookmarks} />
                  ) : (
                    <div>No bookmarks</div>
                  )}
                </section>

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
                    <Link to={`/admin/user/${params.uid}`}>Cancel</Link>
                  </button>
                </div>
              </section>
            )
        )}
    </div>
  );
};

interface BookmarksComponentProps {
  bookmarks: Bookmark[];
}

const BookmarksComponent: React.FC<BookmarksComponentProps> = (props) => {
  const { bookmarks } = props;
  console.log(bookmarks);
  return (
    <>
      {bookmarks.length > 0 &&
        bookmarks.map((bookmark, index) => (
          <article key={index} className="wrap-bookmark">
            <div className="bookmark-city">ID City: {`${bookmark.city}`}</div>
            {bookmark.isFollowHistory && (
              <span className="history-mark" title="user follow history data">
                <FontAwesomeIcon
                  icon={icon({ name: "helicopter-symbol", style: "solid" })}
                />
              </span>
            )}
            {bookmark.isActive && (
              <span className="active-mark" title="current active city">
                <FontAwesomeIcon icon={icon({ name: "a", style: "solid" })} />
              </span>
            )}
          </article>
        ))}
    </>
  );
};

export default UserAmdinEdit;
