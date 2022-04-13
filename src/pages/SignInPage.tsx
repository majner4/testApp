import { Avatar, Grid, Typography, LinearProgress } from "@mui/material";
import { Formik, Field } from "formik";
import { AccountBox } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { TextField } from "formik-material-ui";
import { Link, useNavigate } from "react-router-dom";
import { ILoginFormValues } from "../types";
import { loginUser, IFUser } from "../services";
import { RootContainer, StyledForm, SubmitButon } from "../components";
import { VFC } from "react";

export const SignInPage: VFC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (data: IFUser) => {
    let login = await loginUser.login(data);
    const notification = login.statusMessage;

    const token = login.data?.token;
    if (token && !login.error) {
      Cookies.set("token", token);
      navigate("/profile/news");
    } else {
      enqueueSnackbar(notification.message, { variant: notification.type });
    }
  };
  return (
    <Grid container component="main">
      <Grid item xs={12}>
        <RootContainer>
          <Avatar sx={{ width: 100, height: 100, background: "#ffc000" }}>
            <AccountBox sx={{ fontSize: "5rem", color: "#000" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Přihlášení
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors: Partial<ILoginFormValues> = {};
              if (!values.email) {
                errors.email = "Povinné pole";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Nevalidní emailová adresa";
              }
              if (!values.password) {
                errors.password = "Povinné pole";
              } else if (values.password.length < 8) {
                errors.password = "Heslo musí mít minimálně 8 znaků";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                handleLogin(values);
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <StyledForm>
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Zadejte email"
                  name="email"
                  autoComplete="email"
                />
                <br />
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Zadejte heslo"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {isSubmitting && <LinearProgress />}
                <SubmitButon
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Přihlásit se
                </SubmitButon>
                {/* <Button color='primary' variant='contained'>
									<Facebook />
								</Button> */}
                <Typography variant="body1" textAlign="right">
                  <Link to="/register">Nemáte účet? Registrace</Link>
                </Typography>
              </StyledForm>
            )}
          </Formik>
        </RootContainer>
      </Grid>
    </Grid>
  );
};
