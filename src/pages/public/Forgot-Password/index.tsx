import { FC, useState, useEffect, useRef } from "react";
import { UseAppDispatch, UseAppSelector } from "utils/hook";
import { Validator, manageToken } from "utils/helpers";
import { ManagedInput } from "components/ManageInput";
import { forgotPassword, loginUser, registerUser } from "store/thunks/auth";
import { clearError, rememberMe } from "store/slice/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import { Link } from "react-router-dom";

const ForgotPasswordComponent = () => {
  const { user, error, isLoading } = UseAppSelector((state) => state.auth);
  const [errorAuth, setErrorAuth] = useState<any>({});
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [email, setEmail] = useState("");

  //**validation states front side */
  const [isEmailValidate, setIsEmailValidate] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  //hooks
  const dispatch = UseAppDispatch();

  const handldeSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const userData = { email };
      //dispatch forgot link
      const resForgot = await dispatch(forgotPassword(userData));
      if (forgotPassword.fulfilled.match(resForgot)) {
        setIsLinkSent(true);
      } else if (forgotPassword.rejected.match(resForgot)) {
        const error = (resForgot.payload as { error: string }).error;
        //@ts-ignore
        setErrorAuth(error.message);
      }
    } catch (e) {
      // console.error("error", e);
      setErrorAuth(e);
      return e;
    }
  };

  useEffect(() => {
    setIsEmailValidate(Validator.email(email));
    isEmailValidate ? setIsSubmitEnabled(true) : setIsSubmitEnabled(false);
  }, [isEmailValidate, email, isSubmitEnabled, errorAuth]);

  return (
    <section className="forgot-container">
      <div className="auth-container">
        <div className="wrap-form-auth">
          <div className="title-wrap">
            <h2>{"Forgot password"}</h2>
            <div
              className={`error ${
                errorAuth && Object.keys(error).length > 0
                  ? "visible"
                  : "hidden"
              }`}
            >
              {error?.message}
            </div>
            <div className={`success ${isLinkSent ? "visible" : "hidden"}`}>
              Link to reset password was sent to your email
            </div>
          </div>

          <div className="form">
            <ManagedInput
              id="email"
              type="email"
              name="email"
              value={email}
              setValue={setEmail}
              errorMessage="Make sure to enter correct mail"
              validateField={Validator.email}
            />
            <Link className="login-link" to={"/connection"}>
              Return to login form
            </Link>
          </div>

          <div className="btn-wrap">
            <button
              type="submit"
              onClick={(e) => handldeSubmit(e)}
              disabled={isSubmitEnabled ? false : true}
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin className="spinner" />
              ) : (
                "Get the recovery link"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ForgotPasswordComponent;
