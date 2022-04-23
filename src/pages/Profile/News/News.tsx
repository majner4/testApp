import { useCallback, useEffect, VFC } from "react";
import { Favorite, Share, MoreVert } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { NewsForm, RootContainer } from "../../../components";
import Cookies from "js-cookie";
import { getUserInfo, getUsersNews } from "../../../services";
import { IUserNews } from "../../../types";
import moment from "moment";
import { useUserInfo, useUserNews } from "../../../hooks";
moment.locale("cs");

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "60px",
  height: "60px",
  fontSize: "0.8rem",
  backgroundColor: "#000",
}));

export const News: VFC = () => {
  const token = Cookies.get("token");
  const {
    context: { userNews },
  } = useUserNews();
  const { setNews, news } = userNews;

  const {
    context: { userInfoData },
  } = useUserInfo();
  const { setUserInfoData } = userInfoData;

  const { enqueueSnackbar } = useSnackbar();

  const getNews = useCallback(async () => {
    if (token) {
      const data = await getUsersNews.get(token);
      if (data) {
        setNews(data);
      }
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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

  const handleForm = () => {
    getNews();
  };

  useEffect(() => {
    getNews();
    getUserInfoData();
  }, [getNews, getUserInfoData]);

  const renderNewsItem = (news?: IUserNews[]) => {
    let newsItem;
    if (news && news.length) {
      newsItem = news?.map((item, index) => {
        return (
          <Grid item key={index}>
            <Card key={index}>
              <CardHeader
                avatar={<StyledAvatar>{item.authorNews}</StyledAvatar>}
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
      newsItem = <div>Nebyly nalezeny žádné příspěvky</div>;
    }

    return newsItem;
  };

  return (
    <RootContainer>
      <Typography variant="h4" align="center" color="textPrimary">
        Příspěvky
      </Typography>
      <NewsForm
        userToken={token}
        handleChange={() => handleForm()}
        handleNotification={(notification) =>
          enqueueSnackbar(notification.message, { variant: notification.type })
        }
      />
      <Grid container spacing={2}>
        {renderNewsItem(news)}
      </Grid>
    </RootContainer>
  );
};
