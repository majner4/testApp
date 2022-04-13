import {
  LinearProgress,
  Avatar,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Formik, Field } from "formik";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { TextField } from "formik-material-ui";
import { Link, useNavigate } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";
import { IRegisterFormValues } from "../types";
import { createUser, loginUser, IFUser } from "../services";
import { StyledForm, SubmitButon } from "../components";
import { VFC } from "react";

export const RegisterPage: VFC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const hanleRegister = async (data: IFUser) => {
    const register = await createUser.create(data);
    const notification = register.statusMessage;
    if (register?.error) {
      enqueueSnackbar(notification.message, { variant: notification.type });
    }

    if (!register.error) {
      let login = await loginUser.login(data);
      const token = login.data.token;
      if (token && !login.error) {
        if (data) {
          Cookies.set("token", token);
          navigate("/profile/news");
        }
      }
    }
  };
  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div>
          <Avatar>
            <PersonAdd style={{ fontSize: "2rem" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrace
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors: Partial<IRegisterFormValues> = {};
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
              if (!values.confirmPassword) {
                errors.confirmPassword = "Povinné pole";
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Hesla se musí shodovat";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                hanleRegister(values);
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
                />
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Heslo znovu"
                  type="password"
                  id="confirmPassword"
                />
                {isSubmitting && <LinearProgress />}
                <br />
                <SubmitButon
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Registrovat se
                </SubmitButon>
              </StyledForm>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              {/* <Link to="/forgotPassword">
                  Zapomenuté heslo?
                </Link> */}
            </Grid>
            <Grid item>
              <Link to="/login">Máte účet? Přihlášení.</Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};
