export const isAuthenticated = () => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const { accessToken } = JSON.parse(userData);
    // Validate the token or perform other authentication checks
    return !!accessToken;
  }
  return false;
};
