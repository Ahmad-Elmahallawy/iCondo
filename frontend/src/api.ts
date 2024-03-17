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
    async postUserCondo(condoId: number, userId: number, token: String) {
      const response = await axios.post(
        urls.userCondos.submitUserCondo,
        {
          condo: {
            id: condoId,
          },
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    },
    // to get the condo ID
    async getUserCondo(userId: number, token: string) {
      const response = await axios.get(`${urls.registrationKeys.getCondoID}`, {
        params: {
          where: {
            user: { id: userId },
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
  },

  requests: {
    async postOwnerRequest(
      companyId: number,
      userId: number,
      requestType: String,
      token: String
    ) {
      const response = await axios.post(
        urls.requests.submitRequest,
        {
          company: {
            id: companyId,
          },
          user: {
            id: userId,
          },
          requestType: requestType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    },
  },

  properties: {
    // to get the property ID
    async getCondoProperty(condoId: number, token: string) {
      const response = await axios.get(`${urls.properties.getProperty}`, {
        params: {
          where: {
            condoUnits: {
              every: {
                id: {
                  equals: condoId,
                },
              },
            },
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
  },

  companies: {
    // get company details
    async getCondoProperty(propertyId: number, token: string) {
      const response = await axios.get(`${urls.companies.getCompany}`, {
        params: {
          where: {
            property: {
              id: propertyId,
            },
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
  },
};

export default api;
