import axios from "axios";
export interface IFUser {
  email: string;
  password: string;
  _id?: string;
  createdDate?: Date;
  blocked?: boolean;
}

export interface IFChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const getAll = {
  get: async (token: string) => {
    let res = await axios.get(
      `https://no-gamling-group-api.herokuapp.com/api/users`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const getUserDataByToken = {
  getData: async (token: string) => {
    let res = await axios.get(
      `https://no-gamling-group-api.herokuapp.com/api/user`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const createUser = {
  create: async (data: IFUser) => {
    const currentData = {
      email: data.email,
      password: data.password,
      createdDate: new Date(),
    };
    let res = await axios.post(
      `https://no-gamling-group-api.herokuapp.com/api/user/register`,
      currentData
    );
    return res.data;
  },
};

export const loginUser = {
  login: async (data: IFUser) => {
    let res = await axios.post(
      `https://no-gamling-group-api.herokuapp.com/api/user/login`,
      data
    );
    return res.data;
  },
};

export const updateUser = {
  update: async (data: IFUser, token: string) => {
    let res = await axios.put(
      `https://no-gamling-group-api.herokuapp.com/api/user`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const updatePassword = {
  update: async (data: IFChangePassword, token: string) => {
    let res = await axios.put(
      `https://no-gamling-group-api.herokuapp.com/api/user/changePassword`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};
