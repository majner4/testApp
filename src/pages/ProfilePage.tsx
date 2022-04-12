import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  CardActions,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { Publish, Edit, Favorite, Share, MoreVert } from "@mui/icons-material";
import { UserInfoFormik, NewsFormik } from "../components/Forms";
import { getUserDataByToken } from "../services/userAPI";
import { getUserInfo } from "../services/userInfoAPI";
import { getUserNews } from "../services/userNewsAPI";
import {
  uploadProfileImage,
  updateProfileImage,
} from "../services/uploadFileApi";
import { Settings } from "../components/Settings";
import { ChangePassword } from "../components/ChangePassword";
import { useUserData } from "../contexts/userContext";
import { AdminSection } from "../components/AdminSection";
import { ProfileAvatar } from "../components/Avatar";
import { Sidebar } from "../components/Sidebar";
import { News } from "../components/News";
import { IFUserNews } from "../types/FormTypes";
import moment from "moment";

export interface IFUserData {
  email?: string;
  _id?: string;
  date?: Date;
  role?: string;
}

export const ProfilePage = () => {
  const userStore = useUserData().context.userData;
  const userInfoStore = useUserData().context.userInfoData;
  const [updateForm, setUpdateForm] = useState(false);
  const [myNews, setMyNews] = useState<IFUserNews[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const token = Cookies.get("token");

  const getUserInfoData = async () => {
    if (token) {
      const getInfo = await getUserInfo.get(token);
      if (getInfo) {
        userInfoStore.setUserInfoData(getInfo);
      }
    } else {
      return;
    }
  };

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

  const getMyNews = async () => {
    if (token) {
      const data = await getUserNews.get(token);
      if (data) {
        setMyNews(data);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getUserInfoData();
    getUserData();
    getMyNews();
  }, []);

  const renderUserData = () => {
    return (
      <Grid item xs={12}>
        <Typography variant="body1" align="left" color="textPrimary">
          Příjmení: {userInfoStore.infoData?.lastName}
        </Typography>
        <Typography variant="body1" align="left" color="textPrimary">
          Jméno: {userInfoStore.infoData?.firstName}
        </Typography>
        <Typography variant="body1" align="left" color="textPrimary">
          Věk: {userInfoStore.infoData?.age}
        </Typography>
        <Button onClick={() => setUpdateForm(true)}>Upravit</Button>
      </Grid>
    );
  };

  const renderUserFormik = () => {
    return (
      <UserInfoFormik
        formValues={userInfoStore.infoData}
        userToken={token}
        updatedForm={(updated) => setUpdateForm(!updated)}
        handleNotification={(notification) =>
          enqueueSnackbar(notification.message, { variant: notification.type })
        }
      />
    );
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = e.target.files?.[0];
    if (uploadFile && token) {
      if (!userInfoStore.infoData?.imageUrl) {
        const createProfileImage = await uploadProfileImage.create(
          uploadFile,
          token
        );
        createProfileImage && getUserInfoData();
      } else {
        const updateteProfileImage = await updateProfileImage.update(
          uploadFile,
          token
        );
        updateteProfileImage && getUserInfoData();
      }
    }
  };

  const renderMyNewsItem = (news?: IFUserNews[]) => {
    let newsItem;
    if (news && news.length) {
      newsItem = news?.map((item, index) => {
        return (
          <Grid item>
            <Card key={index}>
              <CardHeader
                avatar={<Avatar aria-label="recipe">{item.authorNews}</Avatar>}
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }
                title={item.titleNews}
                subheader={
                  item.createdDateNews &&
                  moment(item.createdDateNews.toString()).format(
                    "DD/MM/YYYY HH:mm"
                  )
                }
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.newsDescription}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                  <Share />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        );
      });
    } else {
      newsItem = <div>Nebyly nalezeny žádné moje příspěvky</div>;
    }

    return newsItem;
  };

  const handleForm = () => {
    getMyNews();
  };

  const UserInfo = () => {
    return (
      <>
        <div>
          <ProfileAvatar
            email={userStore.data?.email}
            image={userInfoStore.infoData?.imageUrl}
            style={{
              fontSize: "70px",
              width: "200px",
              height: "200px",
            }}
          />
          <input
            accept="image/*"
            hidden
            id="avatar-image-upload"
            type="file"
            onChange={(e) => handleUploadImage(e)}
          />
          <label htmlFor="avatar-image-upload">
            <Button variant="contained" color="primary" component="span">
              {userInfoStore.infoData?.imageUrl ? <Edit /> : <Publish />}
              {userInfoStore.infoData?.imageUrl ? "Změnit" : "Nahrát"}
            </Button>
          </label>
        </div>
        <div>
          <Typography variant="h4" align="center" color="textPrimary">
            Osobní informace
          </Typography>
          {userInfoStore.infoData?.firstName && !updateForm
            ? renderUserData()
            : renderUserFormik()}
        </div>
        <div>
          <Typography variant="h4" align="center" color="textPrimary">
            Moje příspěvky
          </Typography>
          <NewsFormik
            formValues={{}}
            userToken={token}
            handleChange={() => handleForm()}
            handleNotification={(notification) =>
              enqueueSnackbar(notification.message, {
                variant: notification.type,
              })
            }
          />
          <Grid container spacing={2}>
            {renderMyNewsItem(myNews)}
          </Grid>
        </div>
      </>
    );
  };

  const renderProfileRoutes = () => {
    const admin = userStore.data?.role === "admin";

    return (
      <Routes>
        <Route path="/profile/info" element={<UserInfo />} />
        <Route path="/profile/settings" element={<Settings />} />
        <Route path="/profile/changePassword" element={<ChangePassword />} />
        <Route path="/profile/news" element={<News />} />
        {admin && <Route path="/profile/admin" element={<AdminSection />} />}
      </Routes>
    );
  };
  return (
    <div>
      <Sidebar
        userEmail={userStore.data?.email}
        userImage={userInfoStore.infoData?.imageUrl}
      >
        <Grid container>
          <Grid item xs={12}>
            <Paper>{renderProfileRoutes()}</Paper>
            {/* <div>
              <Button
            </div> */}
          </Grid>
        </Grid>
      </Sidebar>
    </div>
  );
};
