import React, { useEffect } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import NewsFormik from "../Forms/NewsFormik";
import Cookies from "js-cookie";
import { getUsersNews } from "../../services/userNewsAPI";
import { useUserData } from "../../contexts/userContext";
import { IFUserNews } from "../../types/FormTypes";
import moment from "moment";
moment.locale("cs");
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    avatar: {
      width: "60px",
      height: "60px",
      fontSize: "0.8rem",
      backgroundColor: "#000",
    },
  })
);

const News = () => {
  const classes = useStyles();
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
      newsItem = <div>Nebyly nalezeny žádné příspěvky</div>;
    }

    return newsItem;
  };

  return (
    <div className={classes.root}>
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
      <Grid container justify="center" spacing={2}>
        {renderNewsItem(userNewsStore.news)}
      </Grid>
    </div>
  );
};

export default News;
