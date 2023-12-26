import axios from "axios";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { useEffect, useState } from "react";
import { error } from "console";
import { logoutUser } from "store/slice/auth";
import { logoutDailyForecast } from "store/slice/dailyWeather";
import { logoutHourlyForecast } from "store/slice/hourlyWeather";
import { logoutWeather } from "store/slice/weather";
import { logoutAdmin } from "store/slice/admin";

export const UseAppDispatch: () => AppDispatch = useDispatch;
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//verification if is user logged
export const useAuth = () => {
  let clientToken = null;
  const localStorageToken = localStorage.getItem("token");
  const sessionStorageToken = sessionStorage.getItem("token");

  if (localStorageToken) {
    clientToken = localStorageToken;
  } else if (sessionStorageToken) {
    clientToken = sessionStorageToken;
  }
  return clientToken != null ? true : false;
};

export const useAdmin = () => {
  const { role } = UseAppSelector((state) => state.auth.user);
  if (role === "root") {
    return true;
  }
  return false;
};

export const useUserId = () => {
  const { id } = UseAppSelector((state) => state.auth.user);
  if (id) {
    return id;
  }
};

//=============  Cities data hook

export const UseBookmarks = () => {
  const { bookmarks } = UseAppSelector((state) => state.auth.user);
  console.log("useBookmarks", bookmarks);
  if (bookmarks?.length > 0) {
    return bookmarks;
  } else {
    return [];
  }
};

export const UseActiveBookmark = () => {
  const { bookmarks } = UseAppSelector((state) => state.auth.user);

  console.log("useBookmarks", bookmarks);
  if (
    bookmarks?.length > 0 &&
    bookmarks.some((bookmark) => bookmark.isActive)
  ) {
    return bookmarks.filter((bookmark) => bookmark.isActive)[0];
  } else {
    return null;
  }
};

interface ModalHook {
  isModalOpened: boolean;
  toggle: () => void;
}

export const useModal = (): ModalHook => {
  const [isModalOpened, setModalOpened] = useState(false);

  const toggle = () => {
    setModalOpened(!isModalOpened);
  };

  return {
    isModalOpened,
    toggle,
  };
};

export function UseLogout() {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logoutUser());
    dispatch(logoutDailyForecast());
    dispatch(logoutHourlyForecast());
    dispatch(logoutWeather());
  };

  return logOut;
}

export function UseLogoutAdmin() {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logoutUser());
    dispatch(logoutDailyForecast());
    dispatch(logoutHourlyForecast());
    dispatch(logoutWeather());
    dispatch(logoutAdmin());
  };

  return logOut;
}
