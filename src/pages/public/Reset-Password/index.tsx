import { useState, useEffect } from "react";
import { UseAppDispatch, UseAppSelector } from "utils/hook";
import { Validator } from "utils/helpers";
import { ManagedInput } from "components/ManageInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "store/thunks/auth";
import "./index.scss";

const ResetPasswordComponent = () => {
  const { error, isLoading } = UseAppSelector((state) => state.auth);
  const [errorAuth, setErrorAuth] = useState<any>({});
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValidate, setIsPasswordValidate] = useState(false);
  const [isConfirmPasswordValidate, setIsConfirmPasswordValidate] =
    useState(false);

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  //hooks
  const dispatch = UseAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const handldeSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const { passwordResetToken } = params;
      if (password && confirmPassword && passwordResetToken) {
        const userResetData = { password, confirmPassword, passwordResetToken };
        //dispatch forgot link
        const resResetPassword = await dispatch(resetPassword(userResetData));
        if (resetPassword.fulfilled.match(resResetPassword)) {
          setIsPasswordUpdated(true);
          setTimeout(() => {
            setIsPasswordUpdated(false);
            navigate("/connection");
          }, 2000);
        } else if (resetPassword.rejected.match(resResetPassword)) {
          const error = (resResetPassword.payload as { error: string }).error;
          //@ts-ignore
          setErrorAuth(error.message);
        }
      }
    } catch (e) {
      console.error("error", e);
      setErrorAuth(e);
      return e;
    }
  };

  useEffect(() => {
    setIsPasswordValidate(Validator.password(password));
    setIsConfirmPasswordValidate(
      Validator.confirmPassword(password, confirmPassword)
    );

    isPasswordValidate && isConfirmPasswordValidate
      ? setIsSubmitEnabled(true)
      : setIsSubmitEnabled(false);
  }, [
    isPasswordValidate,
    isConfirmPasswordValidate,
    password,
    confirmPassword,
    isSubmitEnabled,
    errorAuth,
  ]);

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
            <div
              className={`success ${isPasswordUpdated ? "visible" : "hidden"}`}
            >
              Your password was updated successfully
            </div>
          </div>

          <div className="form">
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
                "Change password"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ResetPasswordComponent;
