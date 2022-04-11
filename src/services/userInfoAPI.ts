import axios from "axios";
import { IFUserInfoFormValues } from "../types/FormTypes";

export interface IFUserInfo {
  firstName?: string;
  lastName?: string;
  age?: number | null;
  id: string;
}

export const getUserInfo = {
  get: async (token: string) => {
    let res = await axios.get(
      `https://no-gamling-group-api.herokuapp.com/api/userInfo`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const createUserInfo = {
  create: async (data: IFUserInfoFormValues, token: string) => {
    let res = await axios.post(
      `https://no-gamling-group-api.herokuapp.com/api/userInfo/`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const updateUserInfo = {
  update: async (data: IFUserInfoFormValues, token: string) => {
    let res = await axios.put(
      `https://no-gamling-group-api.herokuapp.com/api/userInfo/`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

// export const deleteUserInfo = {
//   delete: async (data: IFUserInfo, id: string) => {
//     let res = await axios.post(`https://no-gamling-group-api.herokuapp.com/api/user/login:${id}`, data);
//     return res.data;
//   }
// }
