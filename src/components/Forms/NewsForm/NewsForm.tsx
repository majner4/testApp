import { LinearProgress, TextField } from "@mui/material";
import { VFC } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useUserInfo } from "../../../hooks";
import { createUserNews, updateUserNews } from "../../../services";
import { IUserNews, IAlert } from "../../../types";
import { getValidationMessage } from "../../../utils";
import {
  StyledForm,
  StyledFormControl,
  SubmitButon,
} from "../../GlobalStyledComponents";

interface IUserNewsFormProps {
  userToken?: string | null;
  handleNotification: (alert: IAlert) => void;
  handleChange: () => void;
}

interface IUserNewsValues {
  newsDescription: string;
  titleNews: string;
}

const initialValues: IUserNewsValues = {
  newsDescription: "",
  titleNews: "",
};

export const NewsForm: VFC<IUserNewsFormProps> = (props) => {
  const { userToken, handleNotification, handleChange } = props;
  const {
    context: { userInfoData },
  } = useUserInfo();
  const { infoData } = userInfoData;

  const methods = useForm<IUserNewsValues>({
    reValidateMode: "onChange",
    mode: "all",
  });
  const { formState } = methods;
  const { isValid, isSubmitting } = formState;

  /* const {
    context: { userNews },
  } = useUserNews();
  const { setNews, news } = userNews; */

  const handleSubmitUserNewsData: SubmitHandler<IUserNews> = async (data) => {
    const currentData = {
      ...data,
      userId: infoData?.id,
      createdDateNews: new Date(),
      authorNews: infoData?.firstName + " " + infoData?.lastName,
    };
    if (!initialValues?.newsDescription && userToken) {
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
    <FormProvider {...methods}>
      <StyledForm
        noValidate
        onSubmit={methods.handleSubmit(handleSubmitUserNewsData)}
      >
        <Controller
          name="titleNews"
          rules={{
            required: true,
          }}
          defaultValue={initialValues.newsDescription}
          render={({ field, fieldState }) => (
            <StyledFormControl fullWidth>
              <TextField
                fullWidth
                label="Nadpis příspěvku"
                variant="outlined"
                error={!!fieldState.error}
                helperText={
                  fieldState.error && (
                    <div>{getValidationMessage(fieldState.error)}</div>
                  )
                }
                required={true}
                defaultValue={field.value as string}
                autoComplete="off"
                {...field}
              />
            </StyledFormControl>
          )}
        />
        <Controller
          name="newsDescription"
          rules={{
            required: true,
          }}
          defaultValue={initialValues.titleNews}
          render={({ field, fieldState }) => (
            <StyledFormControl fullWidth>
              <TextField
                fullWidth
                label="Obsah příspěvku"
                variant="outlined"
                error={!!fieldState.error}
                helperText={
                  fieldState.error && (
                    <div>{getValidationMessage(fieldState.error)}</div>
                  )
                }
                required={true}
                defaultValue={field.value as string}
                autoComplete="off"
                {...field}
              />
            </StyledFormControl>
          )}
        />

        {isSubmitting && <LinearProgress />}
        <SubmitButon
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Přidat
        </SubmitButon>
      </StyledForm>
    </FormProvider>
  );
};
