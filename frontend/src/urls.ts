export const apiPrefix = process.env.REACT_APP_API_URL;
const urls = {
  users: {
    fetchProfilePicture: `${apiPrefix}/file`,
    updateUserDetails: `${apiPrefix}/users`,
    updateUserProfilePic: `${apiPrefix}/files`,
  },
};

export default urls;
