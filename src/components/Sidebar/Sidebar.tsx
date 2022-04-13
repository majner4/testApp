import React from "react";

import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  styled,
  useTheme,
} from "@mui/material";
import { Menu, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ListMenu } from "../ListMenu";
import { ProfileAvatar } from "../Avatar";

const drawerWidth = 240;

const RootContainer = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#ffc000",
  height: "60px",
}));

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const StyledContent = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: -drawerWidth,
}));

interface IFSideBarProps {
  userEmail?: string;
  userImage?: string;
  children: React.ReactNode;
}

export const Sidebar = (props: IFSideBarProps) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { userEmail, userImage } = props;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <RootContainer>
      <StyledAppBar position="fixed">
        <StyledToolBar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <Menu />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <ProfileAvatar email={userEmail} image={userImage} />
          </IconButton>
        </StyledToolBar>
      </StyledAppBar>
      <StyledDrawer variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <ListMenu />
      </StyledDrawer>
      <StyledContent>
        <DrawerHeader />
        {props.children}
      </StyledContent>
    </RootContainer>
  );
};