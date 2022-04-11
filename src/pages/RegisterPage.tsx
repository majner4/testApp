import React from "react";
import {
  Button,
  LinearProgress,
  Avatar,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { TextField } from "formik-material-ui";
import { Link, useHistory } from "react-router-dom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { makeStyles } from "@material-ui/core/styles";
import { IFRegisterFormValues } from "../types/FormTypes";
import { createUser, loginUser, IFUser } from "../services/userAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(http://icoders.cz/img/intro-bg.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "auto",
    backgroundPosition: "cover",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: "60px",
    height: "60px",
    color: "#000",
    margin: theme.spacing(1),
    backgroundColor: "#ffc000",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#ffc000",
    color: "#000",
    "&:hover, &:focus": {
      backgroundColor: "#ebb100",
    },
  },
  link: {
    color: "#16409f",
  },
}));

const RegisterPage = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

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
          history.push("/profile/news");
        }
      }
    }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon style={{ fontSize: "2rem" }} />
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
              const errors: Partial<IFRegisterFormValues> = {};
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
              <Form className={classes.form}>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Registrovat se
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              {/* <Link to="/forgotPassword">
                  Zapomenuté heslo?
                </Link> */}
            </Grid>
            <Grid item>
              <Link className={classes.link} to="/login">
                Máte účet? Přihlášení.
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
