import { useCallback, useEffect, VFC } from "react";
import {
  FormControl,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { getUserDataByToken, updatePassword } from "../../../services";
import { RootContainer, StyledForm, SubmitButon } from "../../../components";
import { useUserData } from "../../../hooks";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { getValidationMessage } from "../../../utils";

interface IChangePasswordValues {
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

  const methods = useForm<IChangePasswordValues>({
    reValidateMode: "onChange",
    mode: "all",
  });
  const { formState, getValues } = methods;
  const { isValid, isSubmitting } = formState;

  const token = Cookies.get("token");

  const handleChangePassword: SubmitHandler<IChangePasswordValues> = async (
    data
  ) => {
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
      <FormProvider {...methods}>
        <StyledForm
          noValidate
          onSubmit={methods.handleSubmit(handleChangePassword)}
        >
          <Controller
            name="oldPassword"
            rules={{
              required: true,
            }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Původní heslo"
                  type="password"
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
            name="newPassword"
            rules={{
              required: true,
              minLength: 8,
            }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Nové heslo"
                  type="password"
                  variant="outlined"
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error && (
                      <div>
                        {getValidationMessage(fieldState.error, "hesla", 8)}
                      </div>
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
            name="confirmNewPassword"
            rules={{
              required: true,
              validate: (currentValue: string) => {
                if (currentValue !== getValues("newPassword")) {
                  return "Hesla se musí shodovat";
                }
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Nové heslo znovu"
                  type="password"
                  variant="outlined"
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error && (
                      <div>
                        {getValidationMessage(
                          fieldState.error,
                          undefined,
                          undefined
                        )}
                      </div>
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
            Změnit heslo
          </SubmitButon>
        </StyledForm>
      </FormProvider>
    </RootContainer>
  );
};
