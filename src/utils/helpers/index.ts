import { Token, UserRoleDataKeys } from "common/interfaces/auth";
import { format } from "date-fns";
import * as moment from "moment-timezone";

export const manageToken = (
  isRememberMe: boolean,
  accessToken: string
): void => {
  isRememberMe
    ? localStorage.setItem("token", accessToken)
    : sessionStorage.setItem("token", accessToken);
};

export const removeTokens = (): void => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};

//func   unified characters for first & last names
export const unifyString = (v: string) =>
  v.trim().toLowerCase().split(" ").join("");

//VALIDATEION PART
export const Validator = {
  email: (e: string | undefined) => {
    if (e) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        String(e).toLowerCase()
      );
    } else {
      return false;
    }
  },
  name: (n: string | undefined) => {
    if (n) {
      return n.trim().length > 1;
    } else {
      return false;
    }
  },
  password: (p: string | undefined) => {
    if (p) {
      return /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(p);
    } else {
      return false;
    }
  },
  confirmPassword: (p: string | undefined, confirmP: string | undefined) => {
    let isPValidate = false;
    let isSameP = false;
    if (p && confirmP) {
      if (unifyString(p) === unifyString(confirmP)) {
        isSameP = true;
      }
      if (Validator.password(p)) {
        isPValidate = true;
      }
      return isSameP && isPValidate ? true : false;
    } else {
      return false;
    }
  },

  roleValidate: (role: string | undefined): boolean => {
    if (!role) {
      return false;
    }
    return Object.values(UserRoleDataKeys).includes(role as UserRoleDataKeys);
  },
  activatedStatus: (isActivated: boolean): boolean => {
    return typeof isActivated === "boolean" ? true : false;
  },
};

export const getTokenFromStorage = (storageKey: string): Token | null => {
  const tokenRaw =
    JSON.stringify(localStorage.getItem(storageKey)) ||
    JSON.stringify(sessionStorage.getItem(storageKey));
  try {
    return tokenRaw !== null ? JSON.parse(tokenRaw) : null;
  } catch (err) {
    console.error("Erreur de parsing :", err);
    return null;
  }
};

export const getDate = () => {
  const date = new Date();
  return format(date, "eeee, d MMMM yyyy");
};

export function formatUnixTime(
  unixTime: number,
  timeZone: string = moment.tz.guess()
): string {
  console.log("timeZone", timeZone);
  const date = moment.unix(unixTime).tz(timeZone);
  return date.format("HH:mm");
}

export function getWindDirection(degrees: number) {
  degrees = ((degrees % 360) + 360) % 360;

  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  const index = Math.round((degrees % 360) / 45) % 8;

  return directions[index];
}
