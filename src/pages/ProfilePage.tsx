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
} from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import PublishIcon from "@material-ui/icons/Publish";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UserInfoFormik from "../components/Forms/UserInfoFormik";
import { getUserDataByToken } from "../services/userAPI";
import { getUserInfo } from "../services/userInfoAPI";
import { getUserNews } from "../services/userNewsAPI";
import {
  uploadProfileImage,
  updateProfileImage,
} from "../services/uploadFileApi";
import Settings from "../components/Settings";
import ChangePassword from "../components/ChangePassword";
import { useUserData } from "../contexts/userContext";
import AdminSection from "../components/AdminSection";
import ProfileAvatar from "../components/Avatar";
import Sidebar from "../components/Sidebar";
import UserCalendar from "../components/UserCalendar";
import News from "../components/News";
import NewsFormik from "../components/Forms/NewsFormik";
import { IFUserNews } from "../types/FormTypes";
import moment from "moment";

export interface IFUserData {
  email?: string;
  _id?: string;
  date?: Date;
  role?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      flexGrow: 1,
    },
    container: {
      height: "calc(100% - 56px)",
    },
    paper: {
      display: "flex",
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      marginBottom: 0,
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    button: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#ffc000",
      color: "#000",
      "&:hover, &:focus": {
        backgroundColor: "#ebb100",
      },
    },
    iconMargin: {
      marginRight: "10px",
    },
    label: {
      marginBottom: "25px",
    },
    profileHeader: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderBottom: "2px solid #d3d3d3",
    },
    profileInfo: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderBottom: "2px solid #d3d3d3",
      marginTop: "25px",
    },
    profileNews: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "25px",
    },
    avatar: {
      width: "60px",
      height: "60px",
      fontSize: "0.8rem",
      backgroundColor: "#000",
    },
  })
);

const ProfilePage = () => {
  const classes = useStyles();
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
        <Button
          classes={{ root: classes.button }}
          onClick={() => setUpdateForm(true)}
        >
          Upravit
        </Button>
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
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {item.authorNews}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
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
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
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
        <div className={classes.profileHeader}>
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
          <label className={classes.label} htmlFor="avatar-image-upload">
            <Button variant="contained" color="primary" component="span">
              {userInfoStore.infoData?.imageUrl ? (
                <EditIcon className={classes.iconMargin} />
              ) : (
                <PublishIcon className={classes.iconMargin} />
              )}
              {userInfoStore.infoData?.imageUrl ? "Změnit" : "Nahrát"}
            </Button>
          </label>
        </div>
        <div className={classes.profileInfo}>
          <Typography variant="h4" align="center" color="textPrimary">
            Osobní informace
          </Typography>
          {userInfoStore.infoData?.firstName && !updateForm
            ? renderUserData()
            : renderUserFormik()}
        </div>
        <div className={classes.profileNews}>
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
          <Grid container justify="center" spacing={2}>
            {renderMyNewsItem(myNews)}
          </Grid>
        </div>
      </>
    );
  };

  const renderProfileRoutes = () => {
    const admin = userStore.data?.role === "admin";

    return (
      <Switch>
        <Route path="/profile/info" component={UserInfo} />
        <Route path="/profile/settings" component={Settings} />
        <Route path="/profile/changePassword" component={ChangePassword} />
        <Route path="/profile/calendar" component={UserCalendar} />
        <Route path="/profile/news" component={News} />
        {admin && <Route path="/profile/admin" component={AdminSection} />}
      </Switch>
    );
  };
  return (
    <div className={classes.root}>
      <Sidebar
        userEmail={userStore.data?.email}
        userImage={userInfoStore.infoData?.imageUrl}
      >
        <Grid className={classes.container} container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>{renderProfileRoutes()}</Paper>
            {/* <div>
              <Button
            </div> */}
          </Grid>
        </Grid>
      </Sidebar>
    </div>
  );
};

export default ProfilePage;
