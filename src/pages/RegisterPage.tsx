import { Grid } from "@mui/material";

import { FormWrapper, RegisterForm, RootContainer } from "../components";
import { VFC } from "react";

export const RegisterPage: VFC = () => {
  return (
    <Grid container component="main">
      <Grid item xs={12}>
        <RootContainer>
          <FormWrapper>
            <RegisterForm />
          </FormWrapper>
        </RootContainer>
      </Grid>
    </Grid>
  );
};
