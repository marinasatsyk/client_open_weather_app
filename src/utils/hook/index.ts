import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";

export const UseAppDispatch: () => AppDispatch = useDispatch;
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//verification if is user logged
export const useAuth = () => {
  const { isAuth } = UseAppSelector((state) => state.auth);
  return isAuth;
};

export const useUserId = () => {
  const { id } = UseAppSelector((state) => state.auth.user);
  if (id) {
    return id;
  }
};
