import { Edit, Favorite, MoreVert, Publish, Share } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState, VFC } from "react";
import {
  NewsForm,
  ProfileAvatar,
  RootContainer,
  UserInfoForm,
} from "../../../components";
import {
  updateProfileImage,
  uploadProfileImage,
  getUserInfo,
  getUserNews,
} from "../../../services";
import { IUserNews } from "../../../types";
import moment from "moment";
import { useUserData, useUserInfo } from "../../../hooks";

export const UserInfo: VFC = () => {
  const {
    context: { userInfoData },
  } = useUserInfo();
  const { infoData, setUserInfoData } = userInfoData;

  const {
    context: { userData },
  } = useUserData();
  const { data } = userData;

  const token = Cookies.get("token");

  const [updateForm, setUpdateForm] = useState(false);
  const [myNews, setMyNews] = useState<IUserNews[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const getUserInfoData = useCallback(async () => {
    if (token) {
      const getInfo = await getUserInfo.get(token);
      if (getInfo) {
        setUserInfoData(getInfo);
      }
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getMyNews = useCallback(async () => {
    if (token) {
      const data = await getUserNews.get(token);
      if (data) {
        setMyNews(data);
      }
    } else {
      return;
    }
  }, [token]);

  useEffect(() => {
    getUserInfoData();
    getMyNews();
  }, [getUserInfoData, getMyNews]);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = e.target.files?.[0];
    if (uploadFile && token) {
      if (!infoData?.imageUrl) {
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

  const renderUserData = () => {
    return (
      <Grid item xs={12}>
        <Typography variant="body1" align="left" color="textPrimary">
          Příjmení: {infoData?.lastName}
        </Typography>
        <Typography variant="body1" align="left" color="textPrimary">
          Jméno: {infoData?.firstName}
        </Typography>
        <Typography variant="body1" align="left" color="textPrimary">
          Věk: {infoData?.age}
        </Typography>
        <Button onClick={() => setUpdateForm(true)}>Upravit</Button>
      </Grid>
    );
  };

  const renderUserForm = () => {
    return (
      <UserInfoForm
        formValues={infoData}
        userToken={token}
        updatedForm={(updated) => setUpdateForm(!updated)}
        handleNotification={(notification) =>
          enqueueSnackbar(notification.message, { variant: notification.type })
        }
      />
    );
  };

  const renderMyNewsItem = (news?: IUserNews[]) => {
    let newsItem;
    if (news && news.length) {
      newsItem = news?.map((item, index) => {
        return (
          <Grid item key={index}>
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

  return (
    <RootContainer>
      <ProfileAvatar
        email={data?.email}
        image={infoData?.imageUrl}
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
          {infoData?.imageUrl ? <Edit /> : <Publish />}
          {infoData?.imageUrl ? "Změnit" : "Nahrát"}
        </Button>
      </label>
      <Typography variant="h4" align="center" color="textPrimary">
        Osobní informace
      </Typography>
      {infoData?.firstName && !updateForm ? renderUserData() : renderUserForm()}
      <Typography variant="h4" align="center" color="textPrimary">
        Moje příspěvky
      </Typography>
      <NewsForm
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
    </RootContainer>
  );
};
