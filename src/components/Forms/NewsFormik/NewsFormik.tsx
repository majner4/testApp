import React from "react";
import { Button, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { createUserNews, updateUserNews } from "../../../services/userNewsAPI";
import { IFUserNews } from "../../../types/FormTypes";
import { useUserData } from "../../../contexts/userContext";
import { IFAlert } from "../../../types/AlertTypes";

interface IFUserNewsFormikProps {
  userToken?: string | null;
  formValues?: IFUserNews | undefined;
  handleNotification: (alert: IFAlert) => void;
  handleChange: () => void;
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    maxWidth: "300px",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: "#ffc000",
    color: "#000",
    "&:hover, &:focus": {
      backgroundColor: "#ebb100",
    },
  },
  textArea: {
    width: "100%",
  },
}));

const NewsFormik = (props: IFUserNewsFormikProps) => {
  const { userToken, formValues, handleNotification, handleChange } = props;
  const defaultValues = {
    newsDescription: "",
    titleNews: "",
  };

  const userInfoStore = useUserData().context.userInfoData;
  const userNewsStore = useUserData().context.userNews;

  const initialValues = formValues ?? defaultValues;
  const handleSubmitUserNewsData = async (data: IFUserNews) => {
    const currentData = {
      ...data,
      userId: userInfoStore.infoData?.id,
      createdDateNews: new Date(),
      authorNews:
        userInfoStore.infoData?.firstName +
        " " +
        userInfoStore.infoData?.lastName,
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
  const classes = useStyles();

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={(values) => {
        const errors: Partial<IFUserNews> = {};
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
        <Form className={classes.form}>
          <Field
            className={classes.textArea}
            component={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="titleNews"
            label="Nadpis příspěvku"
            rowsMin={3}
            name="titleNews"
          />
          <Field
            className={classes.textArea}
            component={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="newsDescription"
            label="Obsah příspěvku"
            rowsMin={3}
            name="newsDescription"
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
            Přidat
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewsFormik;
