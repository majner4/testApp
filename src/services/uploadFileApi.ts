import axios from "axios";

export const getProfileImage = {
  get: async () => {
    let res = await axios.get(
      `https://no-gamling-group-api.herokuapp.com/api/user/images`
    );
    return res.data;
  },
};

export const uploadProfileImage = {
  create: async (file: File, token: string) => {
    const formData = new FormData();
    formData.append("image", file);
    let res = await axios.post(
      `https://no-gamling-group-api.herokuapp.com/api/user/image`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};

export const updateProfileImage = {
  update: async (file: File, token: string) => {
    const formData = new FormData();
    formData.append("image", file);
    let res = await axios.put(
      `https://no-gamling-group-api.herokuapp.com/api/user/image`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};
