import { styled, Typography } from "@mui/material";

const RootContainer = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper,
}));

export const Settings = () => {
  return (
    <RootContainer>
      <Typography variant="h4" align="center" color="textPrimary">
        Nastavení
      </Typography>
    </RootContainer>
  );
};
