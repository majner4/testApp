import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { grey } from "@material-ui/core/colors";

interface IFProfileAvatarProps {
  email?: string;
  image?: string;
  style?: object;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    black: {
      color: theme.palette.common.white,
      backgroundColor: grey[900],
      boxShadow:
        "0px 0px 20px -1px rgba(0,0,0,0.5), 0px 10px 16px 0px rgba(0,0,0,0.2), 0px 1px 10px 0px rgba(0,0,0,0.5)",
    },
  })
);

const ProfileAvatar = (props: IFProfileAvatarProps) => {
  const { email, style, image } = props;
  const classes = useStyles();
  const upperCasedEmail = email && email.toUpperCase();
  return (
    <div className={classes.root}>
      <Avatar
        alt={upperCasedEmail}
        src={image}
        className={classes.black}
        style={style ?? {}}
      />
    </div>
  );
};

export default ProfileAvatar;
