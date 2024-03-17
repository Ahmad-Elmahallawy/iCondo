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
    async getRegistrationKey(key: string) {
      const response = await axios.get(`${urls.registrationKeys.getCondoID}`, {
        params: {
          where: {
            value: { equals: `${key}` },
          },
        },
      });
      return response;
    },
  },

  userCondoList: {
    async postUserCondo(condoId: number, userId: number, token: number) {
      const response = await axios.post(`${urls.userCondos.submitUserCondo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          condo: {
            id: condoId,
          },
          user: {
            id: userId,
          },
        },
      });
      console.log(response);
      return response;
    },
  },
};

export default api;
