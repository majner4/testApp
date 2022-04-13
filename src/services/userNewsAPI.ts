import axios from "axios";
import { IUserNews } from "../types";

export const getUsersNews = {
  get: async (token: string) => {
    let res = await axios.get(
      `https://my-test-app-react-be.herokuapp.com/api/usersNews`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const getUserNews = {
  get: async (token: string) => {
    let res = await axios.get(
      `https://my-test-app-react-be.herokuapp.com/api/userNews`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const createUserNews = {
  create: async (data: IUserNews, token: string) => {
    let res = await axios.post(
      `https://my-test-app-react-be.herokuapp.com/api/userNews`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const updateUserNews = {
  update: async (data: IUserNews, token: string) => {
    let res = await axios.put(
      `https://my-test-app-react-be.herokuapp.com/api/userNews`,
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
