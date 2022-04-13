import { LinearProgress } from "@mui/material";
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import { createUserInfo, updateUserInfo } from "../../../services";
import { IFUserInfoFormValues } from "../../../types/FormTypes";
import { useUserData } from "../../../contexts/userContext";
import { IFAlert } from "../../../types/AlertTypes";
import { StyledForm, SubmitButon } from "../../GlobalStyledComponents";

interface IFUserInfoFormikProps {
  userToken?: string | null;
  formValues: IFUserInfoFormValues | undefined;
  updatedForm: (updated: boolean) => void;
  handleNotification: (alert: IFAlert) => void;
}

export const UserInfoFormik = (props: IFUserInfoFormikProps) => {
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
