import { useEffect } from "react";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import { Sidebar } from "../../components";
import { getUserDataByToken } from "../../services";
import { useUserData } from "../../contexts/userContext";

export interface IFUserData {
  email?: string;
  _id?: string;
  date?: Date;
  role?: string;
}

export const Profile = () => {
  const userStore = useUserData().context.userData;
  const userInfoStore = useUserData().context.userInfoData;
  const token = Cookies.get("token");

  const getUserData = async () => {
    if (token) {
      const data = await getUserDataByToken.getData(token);
      if (data) {
        userStore.setUserData(data);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <Sidebar
        userEmail={userStore.data?.email}
        userImage={userInfoStore.infoData?.imageUrl}
      >
        <Grid container>
          <Grid item xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </Sidebar>
    </div>
  );
};
