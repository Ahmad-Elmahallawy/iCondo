import axios, { AxiosResponse } from "axios";
import urls from "./urls";
import { UserData } from "./Components/UserProfile/UserInformation";
import { CondoInfo } from "./Components/CondoProfile/MyCondos";
import { IndividualCondo } from "./Components/CondoProfile/IndividualCondoProfile";
import {
  PropertyByIdResponse,
  SinglePropertyFacilities,
} from "./Pages/FacilitiesStatusPage";
import { UpdateFacilityStatusRequest } from "./Components/CommonFacilities/IndividualFacility";

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
    async getUserInfo(userId: number, token: String) {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
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
    async getCondoFiles(token: string) {
      const response: AxiosResponse<Array<File>> = await axios.get(
        `${urls.userCondos.getCondoFiles}`,
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
    async getProperties(token: String) {
      const response: AxiosResponse<PropertyByIdResponse[]> = await axios.get(
        `${urls.properties.getAllProperties}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    async getAllProperties(companyId: number, token: String) {
      const response = await axios.get(`${urls.properties.getAllProperties}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          where: {
            company: {
              id: companyId,
            },
          },
        },
      });

      return response;
    },

    async getPropertyById(propertyId: number, token: String) {
      const response: AxiosResponse<PropertyByIdResponse> = await axios.get(
        `${urls.properties.getAllProperties}/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },

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

  costs: {
    async postCost(
      companyId: number,
      operationName: String,
      operationCost: number,
      token: String
    ) {
      let costData: any = {
        company: {
          id: companyId,
        },
        costName: operationName,
        amount: operationCost,
      };

      const response = await axios.post(urls.costs.addCost, costData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },

    async getCosts(companyId: number, token: String) {
      const response = await axios.get(`${urls.costs.getCosts}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          where: {
            company: {
              id: companyId,
            },
          },
        },
      });

      return response;
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
    async getCompanyEmployees(companyId: number, token: String) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/companies/${companyId}/companyEmployees`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  commonFacility: {
    async postCommonFacility(
      facilityType: String,
      propertyId: number,
      status: String,
      token: String
    ) {
      let commonFacilityData: any = {
        facilityType: facilityType,
        property: {
          id: propertyId,
        },
        status: status,
      };
      const response = await axios.post(
        urls.commonFacility.submitCommonFacility,
        commonFacilityData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    async getAllCommonFacilities(token: String) {
      const response: AxiosResponse<SinglePropertyFacilities[]> =
        await axios.get(`${urls.commonFacility.submitCommonFacility}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      return response.data;
    },

    async getCommonFacilitiesByPropertyId(propertyId: number, token: String) {
      const response: AxiosResponse<SinglePropertyFacilities[]> =
        await axios.get(
          `${urls.commonFacility.commonFacilitiesByPropertyId}/${propertyId}/commonFacilities`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      return response.data;
    },

    async updateFacilityStatus(
      data: UpdateFacilityStatusRequest,
      facilityId: String,
      token: String
    ) {
      const response = await axios.patch(
        `${urls.commonFacility.submitCommonFacility}/${facilityId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    },
  },
};

export default api;
