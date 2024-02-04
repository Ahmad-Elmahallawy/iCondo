export const isAuthenticated = () => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const { token } = JSON.parse(userData);
    // Validate the token or perform other authentication checks
    return !!token;
  }
  return false;
};
