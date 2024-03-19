export const apiPrefix = process.env.REACT_APP_API_URL;
export const apiPrefixUserService = process.env.REACT_APP_API_URL_USER_SERVICE;
const urls = {
  users: {
    fetchProfilePicture: `${apiPrefix}/file`,
    updateUserDetails: `${apiPrefix}/users`,
    resetUserPassword: `${apiPrefixUserService}/users`,
    updateUserProfilePic: `${apiPrefix}/files`,
  },
  registrationKeys: {
    userRegister: `${apiPrefix}/registrationKeys`,
  },
  // Adding a section for property-related URLs
  properties: {
    removeProperty: `${apiPrefix}/properties`, // Assuming this endpoint, adjust as needed
  },
};

export default urls;
