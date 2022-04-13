import { Typography } from "@mui/material";
import { VFC } from "react";
import { RootContainer } from "../../../components";

export const Settings: VFC = () => {
  return (
    <RootContainer>
      <Typography variant="h4" align="center" color="textPrimary">
        Nastavení
      </Typography>
    </RootContainer>
  );
};
