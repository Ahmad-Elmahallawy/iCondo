import axios, { AxiosResponse } from "axios";
import urls from "./urls";
import { UserData } from "./Components/UserProfile/UserInformation";
import { CondoInfo } from "./Components/CondoProfile/MyCondos";
import { IndividualCondo } from "./Components/CondoProfile/IndividualCondoProfile";


const api = {
  userInformation: {
    async fetchProfilePicture(username: string) {
      const response = await axios.get(
        `${urls.users.fetchProfilePicture}/${username}`
      );
      return response;
    },
    async fetchUserDetails(id: number, token: String) {
      const response = await axios.get(`${urls.users.fetchUserDetails}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
    async handleSaveClick(userData: UserData, id: number, token: String) {
      await axios.patch(`${urls.users.updateUserDetails}/${id}`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    async handleUserRole(role: any, id: number, token: String) {
      await axios.patch(
        `${urls.users.editUserRole}/${id}`,
        { roles: role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    },
    async updateUserProfilePic(username: String, pictureFormData: FormData) {
      await axios.post(
        `${urls.users.updateUserProfilePic}/${username}`,
        pictureFormData
      );
    },
    async getUserInfo(userId: number, token: String){
      const response = await axios.get(`http://localhost:8000/api/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      return response;
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
    async userRegisterKey(key: String) {
      const response = await axios.get(
        `${urls.registrationKeys.userRegister}`,
        {
          params: {
            where: {
              value: {
                equals: key,
              },
            },
          },
        }
      );

      return response;
    },
    async getRegistrationKey(key: String) {
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
    async getOwnerCondos(userId: number, token: string) {
      const response: AxiosResponse<Array<CondoInfo>> = await axios.get(
        `${urls.users.fetchUserDetails}/${userId}/userCondos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    async getOwnerSingleCondo(condoId: string, token: string) {
      const response: AxiosResponse<IndividualCondo> = await axios.get(
        `${urls.userCondos.getCondoById}/${condoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
  },

  requests: {
    async postOwnerRequest(
      companyId: number,
      userId: number,
      type: String,
      requestType: String,
      token: String
    ) {
      let requestData: any = {
        company: {
          id: companyId,
        },
        user: {
          id: userId,
        },
        requestType: requestType,
        status: "New",
      };

      const response = await axios.post(
        urls.requests.submitRequest,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    },

    async getEmployeeRequest(id: number, token: String) {
      try {
        const response = await axios.get(`${urls.requests.getRequest}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            where: {
              company: { id: id },
            },
          },
        });
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async editRequest(id: String, status: String, token: String) {
      try {
        const response = await axios.patch(
          `${urls.requests.editRequest}/${id}`,
          {
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },

  properties: {
    // to get the property ID
    async getCondoProperty(condoId: number, token: String) {
      const response = await axios.get(`${urls.properties.getProperty}`, {
        // params: {
        //   where: {
        //     condoUnits: {
        //       every: {
        //         id: {
        //           equals: condoId,
        //         },
        //       },
        //     },
        //   },
        // },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    },

    async deleteProperty(propertyId: number, token: String) {
      const response = await axios.delete(
        `${urls.properties.getProperty}/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  },

  companies: {
    // get company details
    async getCompanyProperty(propertyId: number, token: String) {
      try {
        const response = await axios.get(`${urls.companies.getCompany}`, {
          params: {
            where: {
              properties: {
                every: {
                  id: {
                    equals: propertyId,
                  },
                },
              },
            },
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },

  employeeRegistration: {
    async postUser(userData: any, token: String) {
      const response = await axios.post(
        urls.employees.registerUser,

        userData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    },
    async postCompanyEmployee(
      companyId: number,
      userId: number,
      token: String
    ) {
      console.log(companyId, userId, token);

      const response = await axios.post(
        urls.employees.registerCompanyEmployee,

        {
          company: {
            id: companyId,
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
    //Gets employees for a company
    async getCompanyEmployees(companyId: number, token: String){
      try {
        const response = await axios.get(`http://localhost:8000/api/companies/${companyId}/companyEmployees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },

  notifications: {
    async getComapnyNotifications(companyId: number, token: String) {

      const response = await axios.get(`${urls.companies.getCompany}`, {
        params: {
          where: {
            message: {
              contains: `\"company\":{\"id\":${companyId}}`,
            },
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  },
};

export default api;
