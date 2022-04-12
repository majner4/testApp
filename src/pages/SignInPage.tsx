import {
  Button,
  Avatar,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  LinearProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { Facebook, AccountBox } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { TextField } from "formik-material-ui";
import { Link, useNavigate } from "react-router-dom";
import { IFLoginFormValues } from "../types/FormTypes";
import { loginUser, IFUser } from "../services/userAPI";

export const SignInPage = () => {
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
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div>
          <Avatar>
            <AccountBox style={{ fontSize: "2rem" }} />
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
              const errors: Partial<IFLoginFormValues> = {};
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
              <Form>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Přihlásit se
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              <Button color="primary" variant="contained">
                <Facebook />
              </Button>
            </Grid>
            <Grid item xs>
              {/* <Link to="/forgotPasword">
                Zapomenuté heslo?
              </Link> */}
            </Grid>
            <Grid item>
              <Link to="/register">Nemáte účet? Registrace</Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};
