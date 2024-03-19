export const apiPrefix = process.env.REACT_APP_API_URL;
export const apiPrefixUserService = process.env.REACT_APP_API_URL_USER_SERVICE;
const urls = {
  users: {
    fetchProfilePicture: `${apiPrefix}/file`,
    fetchUserDetails: `${apiPrefix}/users`,
    updateUserDetails: `${apiPrefix}/users`,
    resetUserPassword: `${apiPrefixUserService}/users`,
    updateUserProfilePic: `${apiPrefix}/files`,
    editUserRole: `${apiPrefix}/users`
  },
  employees: {
    registerUser: `${apiPrefix}/users`,
    registerCompanyEmployee: `${apiPrefix}/companyEmployees`
  },
  registrationKeys: {
    userRegister: `${apiPrefix}/registrationKeys`,
    getCondoID: `${apiPrefix}/userCondos`,
  },
  requests: {
    submitRequest: `${apiPrefix}/requests`,
  },
  userCondos: {
    submitUserCondo: `${apiPrefix}/userCondos`,
  },
  properties: {
    getProperty: `${apiPrefix}/properties`,
  },
  companies: {
    getCompany: `${apiPrefix}/companies`,
  },
};

export default urls;
