import axios from "axios";
import urls from "./urls";
import { UserData } from "./Components/UserProfile/UserInformation";

const api = {
  userInformation: {
    async fetchProfilePicture(username: string) {
      const response = await axios.get(
        `${urls.users.fetchProfilePicture}/${username}`
      );
      return response;
    },
    async handleSaveClick(userData: UserData) {
      await axios.patch(`${urls.users.updateUserDetails}`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    async updateUserProfilePic(username: String, pictureFormData: FormData) {
      await axios.post(
        `${urls.users.updateUserProfilePic}/${username}`,
        pictureFormData
      );
    },
  },
};

export default api;
