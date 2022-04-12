import Cookies from "js-cookie";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  styled,
} from "@mui/material";
import {
  EventAvailable,
  ExitToApp,
  Feedback,
  Info,
  Lock,
  SupervisorAccount,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/userContext";

const RootContainer = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "#ffc000",
  textDecoration: "none",
}));

export const ListMenu = () => {
  const userStore = useUserData().context.userData;
  const navigate = useNavigate();

  const logOutUser = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const admin = userStore.data?.role === "admin";
  return (
    <RootContainer>
      <List component="nav" aria-label="main">
        <StyledLink to="/profile/news">
          <ListItem button>
            <ListItemIcon>
              <Feedback />
            </ListItemIcon>
            <ListItemText primary="Novinky" />
          </ListItem>
        </StyledLink>
        <StyledLink to="/profile/info">
          <ListItem button>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="Profil" />
          </ListItem>
        </StyledLink>
        {/* <Link className={classes.link} to="/profile/settings">
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Nastavení" />
          </ListItem>
        </Link> */}
        <StyledLink to="/profile/changePassword">
          <ListItem button>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary="Změna hesla" />
          </ListItem>
        </StyledLink>
        <StyledLink to="/profile/calendar">
          <ListItem button>
            <ListItemIcon>
              <EventAvailable />
            </ListItemIcon>
            <ListItemText primary="Můj kalendář" />
          </ListItem>
        </StyledLink>
        {admin && (
          <>
            <StyledLink to="/profile/admin">
              <ListItem button>
                <ListItemIcon>
                  <SupervisorAccount />
                </ListItemIcon>
                <ListItemText primary="Správa aplikace" />
              </ListItem>
            </StyledLink>
          </>
        )}
        <div onClick={() => logOutUser()}>
          <ListItem button>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Odhlášení" />
          </ListItem>
        </div>
      </List>
    </RootContainer>
  );
};
