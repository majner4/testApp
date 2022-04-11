import React from "react";
import { Button, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { createUserInfo, updateUserInfo } from "../../../services/userInfoAPI";
import { IFUserInfoFormValues } from "../../../types/FormTypes";
import { useUserData } from "../../../contexts/userContext";
import { IFAlert } from "../../../types/AlertTypes";

interface IFUserInfoFormikProps {
  userToken?: string | null;
  formValues: IFUserInfoFormValues | undefined;
  updatedForm: (updated: boolean) => void;
  handleNotification: (alert: IFAlert) => void;
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    maxWidth: "500px",
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
}));

const UserInfoFormik = (props: IFUserInfoFormikProps) => {
  const { userToken, formValues, updatedForm, handleNotification } = props;
  const defaultValues = {
    firstName: "",
    lastName: "",
    age: null,
    id: "",
  };

  const userInfoStore = useUserData().context.userInfoData;

  const initialValues = formValues ?? defaultValues;
  const handleSubmitUserInfoData = async (data: IFUserInfoFormValues) => {
    if (!formValues?.firstName && userToken) {
      const createUserInfoData = await createUserInfo.create(data, userToken);
      if (createUserInfoData) {
        handleNotification(createUserInfoData.statusMessage);
        userInfoStore.setUserInfoData(createUserInfoData.userInfo);
      }
    } else if (userToken) {
      const updateUserInfoData = await updateUserInfo.update(data, userToken);
      if (updateUserInfoData) {
        handleNotification(updateUserInfoData.statusMessage);
        userInfoStore.setUserInfoData(updateUserInfoData.userInfo);
      }
    }
    updatedForm(true);
  };
  const classes = useStyles();
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={(values) => {
        const errors: Partial<IFUserInfoFormValues> = {};
        // if (!values.email) {
        //   errors.email = 'Povinné pole';
        // } else if (
        //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        // ) {
        //   errors.email = 'Nevalidní emailová adresa';
        // }
        // if (!values.password) {
        //   errors.password = 'Povinné pole';
        // } else if(values.password.length < 8) {
        //   errors.password = 'Heslo musí mít minimálně 8 znaků';
        // }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          handleSubmitUserInfoData(values);
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form className={classes.form}>
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="firstName"
            label="Jméno"
            name="firstName"
          />
          <br />
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            name="lastName"
            label="Příjmení"
            id="lastName"
          />
          <br />
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            name="age"
            label="Věk"
            type="number"
            id="age"
          />
          {isSubmitting && <LinearProgress />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Uložit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserInfoFormik;
