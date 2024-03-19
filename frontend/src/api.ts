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
  userAuthentication: {
    async resetPassword(userData: { username: string; password: string }) {
      const response = await axios.patch(
        `${urls.users.resetUserPassword}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    },
  },
  registerationKeys: {
    async userRegisterKey(key: string) {
      const response = await axios.get(
        `${urls.registrationKeys.userRegister}`,
        {
          params: {
            where: {
              value: `${key}`,
            },
          },
        }
      );
      return response;
    },
  },
  properties: {
    /**
     * Deletes a property by its ID.
     * @param propertyId The unique identifier of the property to delete.
     * @returns Promise representing the operation result.
     */
    async deleteProperty(propertyId: string) {
      const response = await axios.delete(`${urls.properties.removeProperty}/${propertyId}`);
      return response;
    },
  },
};

export default api;