import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";

export const UseAppDispatch: () => AppDispatch = useDispatch;
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//verification if is user logged
export const useAuth = () => {
  const sessionClientTokenRaw = JSON.stringify(sessionStorage.getItem("token"));
  const localClientTokenRaw = JSON.stringify(localStorage.getItem("token"));
  let sessionClientToken = "";
  let localClientToken = "";
  try {
    sessionClientToken =
      sessionClientTokenRaw !== null ? JSON.parse(sessionClientTokenRaw) : null;
    localClientToken =
      localClientTokenRaw !== null ? JSON.parse(localClientTokenRaw) : null;
  } catch (err) {
    console.error("err parsing", err);
  }
  const clientToken = sessionClientToken
    ? sessionClientToken
    : localClientToken;

  if (clientToken != null) {
    console.log("//////clientToken", clientToken);
    return true;
  } else {
    return false;
  }
};

export const useUserId = () => {
  const { id } = UseAppSelector((state) => state.auth.user);
  if (id) {
    return id;
  }
};
