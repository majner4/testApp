import { Avatar, styled } from "@mui/material";

interface IFProfileAvatarProps {
  email?: string;
  image?: string;
  style?: object;
}

const RootContainer = styled("div")(({ theme }) => ({
  display: "flex",
  "& > *": {
    margin: theme.spacing(1),
  },
}));

export const ProfileAvatar = (props: IFProfileAvatarProps) => {
  const { email, style, image } = props;
  const upperCasedEmail = email && email.toUpperCase();
  return (
    <RootContainer>
      <Avatar alt={upperCasedEmail} src={image} style={style ?? {}} />
    </RootContainer>
  );
};
