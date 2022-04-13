import { LinearProgress } from "@mui/material";
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import { createUserNews, updateUserNews } from "../../../services";
import { IUserNews, IAlert } from "../../../types";
import { useUserInfo } from "../../../contexts";
import { StyledForm, SubmitButon } from "../../GlobalStyledComponents";

interface IUserNewsFormikProps {
  userToken?: string | null;
  formValues?: IUserNews | undefined;
  handleNotification: (alert: IAlert) => void;
  handleChange: () => void;
}

export const NewsFormik = (props: IUserNewsFormikProps) => {
  const { userToken, formValues, handleNotification, handleChange } = props;
  const {
    context: { userInfoData },
  } = useUserInfo();
  const { infoData } = userInfoData;

  /* const {
    context: { userNews },
  } = useUserNews();
  const { setNews, news } = userNews; */

  const defaultValues = {
    newsDescription: "",
    titleNews: "",
  };

  const initialValues = formValues ?? defaultValues;
  const handleSubmitUserNewsData = async (data: IUserNews) => {
    const currentData = {
      ...data,
      userId: infoData?.id,
      createdDateNews: new Date(),
      authorNews: infoData?.firstName + " " + infoData?.lastName,
    };
    if (!formValues?.newsDescription && userToken) {
      const createUserNewsData = await createUserNews.create(
        currentData,
        userToken
      );
      if (createUserNewsData) {
        handleNotification(createUserNewsData.statusMessage);
        handleChange();
        //   userNewsStore.setNews(createUserNewsData.newUserNews);
      }
    } else if (userToken) {
      const updateUserNewsData = await updateUserNews.update(data, userToken);
      if (updateUserNewsData) {
        handleNotification(updateUserNewsData.statusMessage);
        handleChange();
        //   userNewsStore.setNews(updateUserNewsData.userNews);
      }
    }
    // updatedForm(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={(values) => {
        const errors: Partial<IUserNews> = {};
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
          handleSubmitUserNewsData(values);
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
            id="titleNews"
            label="Nadpis příspěvku"
            name="titleNews"
          />
          <Field
            component={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="newsDescription"
            label="Obsah příspěvku"
            name="newsDescription"
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
            Přidat
          </SubmitButon>
        </StyledForm>
      )}
    </Formik>
  );
};
