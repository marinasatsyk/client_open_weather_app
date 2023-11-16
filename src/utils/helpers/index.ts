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
