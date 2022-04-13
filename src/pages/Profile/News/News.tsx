import { useEffect } from "react";
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
import { NewsFormik, RootContainer } from "../../../components";
import Cookies from "js-cookie";
import { getUsersNews } from "../../../services";
import { useUserData } from "../../../contexts/userContext";
import { IFUserNews } from "../../../types/FormTypes";
import moment from "moment";
moment.locale("cs");

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "60px",
  height: "60px",
  fontSize: "0.8rem",
  backgroundColor: "#000",
}));

export const News = () => {
  const token = Cookies.get("token");
  const userNewsStore = useUserData().context.userNews;

  const { enqueueSnackbar } = useSnackbar();

  const getNews = async () => {
    if (token) {
      const data = await getUsersNews.get(token);
      if (data) {
        userNewsStore.setNews(data);
      }
    } else {
      return;
    }
  };

  const handleForm = () => {
    getNews();
  };

  useEffect(() => {
    getNews();
  }, []);

  const renderNewsItem = (news?: IFUserNews[]) => {
    let newsItem;
    if (news && news.length) {
      newsItem = news?.map((item, index) => {
        console.log(item, "news");
        return (
          <Grid item>
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
      <NewsFormik
        formValues={{}}
        userToken={token}
        handleChange={() => handleForm()}
        handleNotification={(notification) =>
          enqueueSnackbar(notification.message, { variant: notification.type })
        }
      />
      <Grid container spacing={2}>
        {renderNewsItem(userNewsStore.news)}
      </Grid>
    </RootContainer>
  );
};
