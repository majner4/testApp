import axios from "axios";
import { IUserInfoFormValues } from "../types";

export const getUserInfo = {
  get: async (token: string) => {
    let res = await axios.get(
      `https://my-test-app-react-be.herokuapp.com/api/userInfo`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const createUserInfo = {
  create: async (data: IUserInfoFormValues, token: string) => {
    let res = await axios.post(
      `https://my-test-app-react-be.herokuapp.com/api/userInfo/`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const updateUserInfo = {
  update: async (data: IUserInfoFormValues, token: string) => {
    let res = await axios.put(
      `https://my-test-app-react-be.herokuapp.com/api/userInfo/`,
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
//     let res = await axios.post(`https://my-test-app-react-be.herokuapp.com/api/user/login:${id}`, data);
//     return res.data;
//   }
// }
