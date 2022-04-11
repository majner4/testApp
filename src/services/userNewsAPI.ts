import axios from "axios";
import { IFUserNews } from "../types/FormTypes";

export const getUsersNews = {
  get: async (token: string) => {
    let res = await axios.get(
      `https://no-gamling-group-api.herokuapp.com/api/usersNews`,
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
      `https://no-gamling-group-api.herokuapp.com/api/userNews`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const createUserNews = {
  create: async (data: IFUserNews, token: string) => {
    let res = await axios.post(
      `https://no-gamling-group-api.herokuapp.com/api/userNews`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const updateUserNews = {
  update: async (data: IFUserNews, token: string) => {
    let res = await axios.put(
      `https://no-gamling-group-api.herokuapp.com/api/userNews`,
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
