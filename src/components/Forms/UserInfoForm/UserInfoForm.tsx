import { FormControl, LinearProgress, TextField } from "@mui/material";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useUserInfo } from "../../../hooks";
import { createUserInfo, updateUserInfo } from "../../../services";
import { IUserInfoFormValues, IAlert } from "../../../types";
import { getValidationMessage } from "../../../utils";
import { StyledForm, SubmitButon } from "../../GlobalStyledComponents";

interface IUserInfoFormProps {
  userToken?: string | null;
  formValues: IUserInfoFormValues | undefined;
  updatedForm: (updated: boolean) => void;
  handleNotification: (alert: IAlert) => void;
}

export const UserInfoForm = (props: IUserInfoFormProps) => {
  const { userToken, formValues, updatedForm, handleNotification } = props;
  const {
    context: { userInfoData },
  } = useUserInfo();
  const { setUserInfoData } = userInfoData;

  const methods = useForm<IUserInfoFormValues>({
    reValidateMode: "onChange",
    mode: "all",
  });
  const { formState } = methods;
  const { isValid, isSubmitting } = formState;

  const handleSubmitUserInfoData: SubmitHandler<IUserInfoFormValues> = async (
    data
  ) => {
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
    <FormProvider {...methods}>
      <StyledForm
        noValidate
        onSubmit={methods.handleSubmit(handleSubmitUserInfoData)}
      >
        <Controller
          name="firstName"
          rules={{
            required: true,
          }}
          defaultValue={formValues?.firstName}
          render={({ field, fieldState }) => (
            <FormControl fullWidth>
              <TextField
                fullWidth
                label="Jméno"
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
            </FormControl>
          )}
        />

        <Controller
          name="lastName"
          rules={{
            required: true,
          }}
          defaultValue={formValues?.lastName}
          render={({ field, fieldState }) => (
            <FormControl fullWidth>
              <TextField
                fullWidth
                label="Příjmení"
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
            </FormControl>
          )}
        />

        <Controller
          name="age"
          rules={{
            required: true,
          }}
          defaultValue={formValues?.age}
          render={({ field, fieldState }) => (
            <FormControl fullWidth>
              <TextField
                fullWidth
                label="Věk"
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
            </FormControl>
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
          Uložit
        </SubmitButon>
      </StyledForm>
    </FormProvider>
  );
};
