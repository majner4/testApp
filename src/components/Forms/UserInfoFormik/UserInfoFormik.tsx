import { LinearProgress } from "@mui/material";
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import { createUserInfo, updateUserInfo } from "../../../services";
import { IUserInfoFormValues, IAlert } from "../../../types";
import { useUserInfo } from "../../../contexts/";
import { StyledForm, SubmitButon } from "../../GlobalStyledComponents";

interface IUserInfoFormikProps {
  userToken?: string | null;
  formValues: IUserInfoFormValues | undefined;
  updatedForm: (updated: boolean) => void;
  handleNotification: (alert: IAlert) => void;
}

export const UserInfoFormik = (props: IUserInfoFormikProps) => {
  const { userToken, formValues, updatedForm, handleNotification } = props;
  const {
    context: { userInfoData },
  } = useUserInfo();
  const { setUserInfoData } = userInfoData;

  const defaultValues = {
    firstName: "",
    lastName: "",
    age: null,
    id: "",
  };

  const initialValues = formValues ?? defaultValues;
  const handleSubmitUserInfoData = async (data: IUserInfoFormValues) => {
    if (!formValues?.firstName && userToken) {
      const createUserInfoData = await createUserInfo.create(data, userToken);
      if (createUserInfoData) {
        handleNotification(createUserInfoData.statusMessage);
        setUserInfoData(createUserInfoData.userInfo);
      }
    } else if (userToken) {
      const updateUserInfoData = await updateUserInfo.update(data, userToken);
      if (updateUserInfoData) {
        handleNotification(updateUserInfoData.statusMessage);
        setUserInfoData(updateUserInfoData.userInfo);
      }
    }
    updatedForm(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={(values) => {
        const errors: Partial<IUserInfoFormValues> = {};
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
        <StyledForm>
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
          <SubmitButon
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Uložit
          </SubmitButon>
        </StyledForm>
      )}
    </Formik>
  );
};
