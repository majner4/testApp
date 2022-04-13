import { useEffect, VFC } from "react";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import { Sidebar } from "../../components";
import { getUserDataByToken } from "../../services";
import { useUserInfo, useUserData } from "../../contexts";

export const Profile: VFC = () => {
  const {
    context: { userData },
  } = useUserData();
  const { data, setUserData } = userData;

  const {
    context: { userInfoData },
  } = useUserInfo();
  const { infoData } = userInfoData;

  const token = Cookies.get("token");

  const getUserData = async () => {
    if (token) {
      const data = await getUserDataByToken.getData(token);
      if (data) {
        setUserData(data);
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
      <Sidebar userEmail={data?.email} userImage={infoData?.imageUrl}>
        <Grid container>
          <Grid item xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </Sidebar>
    </div>
  );
};
