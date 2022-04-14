import { useCallback, useEffect, VFC } from "react";
import { LinearProgress, Typography } from "@mui/material";
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { getUserDataByToken, updatePassword } from "../../../services";
import { RootContainer, StyledForm, SubmitButon } from "../../../components";
import { useUserData } from "../../../hooks";

interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const ChangePassword: VFC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    context: { userData },
  } = useUserData();
  const { setUserData } = userData;

  const token = Cookies.get("token");

  const handleChangePassword = async (data: IChangePassword) => {
    if (token) {
      const updatedPassword = await updatePassword.update(data, token);
      const notification = updatedPassword.statusMessage;
      enqueueSnackbar(notification.message, { variant: notification.type });
    }
  };

  const getUserData = useCallback(async () => {
    if (token) {
      const data = await getUserDataByToken.getData(token);
      if (data) {
        setUserData(data);
      }
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <RootContainer>
      <Typography variant="h4" align="center" color="textPrimary">
        Změna hesla
      </Typography>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validate={(values) => {
          const errors: Partial<IChangePassword> = {};
          if (!values.oldPassword) {
            errors.oldPassword = "Povinné pole";
          }
          if (!values.newPassword) {
            errors.newPassword = "Povinné pole";
          } else if (values.newPassword.length < 8) {
            errors.newPassword = "Heslo musí mít minimálně 8 znaků";
          }
          if (!values.confirmNewPassword) {
            errors.confirmNewPassword = "Povinné pole";
          } else if (values.newPassword !== values.confirmNewPassword) {
            errors.confirmNewPassword = "Hesla se musí shodovat";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            handleChangePassword(values);
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
              name="oldPassword"
              label="Staré heslo"
              type="password"
              id="oldPassword"
            />
            <br />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="Nové heslo"
              type="password"
              id="newPassword"
            />
            <br />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmNewPassword"
              label="Nové heslo znovu"
              type="password"
              id="confirmNewPassword"
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
              Změnit heslo
            </SubmitButon>
          </StyledForm>
        )}
      </Formik>
    </RootContainer>
  );
};
