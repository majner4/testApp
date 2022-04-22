import {
  Grid,
  Box,
  FormControlLabel,
  Switch,
  Zoom,
  Paper,
  Theme,
} from "@mui/material";
import { FormWrapper, RootContainer, SignInForm } from "../components";
import { useState, VFC } from "react";

export const SignInPage: VFC = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const icon = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <Box component="svg" sx={{ width: 100, height: 100 }}>
        <Box
          component="polygon"
          sx={{
            fill: (theme: Theme) => theme.palette.common.white,
            stroke: (theme) => theme.palette.divider,
            strokeWidth: 1,
          }}
          points="0,100 50,00, 100,100"
        />
      </Box>
    </Paper>
  );
  return (
    <Grid container component="main">
      <Grid item xs={12}>
        <RootContainer>
          <FormWrapper>
            <SignInForm />
          </FormWrapper>
        </RootContainer>
      </Grid>
      <Box sx={{ height: 180 }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <Box sx={{ display: "flex" }}>
          <Zoom in={checked}>{icon}</Zoom>
          <Zoom
            in={checked}
            style={{ transitionDelay: checked ? "500ms" : "0ms" }}
          >
            {icon}
          </Zoom>
        </Box>
      </Box>
    </Grid>
  );
};
